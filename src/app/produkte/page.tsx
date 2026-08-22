import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { accessories, devices } from "@/data/products";

export const metadata: Metadata = { title: "Raclette-Geräte und Zubehör", description: "Übersicht der dokumentierten Raclette-Geräte und Zubehörprodukte mit transparentem Datenstand.", alternates: { canonical: "/produkte" } };

export default function ProductsPage() {
  return (
    <main>
      <section className="page-hero compact">
        <div className="site-width">
          <p className="eyebrow"><span />Produktübersicht</p>
          <h1>200 Geräte. 50 Zubehörideen.</h1>
          <p>Jeder Eintrag zeigt das unveränderte, Amazon-gehostete Hauptbild der jeweiligen ASIN. Ein Klick auf das Produktfoto führt transparent gekennzeichnet zu Amazon.</p>
        </div>
      </section>
      <section className="catalog-section">
        <div className="site-width">
          <div className="catalog-intro">
            <div><p className="section-number">Raclette-Geräte</p><h2>Eine kuratierte Übersicht.</h2></div>
            <p>Alle {devices.length} dokumentierten Modelle im Überblick und als Grundlage für Finder und Ergebnisberechnung.</p>
          </div>
          <div className="product-grid catalog-grid">{devices.map((product) => <ProductCard key={product.id} product={product} />)}</div>
          <div className="catalog-intro accessories">
            <div><p className="section-number">Zubehör</p><h2>Die sinnvollen Ergänzungen.</h2></div>
            <p>Alle {accessories.length} dokumentierten Zubehörprodukte – von Schabern bis Ersatzpfännchen.</p>
          </div>
          <div className="product-grid catalog-grid">{accessories.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </section>
    </main>
  );
}
