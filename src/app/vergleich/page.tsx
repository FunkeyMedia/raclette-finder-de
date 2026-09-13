import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { AffiliateLink } from "@/components/affiliate-link";
import { ProductVisual } from "@/components/product-visual";
import { devices, productByAsin } from "@/data/products";
import type { Product } from "@/data/types";
import { getAmazonProducts } from "@/lib/amazon-creators-api";
import { selectComparisonIds } from "@/lib/comparison-state";
import { ComparisonLink } from "@/components/comparison-link";

export const metadata: Metadata = {
  title: "Raclette-Vergleich",
  description:
    "Vergleiche zwei bis vier Raclette-Geräte anhand der wirklich entscheidenden Unterschiede.",
  alternates: { canonical: "/vergleich" },
};

export default async function ComparePage({
  searchParams,
}: PageProps<"/vergleich">) {
  const params = await searchParams;
  const raw = Array.isArray(params.ids) ? params.ids[0] : params.ids;
  const ids = selectComparisonIds(raw, devices.map((product) => product.asin), devices.slice(0, 3).map((product) => product.asin));
  const selected = ids
    .map((id) => productByAsin.get(id))
    .filter((product): product is Product => product?.type === "device")
    .slice(0, 4);
  const products = selected;
  const amazonProducts = await getAmazonProducts(products.map((product) => product.asin));
  const rows = [
    {
      label: "Passende Runde",
      value: (product: (typeof products)[number]) =>
        product.people
          ? `Bis etwa ${product.people} Personen`
          : "Nicht eindeutig angegeben",
    },
    {
      label: "Aktueller Amazon-Preis",
      value: (product: (typeof products)[number]) => amazonProducts.get(product.asin)?.priceDisplay ?? "Bei Amazon prüfen",
    },
    {
      label: "Leistung",
      value: (product: (typeof products)[number]) =>
        product.watts ? `${product.watts} Watt` : "Nicht angegeben",
    },
    {
      label: "Grillfläche",
      value: (product: (typeof products)[number]) =>
        product.plate || "Nicht angegeben",
    },
    {
      label: "Abmessungen",
      value: (product: (typeof products)[number]) => product.dimensions,
    },
    {
      label: "Gewicht",
      value: (product: (typeof products)[number]) => product.weight,
    },
    {
      label: "Amazon-Kundenbewertung*",
      value: (product: (typeof products)[number]) =>
        product.rating
          ? `${product.rating.toLocaleString("de-DE")} / 5 (${product.ratingCount?.toLocaleString("de-DE") ?? "–"})`
          : "Nicht angegeben",
    },
  ];
  return (
    <main>
      <section className="page-hero compact">
        <div className="site-width">
          <p className="eyebrow">
            <span />
            Direktvergleich
          </p>
          <h1>Die Unterschiede, die wirklich zählen.</h1>
          <p>
            Zwei bis vier Geräte, gut lesbar statt Tabellenwüste. Fehlende
            Angaben bleiben sichtbar.
          </p>
        </div>
      </section>
      <section className="compare-section">
        <div className="site-width">
          {raw === undefined && <p className="table-note">Beispielvergleich: Diese drei Geräte sind vorausgewählt. Deine eigene Auswahl stellst du im Produktkatalog zusammen.</p>}
          {products.length === 0 && <p role="status">Die Geräte aus diesem Link sind nicht im aktuellen Katalog enthalten. <Link href="/produkte">Geräte neu auswählen</Link></p>}
          {products.length === 1 && <p className="table-note">Ein Gerät ausgewählt. <Link href="/produkte">Weitere Geräte zum Vergleichen auswählen</Link></p>}
          {products.length > 0 && <ComparisonLink key={ids.join(",")} ids={ids} />}
          {products.length > 0 && <><div
            className="compare-grid"
            style={{ "--columns": products.length } as CSSProperties}
          >
            <div className="compare-label-head">
              <p>Produkte</p>
            </div>
            {products.map((product) => (
              <article className="compare-product" key={product.id}>
                <ProductVisual product={product} amazon={amazonProducts.get(product.asin)} compact />
                <p>{product.brand}</p>
                <h2>
                  <Link href={`/produkte/${product.asin}`}>
                    {product.title}
                  </Link>
                </h2>
                <AffiliateLink
                  href={amazonProducts.get(product.asin)?.detailPageUrl ?? product.affiliateUrl}
                  productId={product.id}
                  className="amazon-button small"
                />
              </article>
            ))}
            {rows.map((row) => (
              <div className="compare-row" key={row.label}>
                <strong>{row.label}</strong>
                {products.map((product) => (
                  <div key={product.id}>{row.value(product)}</div>
                ))}
              </div>
            ))}
          </div>
          <p className="table-note">
            * Preise und Originalbilder stammen aus der Amazon Creators API.
            Bewertungen sind dokumentierte Momentaufnahmen und keine eigene
            Testbewertung. Aktuelle Angaben bitte bei Amazon prüfen.
          </p></>}
          <div className="compare-bottom">
            <Link href="/finder">Finder neu starten</Link>
            <Link href="/produkte">Weitere Geräte ansehen</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
