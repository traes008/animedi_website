# Hoe werk je aan de Animedi-website?

Eenvoudige handleiding als je geen developer bent. Je kunt teksten aanpassen, foto’s vervangen, de site bekijken en je werk opslaan op GitHub.

Doe één stap tegelijk. Lukt iets niet? Stop en vraag hulp — beter dan gokken.

---

## Wat is dit project?

Deze map **is** de website. Er is geen aparte “preview”-app meer.

| Wat je nodig hebt | Waar het staat |
|-------------------|----------------|
| Startpagina | `index.html` |
| Contactpagina | `contact.html` |
| Afdelingspagina’s | map `afdelingen/` |
| Foto’s | `assets/images/` |
| Logo | `assets/brand/` |
| Uiterlijk (kleuren, layout) | `styles.css` |

---

## Eenmalige setup (één keer op je Mac)

### 1. Cursor installeren (of VS Code)

Cursor is het programma waarmee je het project opent en bestanden bewerkt. Vraag om hulp bij de installatie als je het nog niet hebt.

### 2. Git controleren

Open **Terminal** (zoek “Terminal” via Spotlight) en typ:

```bash
git --version
```

Druk op Enter. Zie je een versienummer? Dan is het goed. Vraagt macOS om developer tools te installeren? Kies ja en wacht.

### 3. Het project op je computer zetten

In Terminal:

```bash
cd ~/Documents
git clone git@github.com:traes008/animedi_website.git
cd animedi_website
```

Werkt `git clone` niet (SSH-fout)? Probeer HTTPS:

```bash
git clone https://github.com/traes008/animedi_website.git
cd animedi_website
```

GitHub kan vragen om in te loggen in de browser.

### 4. Project openen in Cursor

**File → Open Folder…** en kies de map `animedi_website`.

---

## Elke keer dat je begint te werken

1. Open Terminal (of het Terminal-paneel in Cursor).
2. Ga naar de projectmap:

```bash
cd ~/Documents/animedi_website
```

3. Haal de nieuwste versie op (voor het geval iemand anders iets wijzigde):

```bash
git pull
```

4. Start de lokale preview:

```bash
./serve.sh
```

5. Open in je browser: **http://127.0.0.1:8080**

Laat dat Terminal-venster open terwijl je werkt. Om te stoppen: klik in die Terminal en druk op `Ctrl + C`.

Tips voor preview op je telefoon: [`SERVE.md`](SERVE.md).

---

## Tekst op een pagina aanpassen

1. Open links in Cursor het juiste bestand (bijv. `contact.html` of iets in `afdelingen/`).
2. Zoek de Nederlandse tekst die je wilt wijzigen.
3. Pas alleen de woorden aan — verwijder geen code-achtige dingen zoals `<`, `>`, `class="…"`, of `href="…"`.
4. Sla op (`Cmd + S`).
5. Vernieuw de browser (`Cmd + R`) om het resultaat te zien.

**Tip:** verander alleen de woorden tussen de tags. Voorbeeld:

```html
<h1>Onze <em>foto's.</em></h1>
```

Je mag de woorden aanpassen, maar laat `<h1>`, `</h1>`, `<em>` en `</em>` staan.

---

## Foto’s toevoegen of vervangen

### Team- / dienst- / hero-foto’s (één afbeelding)

Die staan in mappen zoals:

- `assets/images/team/`
- `assets/images/departments/kleine-huisdieren/hero/`
- `assets/images/departments/kleine-huisdieren/services/`

Makkelijkst: **vervang een bestand door een nieuwe foto met exact dezelfde bestandsnaam**. Daarna browser vernieuwen.

Krijgt de foto een **nieuwe** naam, dan moet ook de HTML die ernaar wijst worden aangepast.

### Galerijen en de homepage-slideshow

1. Zet nieuwe beelden in de juiste map, bijvoorbeeld:
   - `assets/images/home/slideshow/`
   - `assets/images/departments/paarden/gallery/`
2. (Optioneel) Voeg een korte Nederlandse beschrijving toe in `scripts/image-alt-text.json`.
3. In Terminal, vanuit de projectmap:

```bash
python3 scripts/generate-image-sections.py
```

4. Vernieuw de browser.

Komen er foutmeldingen? Kopieer de tekst en vraag hulp vóór je verdergaat.

---

## Je werk opslaan op GitHub (het Git-deel)

Git bewaart een geschiedenis van wijzigingen. GitHub is de gedeelde online kopie.

Doe dit als je tevreden bent en je werk wilt delen.

### Stap A — Bekijk wat er veranderd is

```bash
cd ~/Documents/animedi_website
git status
```

### Stap B — Bestanden klaarzetten

Alles wat je wijzigde meenemen:

```bash
git add -A
```

### Stap C — Commit (snapshot met een korte boodschap)

```bash
git commit -m "Openingsuren contact aangepast"
```

Schrijf in je eigen woorden wat je deed.

Zegt Git “nothing to commit”? Dan is alles al opgeslagen, of je bent `git add` vergeten.

### Stap D — Push (uploaden naar GitHub)

```bash
git push
```

Lukt dit, dan staan je wijzigingen op GitHub zodat anderen ze kunnen ophalen met `git pull`.

---

## Als er iets misgaat

| Situatie | Wat je kunt proberen |
|----------|----------------------|
| Browser toont een oude pagina | Hard vernieuwen: `Cmd + Shift + R` |
| `./serve.sh` werkt niet | Controleer dat je in `animedi_website` zit, probeer dan `python3 -m http.server 8080` |
| `git pull` klaagt over conflicts | Stop. Niet gokken. Vraag hulp. |
| Verkeerd bewerkt en paniek | Verwijder het project **niet**. Vraag eerst raad vóór je meer Git-commando’s runt. |
| Foto’s verschijnen niet | Check bestandsnaam en map. Voor galerijen: Python-script hierboven opnieuw draaien. |

---

## Woordenlijstje

- **Repository (repo):** dit project + de geschiedenis op GitHub.
- **Commit:** een opgeslagen momentopname van je wijzigingen, met een korte boodschap.
- **Push:** je commits naar GitHub sturen.
- **Pull:** de nieuwste commits van GitHub naar je Mac halen.
- **Branch:** een parallelle werklijn. Voor gewone edits blijf je op `main`.

---

## Wat je meestal níet hoeft aan te raken

- `styles.css` en `script.js` (tenzij je expres design of gedrag wijzigt)
- Alles in `_archive/` (oude experimenten — hoort niet bij de live site)
- Tekst tussen `GENERATED`-commentaren in HTML (die bouwt het foto-script opnieuw)

---

## Spiekbriefje (kopiëren en plakken)

```bash
# Begin van een werksessie
cd ~/Documents/animedi_website
git pull
./serve.sh

# Nadat je in Cursor hebt opgeslagen — in een *nieuw* Terminal-tabblad:
cd ~/Documents/animedi_website
git add -A
git commit -m "Beschrijf hier kort je wijziging"
git push
```

Dat is de hele cyclus: **pull → bewerken → preview → commit → push**.
