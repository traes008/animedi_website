# Hoe werk je aan de Animedi-website?

Handleiding voor wie geen developer is. Lees eerst **“Hoe de site in elkaar zit”** — daar staan woorden zoals *hero* uitgelegd. Daarna volg je de stappen om te bewerken, te bekijken en op te slaan.

Doe één stap tegelijk. Lukt iets niet? Stop en vraag hulp.

---

## Hoe de site in elkaar zit

### Pagina’s

| Pagina | Bestand | Wat je ziet |
|--------|---------|-------------|
| Home | `index.html` | Grote openingsfoto’s, welkomstekst, drie afdelingen |
| Contact | `contact.html` | Adressen, telefoon, openingsuren |
| Afdeling → Team | `afdelingen/…-team.html` | Hero + teamleden |
| Afdeling → Diensten / praktijk | `afdelingen/…-diensten.html` | Hero + diensten met foto’s |
| Afdeling → Foto’s | `afdelingen/…-fotos.html` | Hero + fotogalerij |

Er zijn drie afdelingen: **kleine-huisdieren**, **paarden**, **landbouwdieren**.

### Wat betekent “hero”?

Een **hero** is het grote beeld bovenaan een pagina — het eerste wat je ziet als je de pagina opent. Vaak met een titel eroverheen.

Op deze website:

- **Home-hero** = de grote zone bovenaan de startpagina, met wisselende sfeerbeelden (de *slideshow*).
- **Afdelings-hero** (ook *department picture* / *department hero*) = de grote foto bovenaan elke afdelingspagina.

Belangrijk: die afdelings-hero-foto (`hero.jpg`) wordt **twee keer** gebruikt:

1. Bovenaan de afdelingspagina’s (team / diensten / foto’s)
2. Op de **home**, als klikbare foto om naar die afdeling te gaan

Dus: wissel je `hero.jpg` van paarden, dan verandert zowel de paardenpagina’s als het paardenblok op de home.

### Soorten foto’s (en waar ze horen)

| Soort | Wat is het op de site? | Map op je computer |
|-------|------------------------|--------------------|
| **Slideshow** | Foto’s die op de home-hero **automatisch wisselen** | `assets/images/home/slideshow/` |
| **Hero / department picture** | Grote topfoto van een afdeling (+ knop op de home) | `assets/images/departments/…/hero/hero.jpg` |
| **Service / dienstfoto** | Foto bij één dienst (operatiezaal, labo, …) | `assets/images/departments/…/services/` |
| **Gallery / galerij** | Raster met veel foto’s op de “Foto’s”-pagina | `assets/images/departments/…/gallery/` |
| **Teamfoto** | Portret naast de bio van een teamlid | `assets/images/team/` |
| **Brand** | Logo en icoontjes (niet zomaar wisselen) | `assets/brand/` |

### Andere nuttige woorden op de site

| Woord | Betekenis |
|-------|-----------|
| **Sectie** | Een blok op een pagina (hero, team, galerij, contactstrook, …) |
| **Afdeling / department** | Kleine huisdieren, paarden of landbouwdieren |
| **Tabs** | De drie knoppen onder de hero op een afdeling: Team · Onze praktijk · Foto’s |
| **CTA** | “Call to action” — een knop zoals “Contacteer ons” |
| **Alt-tekst** | Korte beschrijving van een foto voor blinden/slechtzienden en Google. Staat soms in HTML, voor galerijen ook in `scripts/image-alt-text.json` |
| **Assets** | Alle media-bestanden (foto’s, logo’s) |
| **HTML** | Het bestand van een pagina (`.html`). Bevat tekst + structuur |
| **CSS** | `styles.css` — kleuren, lettertypes, layout. Meestal **niet** aanpassen |
| **JavaScript** | `script.js` — menu, slideshow, animaties. Meestal **niet** aanpassen |
| **GENERATED** | Stukken HTML tussen speciale commentaren. Die maakt een script opnieuw — **niet met de hand bewerken** |

### Mappenstructuur (foto’s)

```text
assets/
├── brand/                          ← logo & icoontjes
└── images/
    ├── home/slideshow/             ← wisselende beelden op de home-hero
    ├── team/                       ← portretten van medewerkers
    └── departments/
        ├── kleine-huisdieren/
        │   ├── hero/hero.jpg       ← topfoto + home-tegel
        │   ├── services/           ← foto’s bij diensten
        │   └── gallery/            ← fotopagina
        ├── paarden/
        │   ├── hero/hero.jpg
        │   ├── services/
        │   └── gallery/
        └── landbouwdieren/
            ├── hero/hero.jpg
            ├── services/
            └── gallery/
```

---

## Eenmalige setup (één keer op je Mac)

### 1. Cursor installeren

Cursor is het programma waarmee je bestanden opent en bewerkt (zoals Word, maar voor de website).

### 2. Git controleren

Open **Terminal** (Spotlight → “Terminal”) en typ:

```bash
git --version
```

Druk op Enter. Zie je een versienummer? Goed. Vraagt macOS om developer tools? Installeer die.

**Git** = programma dat bijhoudt wat er veranderde.  
**GitHub** = de online plek waar de gedeelde website-bestanden staan (https://github.com/traes008/animedi_website).

### 3. Project downloaden

```bash
cd ~/Documents
git clone https://github.com/traes008/animedi_website.git
cd animedi_website
```

(HTTPS is meestal het eenvoudigst. GitHub kan vragen om in te loggen.)

### 4. Openen in Cursor

**File → Open Folder…** → kies `animedi_website`.

---

## Elke keer dat je begint

```bash
cd ~/Documents/animedi_website
git pull
./serve.sh
```

Open daarna in je browser: **http://127.0.0.1:8080**

| Commando | Wat het doet |
|----------|--------------|
| `git pull` | Haalt de nieuwste versie van GitHub op |
| `./serve.sh` | Start een lokale preview van de site op je Mac |

Laat die Terminal open. Stoppen: `Ctrl + C`.  
Preview op je telefoon: zie [`SERVE.md`](SERVE.md).

---

## Tekst aanpassen

1. Open in Cursor het juiste `.html`-bestand (tabel bovenaan).
2. Zoek de Nederlandse zin die je wilt wijzigen (`Cmd + F`).
3. Pas **alleen de woorden** aan. Raak geen `<…>`-dingen aan.
4. Bewaar: `Cmd + S`.
5. Browser vernieuwen: `Cmd + R`.

Voorbeeld — dit mag je wél veranderen (de woorden):

```html
<h1>Ons <em>team.</em></h1>
```

Laat `<h1>`, `</h1>`, `<em>` en `</em>` staan. Die vertellen de browser: “dit is een titel” en “dit woord mag schuin”.

---

## Foto’s vervangen — per type

### A. Hero / department picture (één bestand)

1. Ga naar bv. `assets/images/departments/paarden/hero/`.
2. Vervang `hero.jpg` door een nieuwe foto met **exact dezelfde naam** `hero.jpg`.
3. Browser hard vernieuwen: `Cmd + Shift + R`.

Resultaat: nieuwe topfoto op de paardenpagina’s **én** nieuwe tegel op de home.

Kies een scherpe, liggende foto — ze wordt groot getoond.

### B. Teamfoto of dienstfoto (één bestand)

Zelfde truc: vervang het bestaande bestand **met dezelfde bestandsnaam**.

- Team: `assets/images/team/chantal-de-vlieger.jpg` enz.
- Diensten: bv. `assets/images/departments/kleine-huisdieren/services/labo.jpg`

Geen script nodig. Alleen opslaan + browser vernieuwen.

### C. Slideshow (home) of galerij (foto’s-pagina)

Hier mag je bestanden **toevoegen of verwijderen**. Daarna moet een script de pagina’s bijwerken.

1. Zet foto’s in de juiste map:
   - Home-slideshow → `assets/images/home/slideshow/`
   - Galerij paarden → `assets/images/departments/paarden/gallery/`  
     (zelfde idee voor de andere afdelingen)
2. Optioneel: korte Nederlandse alt-tekst toevoegen in `scripts/image-alt-text.json`  
   (één regel per foto, pad + beschrijving — kijk naar bestaande regels als voorbeeld).
3. In Terminal:

```bash
cd ~/Documents/animedi_website
python3 scripts/generate-image-sections.py
```

4. Browser vernieuwen.

Zonder stap 3 zie je nieuwe galerij-/slideshow-foto’s **niet** op de site.

---

## Opslaan op GitHub

Als je tevreden bent, stuur je je wijzigingen naar de gedeelde kopie.

```bash
cd ~/Documents/animedi_website
git status
git add -A
git commit -m "Hero paarden vervangen"
git push
```

| Stap | Wat het betekent |
|------|------------------|
| `git status` | Toont welke bestanden jij wijzigde |
| `git add -A` | Zegt: “neem al mijn wijzigingen mee” |
| `git commit -m "…"` | Maakt een **snapshot** met een korte notitie |
| `git push` | Uploadt die snapshot naar GitHub |

Schrijf in het berichtje in je eigen woorden wat je deed, bv. `"Openingsuren contact aangepast"`.

Zegt Git “nothing to commit”? Ofwel al gepusht, ofwel `git add` vergeten.

---

## Als er iets misgaat

| Situatie | Wat doen |
|----------|----------|
| Oude foto/tekst in de browser | `Cmd + Shift + R` (hard vernieuwen) |
| `./serve.sh` faalt | Zit je in `animedi_website`? Probeer `python3 -m http.server 8080` |
| Nieuwe galerijfoto verschijnt niet | Script vergeten? → `python3 scripts/generate-image-sections.py` |
| `git pull` praat over *conflicts* | Stop. Vraag hulp. Niets forceren. |
| Paniek na verkeerde edit | Project **niet** wissen. Vraag raad vóór meer Git-commando’s |

---

## Wat je meestal níet aanraakt

- `styles.css`, `script.js`
- Map `_archive/` (oude proefversie, hoort niet bij de live site)
- Alles tussen `GENERATED:…:START` en `GENERATED:…:END` in HTML

---

## Spiekbriefje

```bash
# Start
cd ~/Documents/animedi_website
git pull
./serve.sh
# → browser: http://127.0.0.1:8080

# Na edits (nieuw Terminal-tabblad)
cd ~/Documents/animedi_website
python3 scripts/generate-image-sections.py   # alleen bij slideshow/galerij
git add -A
git commit -m "Korte beschrijving van je wijziging"
git push
```

Cyclus: **pull → bewerken → preview → (eventueel foto-script) → commit → push**.
