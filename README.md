# macOS Web Simulator 🍎

![macOS](https://img.shields.io/badge/macOS-Simulator-blue?logo=apple)
![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

Webový simulátor macOS postavený pouze s HTML, CSS a JavaScriptem. Spusťte si Mac přímo v prohlížeči!

## ✨ Funkce

- 🚀 **Boot sekvence** - Realistická animace zavádění systému s Apple logem
- 🔒 **Zamykací obrazovka** - Zobrazení času a data, kliknutím odemknete
- 🖥️ **Desktop** - Barevný gradient pozadí podobný macOS
- 📋 **Menu Bar** - Horní lišta s Apple menu, časem a ikonami
- 🪟 **Okna** - Přetahovatelná okna s tlačítky zavřít/minimalizovat/maximalizovat
- 🎯 **Aplikace**:
  - **Finder** - Souborový manažer
  - **Safari** - Webový prohlížeč
  - **Poznámky** - Textový editor
  - **Terminál** - Příkazový řádek (read-only)
  - **Kalkulačka** - Plně funkční kalkulačka
- 🎨 **Dock** - Animovaný dock s ikonami aplikací
- ⚡ **Tlačítko vypnutí** - Červené tlačítko v docku pro vypnutí systému
- 🔄 **Restart/Vypnutí** - Animace vypínání s možností restartu

## 🚀 Jak spustit

### Metoda 1: GitHub Pages (nejjednodušší)

1. Jdi do **Settings** > **Pages**
2. Vyber **main** branch jako zdroj
3. Klikni **Save**
4. Tvoje stránka bude dostupná na: `https://losthouse659-svg.github.io/macos-web-simulator/`

### Metoda 2: Stáhnout a otevřít lokálně

1. Klikni na **Code** > **Download ZIP**
2. Rozbal soubor
3. Otevři `index.html` v prohlížeči

### Metoda 3: Klonovat přes Git

```bash
git clone https://github.com/losthouse659-svg/macos-web-simulator.git
cd macos-web-simulator
# Otevři index.html ve svém prohlížeči
```

## 🎮 Jak používat

1. **Boot** - Počkej, až se dokončí boot sekvence
2. **Odemknout** - Klikni na zamykací obrazovku
3. **Otevřít aplikace** - Dvakrát klikni na ikony na ploše nebo v docku
4. **Přetahovat okna** - Chyť za titlebar a táhni
5. **Zavřít okna** - Klikni na červené tlačítko
6. **Apple menu** - Klikni na  logo pro více možností
7. **Vypnout** - Klikni na červené tlačítko s ⏻ v docku nebo vyber "Vypnout" z Apple menu

## 📁 Struktura projektu

```
macos-web-simulator/
├── index.html      # Hlavní HTML struktura
├── style.css       # Všechny styly (boot, lock, desktop, okna, dock)
├── script.js       # Logika (boot, okna, aplikace, vypínání)
└── README.md       # Tento soubor
```

## 🛠️ Technologie

- **HTML5** - Sémantická struktura
- **CSS3** - Glassmorphism, animace, gradients, backdrop-filter
- **Vanilla JavaScript** - Žádné frameworky, pouze čistý JS
- **Unicode symboly** - Ikony (Apple logo, emoji)

## 🎨 Design

- Inspirováno macOS Big Sur / Monterey / Ventura
- Glassmorphism efekty (blur, průhlednost)
- Smooth animace
- Responzivní prvky

## 📝 Poznámky

- Toto je **simulátor**, ne skutečný operační systém
- Některé funkce jsou pouze pro demo (např. Safari neotevírá skutečné stránky)
- Kalkulačka je plně funkční
- Terminál je read-only (předpřipravené příkazy)

## 🤝 Přispívání

Chceš přidat další funkce? Fork, úpravy a Pull Request!

Nápady na vylepšení:
- [ ] Více aplikací (Mail, Hudba, Fotky)
- [ ] Funkční Safari s iframe
- [ ] Nastavení systému
- [ ] Widgety
- [ ] Mission Control
- [ ] Notifikace
- [ ] Drag & drop souborů

## 📜 Licence

MIT License - Používej a upravuj jak chceš!

## 👤 Autor

Vytvořil [@losthouse659-svg](https://github.com/losthouse659-svg)

---

⭐ Pokud se ti projekt líbí, dej mu hvězdičku!
