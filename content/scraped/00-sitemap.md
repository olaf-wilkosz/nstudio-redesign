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

- **Projekty prywatne** (https://nstudio.pl/projekty-prywatne/): 17 galerii obrazów. Galerie **mają realne, używane przez pracownię nazwy** — Black Bathroom, Eleganckie Lśnienie, Gold Elegance, Grey Stone, Kaszmirowy Skandynawski, Łazienka Marmur z Drewnem, Łazienka Marmur ze Złotem, Modern Antresola, Modern Country, Modern Luxury, Nobliwy Skandynawski, Pokój Boho, Pokój Królewny, Pokój Loft, Salon z Kominkiem, Scandi, Szkice Męska Jaskinia (w tej kolejności = `prywatne-01` .. `prywatne-17`, potwierdzone bezpośrednio przez klientkę, Natalię Osipę-Indycką).
  - **KOREKTA WCZEŚNIEJSZEGO BŁĘDU**: pierwsza automatyczna weryfikacja (grep po nagłówkach Elementor i atrybutach `alt` w surowym HTML, które są puste dla tych galerii) błędnie uznała te nazwy za halucynację narzędzia WebFetch. To był fałszywy negatyw — nazwy nie żyją w widocznym HTML/nagłówkach, ale są rzeczywiste (prawdopodobnie pochodzą z tytułów/metadanych plików w bibliotece mediów WordPress albo z wiedzy właścicielki, nie z tekstu strony). Poszczególne pliki `04-realizacje/prywatne-XX.md` oraz odpowiadające im foldery w `images/` zostały poprawione i zawierają teraz właściwe nazwy.

- **Blog**: tylko **1 wpis** istnieje obecnie na blogu (https://nstudio.pl/wizualizacje-komputerowe-w-projektowaniu-wnetrz/, opublikowany 26 marca 2026). Strona działa od ok. 3 lat, ale blog był od uruchomienia rzadko aktualizowany — to nie nowy blog, tylko zaniedbany. Aktywizacja blogu (regularne treści) to jeden z celów redesignu, nie tylko zmiana wizualna.

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
