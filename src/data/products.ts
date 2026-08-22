import rawProducts from "./products.json";
import type { Product } from "./types";

export const products = rawProducts as Product[];
export const devices = products.filter((product) => product.type === "device");
export const accessories = products.filter((product) => product.type === "accessory");
export const productByAsin = new Map(products.map((product) => [product.asin, product]));

export function getCheckedDate(product: Product) {
  return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeZone: "Europe/Berlin" }).format(new Date(product.checkedAt));
}

export function formatPrice(price: number | null) {
  return price === null ? "Preis bei Amazon prüfen" : new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price);
}
