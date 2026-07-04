# Nstudio redesign (PoC)

Proof-of-concept refresh of [nstudio.pl](https://nstudio.pl) - pracownia projektowania wnętrz
Nstudio (Rzeszów, Natalia Osipa-Indycka). Ewolucja wizualna i techniczna obecnej strony
(WordPress + Elementor), bez zmiany architektury informacji ani nazwy marki.

**Live:** https://olaf-wilkosz.github.io/nstudio-redesign/

## Struktura repo

```
content/scraped/   Zescrapowana treść i zdjęcia z nstudio.pl (patrz content/scraped/00-sitemap.md)
cms/               Strapi (headless CMS), lokalnie na SQLite
web/               Astro (SSG), pobiera dane ze Strapi przez REST API w build-time
```

## Content types w Strapi (`cms/src/api/`)

- **Realizacja** (`api::realizacja.realizacja`) - tytuł, slug, opis, lokalizacja,
  kategoria (mieszkanie/dom/komercyjne), galeria zdjęć, okładka.
- **Post bloga** (`api::post-bloga.post-bloga`) - tytuł, slug, zajawka, treść, data, okładka.
- **Ustawienia** (`api::ustawienia.ustawienie`, singleton) - dane kontaktowe i linki social media.

Public read (`find`/`findOne`) na te trzy content types jest nadawany automatycznie przy
starcie Strapi (patrz `cms/src/index.ts` - `bootstrap`), więc `web/` może od razu czytać
dane bez klikania w panelu admina.

## Uruchomienie lokalnie

**1. Strapi (CMS):**

```bash
cd cms
npm install   # jeśli node_modules nie istnieje
npm run develop
```

Przy pierwszym uruchomieniu otwórz http://localhost:1337/admin i załóż konto administratora
(Strapi wymaga tego przy pierwszym starcie - nie da się tego zrobić bezobsługowo bez wyboru
hasła). Potem dodaj przykładowe realizacje / posty / wpis w Ustawieniach przez panel.

**2. Astro (frontend):**

```bash
cd web
npm install   # jeśli node_modules nie istnieje
cp .env.example .env   # jeśli .env nie istnieje - domyślnie wskazuje na localhost:1337
npm run dev     # dev server z live reload
npm run build   # pełny build SSG - wymaga uruchomionego Strapi (czyta dane w build-time)
```

Astro **nie renderuje po stronie serwera (SSR)** - wszystko jest generowane statycznie (SSG)
podczas builda, na podstawie danych pobranych ze Strapi REST API w tym momencie.

## Status

- [x] Krok 1: scraping i analiza nstudio.pl (`content/scraped/`)
- [x] Krok 2: setup Astro + Strapi, content types, integracja REST API w build-time
- [x] Krok 3: design system (kolory, typografia, komponenty bazowe)
- [x] Krok 4: podstrony z realną treścią
- [x] Krok 5: hero z shaderem + placeholder pod Three.js (`Hero3DPlaceholder.astro`)
- [x] Krok 6: SEO / structured data
- [x] Krok 7: GitHub Actions + deploy na GitHub Pages

## Deploy

`.github/workflows/deploy.yml` buduje i wdraża stronę na GitHub Pages przy każdym pushu do
`main`. Ponieważ Astro pobiera dane ze Strapi w build-time, a Strapi Cloud jest poza zakresem
tego PoC, workflow odpala efemeryczny Strapi (świeże sekrety, seed tym samym skryptem co
lokalnie, serwer w tle) wyłącznie na czas builda w tym samym jobie CI - bez żadnej zewnętrznej
zależności hostingowej. Obrazy z uploadów Strapi są kopiowane do statycznego builda
(`web/scripts/sync-uploads.mjs`), więc wdrożona strona nie zależy od działającego Strapi
w runtime.

Strona jest wdrożona pod subdomeną GitHub Pages, nie pod nstudio.pl - `astro.config.mjs` ma
ustawione `base: '/nstudio-redesign'`, a wszystkie wewnętrzne linki/obrazy przechodzą przez
`web/src/lib/url.ts` (`withBase`), żeby to respektować.
