#!/usr/bin/env python3
"""Generate static gallery and slideshow markup from feature image folders."""

from __future__ import annotations

import html
import json
import os
import re
import sys
from pathlib import Path


SITE_ROOT = Path(__file__).resolve().parent.parent
METADATA_PATH = SITE_ROOT / "scripts" / "image-alt-text.json"
IMAGE_EXTENSIONS = {".gif", ".jpeg", ".jpg", ".png", ".webp"}

SECTIONS = (
    {
        "name": "home-slideshow",
        "kind": "slideshow",
        "directory": SITE_ROOT / "assets" / "images" / "home" / "slideshow",
        "page": SITE_ROOT / "index.html",
        "indent": "            ",
        "fallback_alt": "Sfeerbeeld van Animedi",
    },
    {
        "name": "kleine-huisdieren-gallery",
        "kind": "gallery",
        "directory": SITE_ROOT
        / "assets"
        / "images"
        / "departments"
        / "kleine-huisdieren"
        / "gallery",
        "page": SITE_ROOT / "afdelingen" / "kleine-huisdieren-fotos.html",
        "indent": "          ",
        "fallback_alt": "Foto van de afdeling kleine huisdieren",
    },
    {
        "name": "paarden-gallery",
        "kind": "gallery",
        "directory": SITE_ROOT
        / "assets"
        / "images"
        / "departments"
        / "paarden"
        / "gallery",
        "page": SITE_ROOT / "afdelingen" / "paarden-fotos.html",
        "indent": "          ",
        "fallback_alt": "Foto van de paardenafdeling",
    },
    {
        "name": "landbouwdieren-gallery",
        "kind": "gallery",
        "directory": SITE_ROOT
        / "assets"
        / "images"
        / "departments"
        / "landbouwdieren"
        / "gallery",
        "page": SITE_ROOT / "afdelingen" / "landbouwdieren-fotos.html",
        "indent": "          ",
        "fallback_alt": "Foto van de afdeling landbouwdieren",
    },
)


def natural_sort_key(path: Path) -> list[object]:
    """Sort names predictably while treating digit sequences as numbers."""
    return [
        int(part) if part.isdigit() else part.casefold()
        for part in re.split(r"(\d+)", path.name)
    ]


def relative_site_path(path: Path) -> str:
    return path.relative_to(SITE_ROOT).as_posix()


def relative_page_path(path: Path, page: Path) -> str:
    return Path(os.path.relpath(path, page.parent)).as_posix()


def load_metadata() -> dict[str, str]:
    try:
        data = json.loads(METADATA_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise RuntimeError(f"Could not read {relative_site_path(METADATA_PATH)}: {error}") from error

    if not isinstance(data, dict) or not all(
        isinstance(key, str) and isinstance(value, str) for key, value in data.items()
    ):
        raise RuntimeError(f"{relative_site_path(METADATA_PATH)} must contain a string-to-string object")
    return data


def scan_images(directory: Path) -> list[Path]:
    if not directory.is_dir():
        raise RuntimeError(f"Image directory does not exist: {relative_site_path(directory)}")

    entries = [path for path in directory.iterdir() if not path.name.startswith(".")]
    unsupported = [path.name for path in entries if not path.is_file() or path.suffix.lower() not in IMAGE_EXTENSIONS]
    if unsupported:
        names = ", ".join(sorted(unsupported, key=str.casefold))
        raise RuntimeError(f"Unsupported entries in {relative_site_path(directory)}: {names}")

    duplicates: dict[str, list[str]] = {}
    for path in entries:
        duplicates.setdefault(path.name.casefold(), []).append(path.name)
    collisions = [names for names in duplicates.values() if len(names) > 1]
    if collisions:
        formatted = "; ".join(", ".join(names) for names in collisions)
        raise RuntimeError(f"Case-insensitive duplicate image names in {relative_site_path(directory)}: {formatted}")

    return sorted(entries, key=natural_sort_key)


def render_section(section: dict[str, object], images: list[Path], metadata: dict[str, str]) -> str:
    name = str(section["name"])
    kind = str(section["kind"])
    page = Path(section["page"])
    indent = str(section["indent"])
    fallback_alt = str(section["fallback_alt"])
    lines = [f"{indent}<!-- GENERATED:{name}:START -->"]

    for index, image in enumerate(images):
        key = relative_site_path(image)
        alt = metadata.get(key)
        if alt is None:
            alt = fallback_alt
            print(f"Warning: no alt text for {key}; using {alt!r}", file=sys.stderr)

        src = html.escape(relative_page_path(image, page), quote=True)
        escaped_alt = html.escape(alt, quote=True)

        if kind == "gallery":
            lines.append(
                f'{indent}<figure class="reveal"><img src="{src}" alt="{escaped_alt}" '
                'loading="lazy" /></figure>'
            )
        elif kind == "slideshow":
            active = " is-active" if index == 0 else ""
            hidden = "" if index == 0 else ' aria-hidden="true"'
            lines.append(
                f'{indent}<div class="hero__slide{active}" '
                f'style="background-image: url(\'{src}\')" role="img" '
                f'aria-label="{escaped_alt}"{hidden}></div>'
            )
        else:
            raise RuntimeError(f"Unknown generated section kind: {kind}")

    lines.append(f"{indent}<!-- GENERATED:{name}:END -->")
    return "\n".join(lines)


def replace_generated_section(page: Path, name: str, markup: str) -> bool:
    start = f"<!-- GENERATED:{name}:START -->"
    end = f"<!-- GENERATED:{name}:END -->"
    text = page.read_text(encoding="utf-8")
    pattern = re.compile(
        rf"^[ \t]*{re.escape(start)}.*?^[ \t]*{re.escape(end)}",
        flags=re.MULTILINE | re.DOTALL,
    )
    updated, replacements = pattern.subn(markup, text)
    if replacements != 1:
        raise RuntimeError(
            f"Expected exactly one {name!r} generated section in {relative_site_path(page)}, "
            f"found {replacements}"
        )
    if updated == text:
        return False
    page.write_text(updated, encoding="utf-8")
    return True


def validate_metadata(metadata: dict[str, str], managed_images: set[str]) -> None:
    stale = sorted(set(metadata) - managed_images, key=str.casefold)
    if stale:
        joined = "\n  - ".join(stale)
        raise RuntimeError(f"Alt-text metadata points to missing or unmanaged images:\n  - {joined}")


def validate_image_references() -> None:
    """Check image URLs in HTML and CSS after generation."""
    missing: list[str] = []
    patterns = (
        re.compile(r"""(?:src|href)=["']([^"']+\.(?:gif|jpe?g|png|webp))["']""", re.IGNORECASE),
        re.compile(r"""url\(["']?([^)"']+\.(?:gif|jpe?g|png|webp))["']?\)""", re.IGNORECASE),
    )

    for source in [*SITE_ROOT.rglob("*.html"), SITE_ROOT / "styles.css"]:
        text = source.read_text(encoding="utf-8")
        for pattern in patterns:
            for reference in pattern.findall(text):
                if reference.startswith(("data:", "http://", "https://", "//")):
                    continue
                target = (source.parent / reference).resolve()
                if not target.is_file():
                    missing.append(f"{relative_site_path(source)} -> {reference}")

    if missing:
        joined = "\n  - ".join(sorted(set(missing), key=str.casefold))
        raise RuntimeError(f"Missing image references:\n  - {joined}")


def main() -> int:
    try:
        metadata = load_metadata()
        managed_images: set[str] = set()
        generated: list[tuple[dict[str, object], list[Path]]] = []

        for section in SECTIONS:
            images = scan_images(Path(section["directory"]))
            managed_images.update(relative_site_path(image) for image in images)
            generated.append((section, images))

        validate_metadata(metadata, managed_images)

        changed_pages: list[str] = []
        for section, images in generated:
            page = Path(section["page"])
            markup = render_section(section, images, metadata)
            if replace_generated_section(page, str(section["name"]), markup):
                changed_pages.append(relative_site_path(page))

        validate_image_references()
    except RuntimeError as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1

    if changed_pages:
        print("Updated generated image sections:")
        for page in changed_pages:
            print(f"  - {page}")
    else:
        print("Generated image sections are already up to date.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
