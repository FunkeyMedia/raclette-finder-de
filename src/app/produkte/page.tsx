import type { Metadata } from "next";
import { ProductCatalog } from "@/components/product-catalog";
import { accessories, devices, products } from "@/data/products";

export const metadata: Metadata = { title: "Alle Raclette-Geräte im Überblick", description: "250 Raclette-Geräte und Zubehörprodukte durchsuchen, filtern und nach Preis, Bewertung, Größe oder Leistung sortieren.", alternates: { canonical: "/produkte" } };

export default function ProductsPage() {
  return (
    <main>
      <section className="page-hero compact">
        <div className="site-width">
          <p className="eyebrow"><span />Alle Raclette-Produkte</p>
          <h1>Dein Raclette. Deine Auswahl.</h1>
          <p>Durchsuche alle dokumentierten Geräte und Zubehörartikel. Filtere nach dem, was für deinen Raclette-Abend zählt, und sortiere die Ergebnisse so, wie es zu dir passt.</p>
          <div className="catalog-hero-stats" aria-label="Umfang des Produktkatalogs">
            <div><strong>{products.length}</strong><span>Produkte</span></div>
            <div><strong>{devices.length}</strong><span>Geräte</span></div>
            <div><strong>{accessories.length}</strong><span>Zubehörartikel</span></div>
          </div>
        </div>
      </section>
      <section className="catalog-section">
        <div className="site-width">
          <div className="catalog-intro">
            <div><p className="section-number">Produktkatalog</p><h2>Finde selbst, was zu euch passt.</h2></div>
            <p>Alle Produkte stammen aus derselben transparenten Datengrundlage wie unser Finder. Preise und Verfügbarkeit werden beim Anbieter geprüft.</p>
          </div>
          <ProductCatalog products={products} />
        </div>
      </section>
    </main>
  );
}
