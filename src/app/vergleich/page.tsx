import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { AffiliateLink } from "@/components/affiliate-link";
import { ProductVisual } from "@/components/product-visual";
import { devices, formatPrice, productByAsin } from "@/data/products";
import type { Product } from "@/data/types";

export const metadata: Metadata = { title: "Raclette-Vergleich", description: "Vergleiche zwei bis vier Raclette-Geräte anhand der wirklich entscheidenden Unterschiede.", alternates: { canonical: "/vergleich" } };

export default async function ComparePage({ searchParams }: PageProps<"/vergleich">) {
  const params = await searchParams;
  const raw = Array.isArray(params.ids) ? params.ids[0] : params.ids;
  const ids = raw?.split(",").slice(0, 4) ?? devices.slice(0, 3).map((product) => product.asin);
  const selected = ids.map((id) => productByAsin.get(id)).filter((product): product is Product => product?.type === "device").slice(0, 4);
  const products = selected.length >= 2 ? selected : devices.slice(0, 3);
  const rows = [
    { label: "Passende Runde", value: (product: (typeof products)[number]) => product.people ? `Bis etwa ${product.people} Personen` : "Nicht eindeutig angegeben" },
    { label: "Zuletzt geprüfter Preis", value: (product: (typeof products)[number]) => formatPrice(product.price) },
    { label: "Leistung", value: (product: (typeof products)[number]) => product.watts ? `${product.watts} Watt` : "Nicht angegeben" },
    { label: "Grillfläche", value: (product: (typeof products)[number]) => product.plate || "Nicht angegeben" },
    { label: "Abmessungen", value: (product: (typeof products)[number]) => product.dimensions },
    { label: "Gewicht", value: (product: (typeof products)[number]) => product.weight },
    { label: "Amazon-Kundenbewertung*", value: (product: (typeof products)[number]) => product.rating ? `${product.rating.toLocaleString("de-DE")} / 5 (${product.ratingCount?.toLocaleString("de-DE") ?? "–"})` : "Nicht angegeben" },
  ];
  return <main><section className="page-hero compact"><div className="site-width"><p className="eyebrow"><span />Direktvergleich</p><h1>Die Unterschiede, die wirklich zählen.</h1><p>Zwei bis vier Geräte, gut lesbar statt Tabellenwüste. Fehlende Angaben bleiben sichtbar.</p></div></section><section className="compare-section"><div className="site-width"><div className="compare-grid" style={{ "--columns": products.length } as CSSProperties}><div className="compare-label-head"><p>Produkte</p></div>{products.map((product) => <article className="compare-product" key={product.id}><ProductVisual brand={product.brand} compact /><p>{product.brand}</p><h2><Link href={`/produkte/${product.asin}`}>{product.title}</Link></h2><AffiliateLink href={product.affiliateUrl} productId={product.id} className="amazon-button small" /></article>)}{rows.map((row) => <div className="compare-row" key={row.label}><strong>{row.label}</strong>{products.map((product) => <div key={product.id}>{row.value(product)}</div>)}</div>)}</div><p className="table-note">* Bewertung und Anzahl stammen von der Amazon-Produktseite zum dokumentierten Prüfzeitpunkt. Keine eigene Testbewertung. Aktuelle Angaben bitte bei Amazon prüfen.</p><div className="compare-bottom"><Link href="/finder">Finder neu starten</Link><Link href="/produkte">Weitere Geräte ansehen</Link></div></div></section></main>;
}
