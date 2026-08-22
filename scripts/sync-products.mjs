import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const sourceDir = process.env.PRODUCT_SOURCE_DIR ?? path.resolve("../outputs/raclette-finder-phase1");
const destination = path.resolve("src/data/products.json");

const [devices, accessories] = await Promise.all([
  readFile(path.join(sourceDir, "final_devices.json"), "utf8").then(JSON.parse),
  readFile(path.join(sourceDir, "final_accessories.json"), "utf8").then(JSON.parse),
]);

const normalize = (item) => ({
  id: item.id,
  type: item.produkttyp === "Raclette" ? "device" : "accessory",
  title: item.produkttitel,
  brand: item.marke,
  model: item.modell,
  asin: item.asin,
  amazonUrl: item.amazon_url,
  affiliateUrl: item.affiliate_link,
  category: item.kategorie,
  subcategory: item.unterkategorie,
  price: typeof item.preis_eur === "number" ? item.preis_eur : null,
  priceLabel: item.preis_anzeige,
  prime: Boolean(item.prime),
  availability: item.lieferstatus,
  people: typeof item.personen_oder_pfaennchen === "number" ? item.personen_oder_pfaennchen : null,
  watts: typeof item.leistung_watt === "number" ? item.leistung_watt : null,
  plate: item.grill_und_plattenart,
  material: item.material,
  dimensions: item.abmessungen,
  weight: item.gewicht,
  color: item.farbe,
  features: item.wichtigste_eigenschaften.split(" | ").filter(Boolean).slice(0, 5),
  specialFeatures: item.besondere_funktionen,
  rating: typeof item.bewertung === "number" ? item.bewertung : null,
  ratingCount: typeof item.anzahl_bewertungen === "number" ? item.anzahl_bewertungen : null,
  summary: item.produktzusammenfassung,
  benefits: item.vorteile.split(" | ").filter(Boolean).slice(0, 3),
  caveat: item.moegliche_nachteile,
  audience: item.zielgruppe,
  useCase: item.einsatzzweck,
  priceClass: item.preis_leistungsklasse,
  recommendation: item.empfehlungskategorie,
  checkedAt: item.pruefzeitpunkt,
  sourceUrl: item.quellseite,
});

await mkdir(path.dirname(destination), { recursive: true });
await writeFile(destination, `${JSON.stringify([...devices, ...accessories].map(normalize), null, 2)}\n`);
console.log(`Wrote ${devices.length} devices and ${accessories.length} accessories to ${destination}`);
