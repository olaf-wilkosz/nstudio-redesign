# Mapa serwisu nstudio.pl (stan na 2026-07-04)

Stack: WordPress + Elementor (motyw OceanWP, wtyczka Elementor Pro, "sticky-header-effects-for-elementor").
Elementor kit ID: `elementor-kit-62`.

## Nawigacja główna

| Strona | URL | Status |
|---|---|---|
| Strona główna | https://nstudio.pl/ | OK |
| O mnie | https://nstudio.pl/o-mnie-projektowanie-wnetrz/ | OK |
| Portfolio (landing/wizualizacje) | https://nstudio.pl/portfolio-projektowanie-wnetrz/ | OK |
| Portfolio > Projekty prywatne | https://nstudio.pl/projekty-prywatne/ | OK |
| Portfolio > Projekty komercyjne | https://nstudio.pl/projekty-komercyjne/ | OK |
| Realizacje pod klucz | https://nstudio.pl/wykonczenia-wnetrz/ | OK |
| Oferta | https://nstudio.pl/oferta-projektowania-wnetrz/ | OK |
| Blog (listing) | https://nstudio.pl/blog/ | OK |
| Kontakt | https://nstudio.pl/kontakt-projektowania-wnetrz/ | OK |
| Meble na wymiar | https://nstudio.pl/meble-na-wymiar/ | OK |

## Stopka

| Strona | URL | Status |
|---|---|---|
| Mevel Design | https://nstudio.pl/mevel-design/ | OK |
| Projektant wnętrz Tarnów | https://nstudio.pl/projektant-wnetrz-tarnow/ | OK |
| ATWI.PL (link do twórcy strony) | https://atwi.pl/strona-internetowa-za-darmo/ | Pominięte celowo (nie jest treścią Nstudio) |

## Ważne odkrycie strukturalne: brak osobnych podstron dla realizacji

W przeciwieństwie do założenia w briefie, **strony `/projekty-prywatne/` i `/projekty-komercyjne/` NIE linkują do osobnych podstron per-projekt**. Zamiast tego każda "realizacja" to osobna galeria obrazów (widget Elementor "Gallery") osadzona bezpośrednio na tej samej stronie, jedna po drugiej. Nie ma unikalnych URL-i typu `/projekty-prywatne/nazwa-projektu/`.

- **Projekty komercyjne** (https://nstudio.pl/projekty-komercyjne/): 6 galerii, każda z prawdziwym, czytelnym nagłówkiem tekstowym (potwierdzone w surowym HTML):
  1. pierogarnia (9 zdjęć)
  2. projekt biura doradczo prawnego (7 zdjęć)
  3. Sala weselna Hotel Resident Sarzyna (22 zdjęcia)
  4. Zakopane Lodowy Wierch (24 zdjęcia)
  5. szkoła dostępna (17 zdjęć - rzuty/plany, nie zdjęcia realizacji)
  6. Zakopane Złota Góra (10 zdjęć)

- **Projekty prywatne** (https://nstudio.pl/projekty-prywatne/): 17 galerii obrazów, ALE **bez żadnych podpisów/nazw w kodzie źródłowym** (nagłówki Elementor nad każdą galerią są puste, atrybuty `alt` obrazów prawie zawsze puste poza 2 wyjątkami: "Projekt wnętrza, biała łazienka" i "Projekt wnętrza, różowa łazienka"). Nazwano je roboczo `prywatne-01` .. `prywatne-17` w kolejności występowania na stronie, z opisową etykietą wywnioskowaną z nazw plików obrazów (np. dużo plików `lazienka*`, `kuchnia*`, `salon*`) tam gdzie to możliwe.
  - **WAŻNA UWAGA O JAKOŚCI DANYCH**: pierwsze automatyczne pobranie tej strony (przez narzędzie WebFetch, które konwertuje HTML→markdown i odpytuje mały model) zwróciło listę 17 "kategorii" o brzmiących nazwach: "black bathroom", "gold elegance", "grey stone", "modern luxury", "scandi", "pokój boho" itd. **Te nazwy zostały zweryfikowane jako HALUCYNACJA małego modelu** — nie istnieją nigdzie w surowym HTML strony (sprawdzono grep po wszystkich tekstach nagłówków, atrybutach alt, tytułach lightboxa). Nie użyto ich w dalszych plikach. To ważna lekcja: przy tego typu scrapingu trzeba zawsze weryfikować wyniki WebFetch na surowym HTML dla stron o krytycznym znaczeniu.

- **Blog**: tylko **1 wpis** istnieje obecnie na blogu (https://nstudio.pl/wizualizacje-komputerowe-w-projektowaniu-wnetrz/, opublikowany 26 marca 2026). Nie znaleziono 5+ wpisów wymaganych w briefie — to wszystko, co strona obecnie zawiera. Blog wygląda na nowo uruchomiony/rzadko aktualizowany.

## Realizacje pod klucz - galeria zdjęć rzeczywistych

Strona https://nstudio.pl/wykonczenia-wnetrz/ zawiera jedną dużą galerię 61 prawdziwych zdjęć fotograficznych (nie wizualizacji) z wykończonych wnętrz - najwyższa jakość obrazu w całym serwisie (pliki `-scaled.jpg`, tj. oryginalne rozdzielczości WordPress, część > 800KB).

## Social media (poza zakresem tego etapu - tylko odnotowane URL-e)

- Facebook: https://www.facebook.com/Nstudiownetrz
- Instagram: https://www.instagram.com/nstudio.projekty.wnetrz/
- YouTube: https://www.youtube.com/watch?v=FNh9ojRxtqM
- Google Maps (lokalizacja firmy): https://www.google.com/maps/place/Natalia+Osipa-Indycka+STUDIO+Projektowanie+wn%C4%99trz/@50.0209256,22.0198705,15z

Treść tych kanałów NIE została scrapowana (zgodnie z zakresem zadania) - jedynie zanotowano adresy do wykorzystania w przyszłym singletonie Strapi "Ustawienia" / dane kontaktowe.

## Błędy / rzeczy nieudane

- Jeden obraz się nie pobrał: `https://nstudio.pl/wp-content/uploads/2022/11/2-2.png` (404 Not Found) — użyty jako ilustracja na stronie `/meble-na-wymiar/`. Prawdopodobnie usunięty z serwera, mimo że wciąż linkowany w HTML.
- Brak strony 404 lub innych błędów przy pobieraniu HTML/tekstu - wszystkie 15 stron z nawigacji + stopki pobrano poprawnie za pierwszym razem.
- Nie znaleziono dodatkowych podstron portfolio poza tymi opisanymi powyżej (brak paginacji na blogu, brak dodatkowych landing page'y wykrytych w linkach wewnętrznych poza tymi w briefie).

## Pliki CSS (do palety kolorów, patrz 12-color-palette.md)

- `https://nstudio.pl/wp-content/uploads/elementor/css/global.css` — globalne reguły typografii (odwołania do zmiennych)
- `https://nstudio.pl/wp-content/uploads/elementor/css/post-62.css` — **kluczowy plik**: definicje `--e-global-color-*` i `--e-global-typography-*` dla `elementor-kit-62` (prawdziwe hex-y marki)
- `https://nstudio.pl/wp-content/uploads/elementor/css/post-6.css`, `post-9.css`, `post-13.css` — style specyficzne dla poszczególnych podstron (dodatkowe hex-y kontekstowe)
- Google Fonts: Oswald, Heebo, Lato, Roboto, Oxygen (wczytywane, ale faktycznie używane w kit: Lato, Heebo, Roboto)
