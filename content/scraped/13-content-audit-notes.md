# Audyt treści — wzorce "sales bloat" znalezione i skondensowane

Ten plik podsumowuje powtarzalne, rozdęte wzorce sprzedażowe znalezione w treści nstudio.pl, żeby przyszłe prace nad copy (etap 2+) miały punkt odniesienia co do tego, co już zostało uznane za redundantne i skondensowane.

## Ogólna obserwacja

Strona jest typowym przykładem WordPress + Elementor "kompozowanego z bloków" — te same 6-9 "korzyści ze współpracy" (oszczędność czasu, dostęp do materiałów, oszczędność pieniędzy, harmonijne wnętrze, zarządzanie projektem, wzrost wartości nieruchomości, meble na wymiar) pojawiają się niemal identycznie na: stronie głównej, stronie "O mnie" (sekcja "Współpraca z Nstudio"), stronie "Realizacje pod klucz" oraz częściowo w "Ofercie". Każde wystąpienie ma osobny blok ikona+nagłówek+akapit, co w oryginale mnoży objętość tekstu 3-4x bez dodawania nowej treści.

## Konkretne przykłady kondensacji (przed → po)

1. **Rozdęta lista "dlaczego warto" (occurring 3x w serwisie)**
   - Przed (wzorzec powtarzany z drobnymi wariacjami słownymi na 3 różnych stronach): "Współpracując z nami zaoszczędzisz cenny czas, ponieważ to my zajmiemy się poszukiwaniem najlepszych materiałów, dostawców i będziemy koordynować cały proces zamówień, dzięki czemu Ty możesz skupić się na swoich obowiązkach" (+ analogiczne akapity dla każdej z 9 korzyści, każdy 40-60 słów).
   - Po: "Oszczędność czasu — projektant przejmuje poszukiwanie materiałów, dostawców i koordynację zamówień." (jedno zdanie, sens zachowany, w `01-strona-glowna.md` i `02-o-mnie.md`).

2. **CTA powtórzone dosłownie na każdej podstronie**
   - Przed: sekcja "Zainteresowała Cię Nasza Oferta? Skontaktuj Się Z Nami Już Teraz" pojawia się jako pełny blok (nagłówek + podnagłówek + przycisk + dane kontaktowe) na dosłownie każdej z 15 pobranych stron, za każdym razem identycznie.
   - Po: odnotowane raz jako wzorzec w `13-content-audit-notes.md`/`09-kontakt.md`, w plikach per-strona skrócone do jednej linijki "CTA: [tekst] → [link]" zamiast pełnego powtórzenia bloku.

3. **"Kompleksowość" i "profesjonalizm" jako wypełniacz przymiotnikowy**
   - Przed (typowy fragment z Oferty/Realizacji pod klucz): "Oferujemy kompleksowe, profesjonalne i indywidualnie dopasowane podejście do każdego klienta, gwarantując najwyższą jakość usług na każdym etapie współpracy" — fraza powtórzona z drobnymi odmianami na stronach Oferta, Realizacje pod klucz, Meble na wymiar i stronie głównej.
   - Po: usunięto powtórzenia przymiotnikowe, zostawiając tylko konkretną, unikalną treść danej sekcji (np. rzeczywisty zakres pakietu, konkretna usługa).

4. **Duplikacja opisu procesu projektowego**
   - Przed: opis procesu "konsultacja → projekt → nadzór → realizacja" pojawia się w niemal identycznym brzmieniu na stronach: Oferta, Realizacje pod klucz, Projektant wnętrz Tarnów — każdorazowo z pełnym rozwinięciem 3-4 zdań.
   - Po: opisany raz szczegółowo w `06-oferta.md` (sekcja pakietów), w pozostałych plikach zredukowany do jednozdaniowego odniesienia.

5. **"Wymarzone wnętrze" / "wnętrze odzwierciedleniem duszy" jako motyw powtarzany**
   - Przed: fraza typu "pomożemy Ci stworzyć wymarzone wnętrze" / "zaprojektujemy wnętrze Twoich marzeń" pojawia się jako lejtmotyw na stronie głównej, w ofercie i częściowo na stronie o mnie, zawsze w niemal tej samej formie.
   - Po: zachowana **tylko raz**, w miejscu gdzie ma faktyczne pokrycie w unikalnej treści — cytat Natalii "Wierzę, że wnętrze jest odzwierciedleniem duszy mieszkańców" w `02-o-mnie.md`, jako autentyczny głos właścicielki, a nie generyczny slogan.

## Treść, która NIE jest bloatem i została zachowana w całości

- Bio Natalii Osipy-Indyckiej (`02-o-mnie.md`) — unikalne, osobiste, jedyne w swoim rodzaju na całej stronie.
- Konkretne dane kontaktowe (telefon, e-mail, adres) — zawsze faktyczne, nigdy nie skracane.
- Nazwy własne realizacji komercyjnych (Pierogarnia, Sala weselna Hotel Resident Sarzyna, Zakopane Lodowy Wierch/Złota Góra, biuro doradczo-prawne, szkoła dostępna) — konkretne fakty, zachowane.
- Zakres pakietów usługowych (Projekt kompleksowy / z nadzorem / Pod klucz) — konkretna, użyteczna treść biznesowa.
- Treść wpisu blogowego o wizualizacjach komputerowych — jedyny wpis na blogu, zachowany w skondensowanej, ale wiernej formie.

## Znalezisko dodatkowe: halucynacja narzędzia scrapującego

Przy pierwszym automatycznym przebiegu WebFetch dla strony `/projekty-prywatne/` narzędzie (małe LLM konwertujące HTML→markdown) **wymyśliło 17 chwytliwych nazw kategorii** ("black bathroom", "gold elegance", "grey stone", "modern luxury", "scandi" itd.), których nie ma nigdzie w rzeczywistym kodzie źródłowym strony. Zweryfikowano to przez bezpośrednie pobranie i przeszukanie surowego HTML (grep po nagłówkach, atrybutach `alt`, tytułach lightboxa) — żadna z tych nazw się nie pojawia. Nie użyto ich w żadnym z plików wynikowych; galerie prywatne nazwano neutralnie `prywatne-01` do `prywatne-17` z opisem opartym wyłącznie na faktycznych nazwach plików graficznych. To ważna wskazówka na przyszłość: przy podobnym scrapingu należy zawsze weryfikować chwytliwie brzmiące, "zbyt dobre żeby były prawdziwe" wyniki narzędzi opartych o małe modele względem surowego HTML.
