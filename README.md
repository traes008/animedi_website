# Animedi website

The Animedi veterinary clinic website — dependency-free static HTML, CSS and JavaScript.

This repository **is** the website. Open, edit, serve and deploy from the root of this project.

## Pages

- Homepage (`index.html`)
- Kleine huisdieren — team, services, photos (`afdelingen/`)
- Paarden — team, services, photos (`afdelingen/`)
- Landbouwdieren — team, services, photos (`afdelingen/`)
- Contact and appointments (`contact.html`)

## Quick start

```bash
./serve.sh
```

Then open `http://127.0.0.1:8080`. Or double-click `index.html`.

Phone on the same Wi‑Fi: see [`SERVE.md`](SERVE.md).

**New here / non-technical?** Read the Dutch beginner guide: [`HOW_TO.md`](HOW_TO.md) (Git, teksten, foto’s, opslaan).

## Project layout

```text
├── index.html          Home
├── contact.html        Contact & appointments
├── styles.css          All styling
├── script.js           Interactions
├── afdelingen/         Department pages
├── assets/
│   ├── brand/          Logo & icons
│   └── images/         Photos (home, departments, team)
├── scripts/            Tools to refresh galleries from folders
├── serve.sh            Local preview server
└── HOW_TO.md           Step-by-step guide for collaborators
```

## Update a gallery or slideshow

1. Add or remove images in the relevant `assets/images/.../gallery/` or `assets/images/home/slideshow/` folder.
2. Optionally add Dutch alt text in `scripts/image-alt-text.json`.
3. Regenerate markup:

```bash
python3 scripts/generate-image-sections.py
```

Do not edit content between `GENERATED` comments in the HTML by hand.

## Deploy

Upload this whole repository folder (or clone it) to any static host — Cloudflare Pages, Netlify, GitHub Pages, etc. Point the host at the project root.

## Before production

- Confirm copy, contact details and opening hours with Animedi.
- Connect appointment buttons to the real booking system.
- Add privacy and disclaimer pages.
- Review image licensing / use approved clinic photography.
- Add analytics / cookie banner only if required.
