# Animedi — multi-page website

This folder **is** the Animedi website: a self-contained, dependency-free, responsive multi-page site for the veterinary clinic.

It is not a section of another project. Serve, zip, or deploy **this directory alone** as the site root.

## Pages

- Homepage
- Kleine huisdieren (opens on team; also services and photos)
- Paarden (opens on team; also services and photos)
- Landbouwdieren (opens on team; also services and photos)
- Contact and appointments (anchored per team)

## View locally

From this folder:

```bash
python3 -m http.server 8081
```

Then visit `http://localhost:8081`. From the repo root you can also run `./serve.sh` (multipage is the default).

Assets are included locally, so the site works offline (with system font fallbacks when Google Fonts are unavailable).

## Image structure

Site images are grouped by the part of the website that owns them:

```text
assets/
├── brand/
└── images/
    ├── home/
    │   └── slideshow/
    ├── departments/
    │   ├── kleine-huisdieren/
    │   │   ├── hero/
    │   │   ├── gallery/
    │   │   └── services/
    │   ├── paarden/
    │   │   ├── hero/
    │   │   ├── gallery/
    │   │   └── services/
    │   └── landbouwdieren/
    │       ├── hero/
    │       ├── gallery/
    │       └── services/
    └── team/
```

Team, service, hero and brand image paths remain explicit because each image is tied to
specific content. Photo galleries and the homepage slideshow are generated from their folders.

### Update a gallery or slideshow

1. Add or remove images in the relevant `gallery/` or `home/slideshow/` folder.
2. Optionally add a descriptive Dutch alt text in `scripts/image-alt-text.json`. Images without
   an entry are still included with a generic alt text and produce a warning.
3. Regenerate the static markup:

```bash
python3 scripts/generate-image-sections.py
```

The generator natural-sorts filenames, validates metadata and image references, and updates only
the sections between `GENERATED` comments. Do not edit content between those comments manually.

## Deploy / share

Upload or zip **this folder** (`animedi-multipage-preview/`) as a complete static site. Do not nest it under the single-page prototype.

## Related

The repo root also contains [`../animedi-preview/`](../animedi-preview/), an earlier single-page prototype. That is a separate experiment — not part of this website.
