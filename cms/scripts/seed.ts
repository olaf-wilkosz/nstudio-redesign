/**
 * Seeds Strapi with real content scraped from nstudio.pl (see content/scraped/).
 * Runs against Strapi's internal Document Service directly - no admin login or
 * HTTP auth needed, so it's safe to run headlessly. Idempotent: skips any
 * realizacja/post whose slug already exists.
 *
 * Usage: npm run seed   (from cms/, Strapi must NOT be running concurrently -
 * this script boots its own in-process Strapi instance against the same DB)
 */
import path from 'node:path';
import fs from 'node:fs';
import { compileStrapi, createStrapi } from '@strapi/strapi';
import type { Core } from '@strapi/strapi';

const SCRAPED_DIR = path.resolve(__dirname, '../../content/scraped');
const IMAGES_DIR = path.join(SCRAPED_DIR, 'images');

type Kategoria = 'mieszkanie' | 'dom' | 'komercyjne';

interface RealizacjaSeed {
  folder: string;
  tytul: string;
  kategoria: Kategoria;
  lokalizacja: string | null;
  opis: string;
  kolejnosc: number;
  galeriaLimit?: number;
}

const REALIZACJE: RealizacjaSeed[] = [
  { folder: 'prywatne-01-black-bathroom', tytul: 'Black Bathroom', kategoria: 'mieszkanie', lokalizacja: null, opis: 'Łazienka w ciemnej, czarnej stylistyce.', kolejnosc: 1 },
  { folder: 'prywatne-02-eleganckie-lsnienie', tytul: 'Eleganckie Lśnienie', kategoria: 'mieszkanie', lokalizacja: null, opis: 'Elegancka aranżacja wnętrza z połyskliwymi akcentami.', kolejnosc: 2 },
  { folder: 'prywatne-03-gold-elegance', tytul: 'Gold Elegance', kategoria: 'mieszkanie', lokalizacja: null, opis: 'Stylistyka elegancka ze złotymi akcentami.', kolejnosc: 3 },
  { folder: 'prywatne-04-grey-stone', tytul: 'Grey Stone', kategoria: 'dom', lokalizacja: null, opis: 'Pełny, wielopomieszczeniowy projekt domu - gabinet, łazienka, kuchnia i sypialnia w chłodnej, kamiennej kolorystyce.', kolejnosc: 4 },
  { folder: 'prywatne-05-kaszmirowy-skandynawski', tytul: 'Kaszmirowy Skandynawski', kategoria: 'mieszkanie', lokalizacja: null, opis: 'Styl skandynawski w ciepłej, kaszmirowej odsłonie.', kolejnosc: 5 },
  { folder: 'prywatne-06-lazienka-marmur-z-drewnem', tytul: 'Łazienka Marmur z Drewnem', kategoria: 'mieszkanie', lokalizacja: null, opis: 'Łazienka łącząca marmur z ciepłym drewnem.', kolejnosc: 6 },
  { folder: 'prywatne-07-lazienka-marmur-ze-zlotem', tytul: 'Łazienka Marmur ze Złotem', kategoria: 'mieszkanie', lokalizacja: null, opis: 'Łazienka łącząca marmur ze złotymi akcentami.', kolejnosc: 7 },
  { folder: 'prywatne-08-modern-antresola', tytul: 'Modern Antresola', kategoria: 'mieszkanie', lokalizacja: null, opis: 'Nowoczesne wnętrze z antresolą, skoncentrowane na łazience i kuchni.', kolejnosc: 8 },
  { folder: 'prywatne-09-modern-country', tytul: 'Modern Country', kategoria: 'mieszkanie', lokalizacja: null, opis: 'Wystrój w stylu modern country.', kolejnosc: 9 },
  { folder: 'prywatne-10-modern-luxury', tytul: 'Modern Luxury', kategoria: 'dom', lokalizacja: null, opis: 'Kompletny, wielopokojowy projekt rodzinnego domu - salon, sypialnia, pokój dziecka, jadalnia, kuchnia, łazienka, toaleta i garderoba.', kolejnosc: 10 },
  { folder: 'prywatne-11-nobliwy-skandynawski', tytul: 'Nobliwy Skandynawski', kategoria: 'mieszkanie', lokalizacja: null, opis: 'Szlachetna, "nobliwa" odsłona stylu skandynawskiego.', kolejnosc: 11 },
  { folder: 'prywatne-12-pokoj-boho', tytul: 'Pokój Boho', kategoria: 'mieszkanie', lokalizacja: null, opis: 'Pokój w stylu boho.', kolejnosc: 12 },
  { folder: 'prywatne-13-pokoj-krolewny', tytul: 'Pokój Królewny', kategoria: 'mieszkanie', lokalizacja: null, opis: 'Pokój w stylistyce "królewny".', kolejnosc: 13 },
  { folder: 'prywatne-14-pokoj-loft', tytul: 'Pokój Loft', kategoria: 'mieszkanie', lokalizacja: null, opis: 'Pokój w stylistyce loft.', kolejnosc: 14 },
  { folder: 'prywatne-15-salon-z-kominkiem', tytul: 'Salon z Kominkiem', kategoria: 'mieszkanie', lokalizacja: null, opis: 'Salon z kominkiem.', kolejnosc: 15 },
  { folder: 'prywatne-16-scandi', tytul: 'Scandi', kategoria: 'mieszkanie', lokalizacja: null, opis: 'Kuchnia w stylu skandynawskim.', kolejnosc: 16 },
  { folder: 'prywatne-17-szkice-meska-jaskinia', tytul: 'Szkice Męska Jaskinia', kategoria: 'mieszkanie', lokalizacja: null, opis: 'Męski gabinet/pokój w stylu "man cave".', kolejnosc: 17 },
  { folder: 'komercyjne-pierogarnia', tytul: 'Pierogarnia', kategoria: 'komercyjne', lokalizacja: null, opis: 'Projekt wnętrza lokalu gastronomicznego specjalizującego się w pierogach.', kolejnosc: 18 },
  { folder: 'komercyjne-biuro-prawne', tytul: 'Biuro doradczo-prawne', kategoria: 'komercyjne', lokalizacja: null, opis: 'Projekt wnętrza biura dla firmy doradczo-prawnej.', kolejnosc: 19 },
  { folder: 'komercyjne-sala-weselna-sarzyna', tytul: 'Sala weselna, Hotel Resident Sarzyna', kategoria: 'komercyjne', lokalizacja: 'Sarzyna (Hotel Resident)', opis: 'Aranżacja sali weselnej i strefy wejścia w Hotelu Resident w Sarzynie - największa realizacja komercyjna w portfolio.', kolejnosc: 20, galeriaLimit: 12 },
  { folder: 'komercyjne-zakopane-lodowy-wierch', tytul: 'Zakopane - Lodowy Wierch', kategoria: 'komercyjne', lokalizacja: 'Zakopane', opis: 'Wnętrza obiektu turystycznego "Lodowy Wierch" w Zakopanem, w góralskiej, rustykalnej konwencji.', kolejnosc: 21, galeriaLimit: 12 },
  { folder: 'komercyjne-szkola', tytul: 'Szkoła dostępna', kategoria: 'komercyjne', lokalizacja: null, opis: 'Projekt dostosowania budynku szkoły do wymogów dostępności architektonicznej - rzuty i plany.', kolejnosc: 22 },
  { folder: 'komercyjne-zakopane-zlota-gora', tytul: 'Zakopane - Złota Góra', kategoria: 'komercyjne', lokalizacja: 'Zakopane', opis: 'Wnętrza obiektu turystycznego "Złota Góra" w Zakopanem.', kolejnosc: 23 },
];

const BLOG_POST = {
  folder: 'blog',
  tytul: 'Wizualizacje komputerowe w projektowaniu wnętrz',
  slug: 'wizualizacje-komputerowe-w-projektowaniu-wnetrz',
  zajawka:
    'Wizualizacje komputerowe przyspieszają podejmowanie decyzji, pokazując realistyczny efekt końcowy jeszcze przed realizacją.',
  tresc: `Wizualizacje komputerowe przyspieszają podejmowanie decyzji projektowych, pokazując realistyczny efekt końcowy jeszcze przed realizacją. Ułatwiają porównanie opcji kolorystycznych, materiałowych i układu pomieszczenia, a także umożliwiają szybkie wprowadzanie poprawek bez wpływu na budżet i ergonomię przestrzeni.

**Elastyczność projektów**: profesjonalne wizualizacje skracają czas iteracji - pozwalają szybko testować różne warianty układu i materiałów przed podjęciem ostatecznej decyzji.

**Funkcjonalność wnętrz**: precyzyjne modele 3D wspierają ocenę ergonomii pomieszczenia (np. czy dana aranżacja mebli faktycznie się sprawdzi w praktyce).

**Komunikacja z klientem**: wizualizacje przekładają abstrakcyjny projekt na konkretny, realistyczny obraz, co ułatwia merytoryczną rozmowę z klientem opartą na faktycznym wyglądzie wnętrza, a nie wyobrażeniu.

Profesjonalne wizualizacje komputerowe znacząco usprawniają proces projektowania wnętrz - zwiększają zrozumienie ze strony klienta, redukują liczbę błędów i podnoszą satysfakcję z efektu końcowego.`,
  data: '2026-03-26',
};

const USTAWIENIA = {
  telefon: '+48 725 929 259',
  telefonMeble: '+48 509 532 613',
  email: 'biuro@nstudio.pl',
  emailMeble: 'meblenawymiar@nstudio.pl',
  adres: 'al. T. Rejtana 53a/206, CH Respan p.206, 35-328 Rzeszów',
  godzinyOtwarcia: undefined,
  facebook: 'https://www.facebook.com/Nstudiownetrz',
  instagram: 'https://www.instagram.com/nstudio.projekty.wnetrz/',
  youtube: 'https://www.youtube.com/watch?v=FNh9ojRxtqM',
  googleMaps:
    'https://www.google.com/maps/place/Natalia+Osipa-Indycka+STUDIO+Projektowanie+wn%C4%99trz/@50.0209256,22.0198705,15z',
  lat: 50.0209256,
  lng: 22.0198705,
};

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const PL_CHARS: Record<string, string> = { ł: 'l', Ł: 'L', ą: 'a', ć: 'c', ę: 'e', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' };

function slugify(title: string): string {
  return title
    .replace(/[łŁąćęńóśźż]/g, (ch) => PL_CHARS[ch])
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function listImages(folder: string): string[] {
  const dir = path.join(IMAGES_DIR, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => path.join(dir, f));
}

async function uploadImage(strapi: Core.Strapi, filePath: string, alt: string) {
  const stats = fs.statSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
  const [file] = await strapi.plugin('upload').service('upload').upload({
    data: { fileInfo: { alternativeText: alt } },
    files: {
      filepath: filePath,
      originalFilename: path.basename(filePath),
      mimetype: mime,
      size: stats.size,
    },
  });
  return file;
}

async function seedRealizacje(strapi: Core.Strapi) {
  for (const item of REALIZACJE) {
    const slug = slugify(item.tytul);

    const existing = await strapi.documents('api::realizacja.realizacja').findFirst({
      filters: { slug },
    });
    if (existing) {
      strapi.log.info(`[seed] pomijam realizacja "${item.tytul}" (juz istnieje)`);
      continue;
    }

    const imagePaths = listImages(item.folder).slice(0, item.galeriaLimit ?? 8);
    if (imagePaths.length === 0) {
      strapi.log.warn(`[seed] brak zdjec dla "${item.tytul}" (${item.folder}), pomijam`);
      continue;
    }

    const uploaded = [];
    for (const p of imagePaths) {
      uploaded.push(await uploadImage(strapi, p, `Realizacja Nstudio - ${item.tytul}`));
    }

    await strapi.documents('api::realizacja.realizacja').create({
      data: {
        tytul: item.tytul,
        slug,
        opis: item.opis,
        lokalizacja: item.lokalizacja ?? undefined,
        kategoria: item.kategoria,
        kolejnosc: item.kolejnosc,
        okladka: uploaded[0].id,
        galeria: uploaded.map((f) => f.id),
      },
      status: 'published',
    });
    strapi.log.info(`[seed] utworzono realizacja "${item.tytul}" (${uploaded.length} zdjec)`);
  }
}

async function seedBlog(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::post-bloga.post-bloga').findFirst({
    filters: { slug: BLOG_POST.slug },
  });
  if (existing) {
    strapi.log.info(`[seed] pomijam post bloga "${BLOG_POST.tytul}" (juz istnieje)`);
    return;
  }

  const images = listImages(BLOG_POST.folder);
  const okladka = images.length > 0 ? await uploadImage(strapi, images[0], BLOG_POST.tytul) : null;

  await strapi.documents('api::post-bloga.post-bloga').create({
    data: {
      tytul: BLOG_POST.tytul,
      slug: BLOG_POST.slug,
      zajawka: BLOG_POST.zajawka,
      tresc: BLOG_POST.tresc,
      data: BLOG_POST.data,
      okladka: okladka?.id ?? null,
    },
    status: 'published',
  });
  strapi.log.info(`[seed] utworzono post bloga "${BLOG_POST.tytul}"`);
}

async function seedUstawienia(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::ustawienia.ustawienie').findFirst({});
  if (existing) {
    strapi.log.info('[seed] Ustawienia juz istnieja, pomijam');
    return;
  }
  await strapi.documents('api::ustawienia.ustawienie').create({ data: USTAWIENIA });
  strapi.log.info('[seed] utworzono Ustawienia');
}

async function main() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = 'info';

  try {
    await seedUstawienia(app);
    await seedRealizacje(app);
    await seedBlog(app);
  } finally {
    await app.destroy();
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
