// Pickon facts for the homepage. Source: veon/client.json only (ids in comments). Nothing here is invented.

export interface Phone { display: string; short: string; href: string; }

// company.contacts.phones
export const phones: Phone[] = [
  { display: "+380 50 075-65-35", short: "050 075-65-35", href: "tel:+380500756535" },
  { display: "+380 68 075-65-35", short: "068 075-65-35", href: "tel:+380680756535" },
  { display: "+380 63 075-65-35", short: "063 075-65-35", href: "tel:+380630756535" },
  { display: "+380 97 702-38-62", short: "097 702-38-62", href: "tel:+380977023862" },
];
export const mainPhone = phones[0];

// company.contacts.emails, messengers (socials[viber] — confirmed)
export const email = "pickon@ukr.net";
export const viber = "viber://pa?chatURI=pickon";

// company.contacts.addresses[0]
export const address = { city: "м. Запоріжжя", street: "вул. Шкільна, 56" };
export const mapHref =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Запоріжжя, вулиця Шкільна, 56");

// company.contacts.hours
export const hours = [
  { days: "Пн–Пт", time: "08:30–16:00" },
  { days: "Сб", time: "09:00–14:00" },
  { days: "Нд", time: "вихідний" },
];

// C-004: 77 car makes of the «Автоскло» section, as the shop writes them.
const makesRaw = [
  "Audi", "Acura", "Alfa Romeo", "Bedford", "Bentley", "BMW", "BYD", "Cadillac", "Chana", "Changhe", "Chery",
  "Chevrolet", "Chrysler", "Citroen", "Dacia", "Daewoo", "Daihatsu", "Dodge", "Dong Feng", "FAW", "Fiat", "Ford",
  "Foton", "Geely", "GMC", "Gonow", "Great Wall", "Honda", "Hummer", "Hyundai", "Infiniti", "Iran", "Isuzu", "Iveco",
  "Jac", "Jaguar", "Jeep", "KIA", "Lancia", "Landrover", "Lexus", "Lifan", "Lincoln", "Maserati", "Mazda", "Mercedes",
  "MG", "Mini", "Mitsubishi", "Nissan", "Opel", "Peugeot", "Porsche", "Proton", "Renault", "Rover", "Saab", "Samsung",
  "Scion", "Seat", "Skoda", "SMA", "Smart", "Soueast", "SsangYong", "Subaru", "Suzuki", "Tata", "Tesla", "Toyota",
  "Volvo", "VW", "Богдан", "ВАЗ", "ГАЗ", "ЗАЗ", "УАЗ",
];
const isCyr = (s: string) => /^[Ѐ-ӿ]/.test(s);
// Latin first, then Cyrillic; alphabetical inside each script.
export const makes: string[] = [...makesRaw].sort((a, b) => {
  const ca = isCyr(a), cb = isCyr(b);
  if (ca !== cb) return ca ? 1 : -1;
  return a.localeCompare(b, ca ? "uk" : "en", { sensitivity: "base" });
});

export interface MakeGroup { letter: string; makes: string[]; }
export const makeGroups: MakeGroup[] = makes.reduce<MakeGroup[]>((acc, m) => {
  const letter = m[0].toLocaleUpperCase("uk");
  const last = acc[acc.length - 1];
  if (last && last.letter === letter) last.makes.push(m);
  else acc.push({ letter, makes: [m] });
  return acc;
}, []);

// Hero column: real makes from C-004; the middle one sits on the green plate.
export const heroMakes = ["Chevrolet", "Daewoo", "Ford", "Hyundai", "Skoda", "Toyota", "VW", "ВАЗ", "ЗАЗ"];
export const heroMakesMobile = ["Skoda", "VW", "Toyota", "ВАЗ", "Daewoo"];
export const heroCenter = "Skoda";

// business_lines[0]: glass types for the request template
export const glassTypes = [
  { id: "lobove", label: "Лобове", phrase: "лобове скло", subject: "лобове" },
  { id: "zadnie", label: "Заднє", phrase: "заднє скло", subject: "заднє" },
  { id: "bokove", label: "Бокове", phrase: "бокове скло", subject: "бокове" },
];

// C-005: brands on the shop's «Бренди» page (23), text only — no logos.
export const brandGroups = [
  {
    title: "Автоскло",
    items: ["XYG", "Fuyao", "ICOR", "Sekurit", "Pilkington", "AGC Automotive", "Benson", "Safe-Glass", "Splintex",
      "Starglass", "Shatterprufe", "Lemson", "Armourplate", "Guardian", "Hanglass", "PGW", "FPS", "Veltrio"],
  },
  { title: "Автохімія", items: ["Teroson", "Loctite", "Henkel", "SIKA"] },
  { title: "Інструмент", items: ["PMA-Tools"] },
];

// Template for the e-mail request (ux/demo-home.md §7): the visitor sends it from their own mail app.
export function requestMailto(typeSubject: string, make?: string): string {
  const subject = `Підбір скла: ${typeSubject}${make ? `, ${make}` : ""}`;
  const body = [
    `Марка: ${make ?? ""}`,
    "Модель: ",
    "Рік: ",
    `Скло: ${typeSubject}`,
    "Телефон для зв'язку: ",
  ].join("\n");
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function mailto(subject: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

export const futureNote = "Розділ у розробці";
