# Paleta kolorów i typografia — wyodrębnione ze strony źródłowej

Źródło danych: `https://nstudio.pl/wp-content/uploads/elementor/css/post-62.css` (plik CSS globalnego "kitu" Elementor, `elementor-kit-62` — jedyne miejsce w serwisie, gdzie zdefiniowane są nazwane zmienne kolorów marki `--e-global-color-*` i typografii `--e-global-typography-*`). Dodatkowo sprawdzono pliki CSS specyficzne dla podstron (`post-6.css`, `post-9.css`, `post-13.css`) dla kolorów kontekstowych (tła sekcji, obramowania).

## Kolory marki zdefiniowane w kicie Elementor (prawdziwe, potwierdzone wartości)

| Zmienna źródłowa | Hex | Rola w obecnym designie |
|---|---|---|
| `--e-global-color-primary` | `#E4BB7D` | Ciepły, przygaszony złoto-beż / "champagne gold" — kolor linków, h3, h4, kolor hover przycisków |
| `--e-global-color-secondary` | `#1D1D1D` | Prawie czarny (antracyt) — kolor h1, h2, h5, h6, tło przycisków |
| `--e-global-color-text` | `#848484` | Szary — domyślny kolor tekstu akapitów |
| `--e-global-color-accent` | `#61CE70` | Zielony — używany w komponentach formularzy (wskaźniki postępu/sukcesu), NIE jest to kolor przewodni marki wizualnie |
| `--e-global-color-0d05fc2` | `#FFFFFF` | Biały — tekst na ciemnym tle, tło sekcji |
| `--e-global-color-bff39c7` | `#F3F3F3` | Jasnoszary — tło sekcji/kart |
| `--e-global-color-894b427` | `#5B5B5B` | Szary średni — tekst pomocniczy |
| `--e-global-color-40a653d` | `#7E7E7E` | Szary jaśniejszy — tekst pomocniczy/wyciszony |
| `--e-global-color-ba576bd` | `#2B2B2B` | Ciemny grafit — alternatywa dla czerni |
| `--e-global-color-20c1a8f` | `#1D1D1DA3` | Czarny z przezroczystością (~64%) — nakładki/overlaye |
| (dodatkowy, w `post-62.css` transition) | `#FFBC7D` | Ciepły brzoskwiniowo-pomarańczowy — kolor przejścia strony (page transition), bliski odcieniowi primary, ale cieplejszy/jaśniejszy |

Dodatkowe hex-y znalezione w CSS podstron (konteksty lokalne, nie globalne zmienne marki): `#E4E4E4` (jasny szaro-beż, obramowania), `#B3B0AB` (ciepły szarobeż, prawdopodobnie tła kart portfolio), `#DAD7D1` (bardzo jasny ciepły beż).

## Typografia obecnie używana na stronie (z `post-62.css`)

- **Nagłówki (h1, h2, h3, h4, h5, h6):** `Lato`, bold, uppercase, line-height 1.25em (rozmiary: h1=72px, h2=48px, h3=32px, h4=25px, h5=20px, h6=18px na desktopie, ze zmniejszeniem responsywnym)
- **Tekst podstawowy / body:** `Heebo`, waga 400, 16px
- **Akcent (prawdopodobnie przyciski/etykiety specjalne):** `Roboto`, waga 500
- Dodatkowo wczytywane przez Google Fonts, ale bez wyraźnego zastosowania w kicie: `Oswald`, `Oxygen`

## Ton wizualny fotografii (obserwacja jakościowa, bez analizy pikselowej)

Na podstawie przeglądu 357 pobranych zdjęć realizacji (zarówno prawdziwych fotografii z `realizacje-pod-klucz`, jak i wizualizacji CGI z galerii prywatnych/komercyjnych):

- Dominują **ciepłe neutralne tony**: beże, jasne drewno (dąb bielony/naturalny), kremowe ściany.
- Częsty motyw: **czerń/antracyt jako akcent** (armatura łazienkowa, oprawy oświetleniowe, ramy luster, stelaże) kontrastujący z jasnymi, ciepłymi tłami — widoczne już w nazwie jednej z realizacji komercyjnych "black bathroom"-podobnych motywów (choć ta konkretna nazwa okazała się niepotwierdzona/halucynacją, sam motyw czarnej armatury faktycznie powtarza się wizualnie w wielu galeriach łazienkowych, np. prywatne-08).
- Sporadyczne akcenty **złota/mosiądzu** (uchwyty, oprawy) — spójne z kolorem primary `#E4BB7D`.
- Kamień/marmur w odcieniach szarości i beżu w łazienkach premium.
- Zieleń pojawia się głównie jako roślinność dekoracyjna, nie jako kolor ścian/materiałów — potwierdza to, że `--e-global-color-accent: #61CE70` (zielony) jest kolorem czysto technicznym/UI (formularze), a nie elementem stylistyki wnętrz.

Wniosek: obecna fotografia wnętrz jest spójna z paletą "ciepły minimalizm / warm neutral" — dokładnie w duchu koloru primary (`#E4BB7D`) i ciemnych akcentów (`#1D1D1D`/`#2B2B2B`), podczas gdy zielony accent w UI wydaje się przypadkowym domyślnym ustawieniem szablonu Elementor, a nie świadomym wyborem marki.

## Proponowana paleta wyjściowa dla redesignu (ewolucja, nie wymyślanie od zera)

Poniższa paleta to **bezpośrednia kontynuacja** obecnych kolorów marki, z doprecyzowaniem ról i zamianą przypadkowego zielonego accentu na kolor spójny z fotografią wnętrz:

| Rola | Hex | Pochodzenie / uzasadnienie |
|---|---|---|
| **Primary (marka)** | `#E4BB7D` | Zachowany 1:1 z obecnego `--e-global-color-primary` — ciepły złoty-beż, już dobrze widoczny w fotografii (mosiądz, drewno) |
| **Primary dark (hover/warianty)** | `#C9A066` | Przyciemniony wariant primary (ok. -15% lightness) do stanów hover/aktywnych, zachowuje rodzinę barwy |
| **Secondary / tekst nagłówków** | `#1D1D1D` | Zachowany 1:1 z obecnego `--e-global-color-secondary` — spójny z czarnymi akcentami w fotografii wnętrz (armatura, ramy) |
| **Accent (nowy, zamiast przypadkowego zielonego)** | `#FFBC7D` | Zachowany z istniejącego page-transition color w CSS — cieplejszy, jaśniejszy wariant primary, dobry na CTA/wyróżnienia zamiast niespójnego zielonego `#61CE70` |
| **Neutral / tło jasne** | `#F5F1EC` | Ewolucja `#F3F3F3` w stronę cieplejszego, kremowego odcienia dopasowanego do tonu drewna/beżu z fotografii |
| **Neutral / tło białe** | `#FFFFFF` | Zachowany bez zmian |
| **Tekst ciemny (body)** | `#2B2B2B` | Zachowany z obecnego (`--e-global-color-ba576bd`), czytelniejszy niż jaśniejszy szary `#848484` na jasnym tle |
| **Tekst jasny / wyciszony** | `#848484` | Zachowany 1:1 — dobry do etykiet pomocniczych, dat, metadanych |

### Typografia — rekomendacja kontynuacji

- Nagłówki: **Lato** (bold) — zachować, dobrze wygląda w wersji uppercase na stronach wnętrzarskich, szeroko dostępny w Google Fonts.
- Tekst podstawowy: **Heebo** — zachować, dobra czytelność.
- Rozważyć zamianę **Roboto** (accent) na coś z większym charakterem (np. serif typu Playfair Display do cytatów/testimoniali), jeśli redesign ma odróżnić się od typowego WP/Elementor looku — do decyzji na etapie makiet.

## Uwaga metodologiczna

Wartości `--e-global-color-primary/secondary/text/accent` pochodzą z **jednego, jawnie zweryfikowanego pliku CSS** pobranego bezpośrednio z serwera (`post-62.css`, rozmiar 7469 bajtów, zawartość odczytana w całości) — nie są to wartości zgadywane ani wywnioskowane przez model z opisu. Paleta proponowana w sekcji powyżej jest subiektywną rekomendacją do dalszej dyskusji projektowej, nie ostatecznym design tokenem.
