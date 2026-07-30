# Animedi website

This repository holds the Animedi veterinary clinic web work. The main deliverable is a **full multi-page website** in its own folder — not a page inside another app.

## Sites in this repo

| Site | Folder | What it is |
|------|--------|------------|
| **Animedi website** (multi-page) | [`animedi-multipage-preview/`](animedi-multipage-preview/) | Standalone multi-page site: home, three departments (team / services / photos), and contact. Open and host this folder on its own. |
| Single-page prototype | [`animedi-preview/`](animedi-preview/) | Earlier one-page scrolling prototype. Separate from the multi-page site. |

Both are dependency-free static HTML/CSS/JS with local assets.

The multi-page site is a complete website by itself. Treat `animedi-multipage-preview/` as the project root when you open, serve, zip, or deploy it.

## Quick start

```bash
# Multi-page website (default)
./serve.sh
# → http://127.0.0.1:8081

# Single-page prototype
./serve.sh single
# → http://127.0.0.1:8081 (or set PORT=8080)
```

Or serve a folder directly:

```bash
cd animedi-multipage-preview && python3 -m http.server 8081
cd animedi-preview && python3 -m http.server 8080
```

Phone on the same Wi‑Fi: see [`SERVE.md`](SERVE.md).

## Share / host

- **Multi-page website:** zip or upload `animedi-multipage-preview/` only. Recipient opens `index.html` or deploys that folder as the site root.
- **Single-page prototype:** same idea for `animedi-preview/`.

Works on Cloudflare Pages, Netlify, GitHub Pages, AWS S3/Amplify, or any static host — point the host at the chosen folder.

## Before production

- Confirm all copy, contact details and opening hours with Animedi.
- Connect the appointment buttons to Animedi's actual booking system.
- Add final privacy and disclaimer pages.
- Review image licensing / replace prototype photography with approved clinic photography.
- Add analytics and a cookie banner only if required by the final tracking setup.
