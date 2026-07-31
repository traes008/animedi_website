# Animedi website — kort overzicht

Deze map **is** de website (HTML/CSS/JS, geen framework).

## Pagina’s

| Wat | Bestand |
|-----|---------|
| Home | `index.html` |
| Contact | `contact.html` |
| Afdelingen (team / diensten / foto’s) | `afdelingen/` |

Drie afdelingen: `kleine-huisdieren`, `paarden`, `landbouwdieren`.

## Foto’s

| Soort | Rol | Map |
|-------|-----|-----|
| **Hero** | Grote topfoto van een afdeling; dezelfde foto is ook de knop op de home | `assets/images/departments/…/hero/hero.jpg` |
| **Slideshow** | Wisselende beelden in de home-hero | `assets/images/home/slideshow/` |
| **Gallery** | Raster op de “Foto’s”-pagina | `assets/images/departments/…/gallery/` |
| **Services** | Foto bij een dienst | `assets/images/departments/…/services/` |
| **Team** | Portret bij een bio | `assets/images/team/` |
| **Brand** | Logo & iconen | `assets/brand/` |

Slideshow en gallery: bestanden in de map zetten/wissen, daarna:

```bash
python3 scripts/generate-image-sections.py
```

Andere foto’s: vervang het bestand met **dezelfde naam**.

## Rest

- `styles.css` / `script.js` — uiterlijk en gedrag (meestal laten)
- `_archive/` — oude proefversie, niet de live site
- Preview: `./serve.sh` → http://127.0.0.1:8080

## Git (heel kort)

```bash
git pull                          # nieuwste versie ophalen
# … bewerken, Cmd+S, browser vernieuwen …
git add -A && git commit -m "…"   # snapshot
git push                          # naar GitHub
```
