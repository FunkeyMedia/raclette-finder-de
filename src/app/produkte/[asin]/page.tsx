import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateLink } from "@/components/affiliate-link";
import { ProductVisual } from "@/components/product-visual";
import {
  formatPrice,
  getCheckedDate,
  productByAsin,
  products,
} from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ asin: product.asin }));
}

export async function generateMetadata({
  params,
}: PageProps<"/produkte/[asin]">): Promise<Metadata> {
  const { asin } = await params;
  const product = productByAsin.get(asin);
  if (!product) return { title: "Produkt nicht gefunden" };
  return {
    title: `${product.brand} ${product.model !== "nicht angegeben" ? product.model : "Raclette"}`,
    description: product.summary.slice(0, 155),
    alternates: { canonical: `/produkte/${product.asin}` },
    openGraph: {
      title: product.title,
      description: product.summary.slice(0, 155),
      images: [],
    },
    twitter: {
      title: product.title,
      description: product.summary.slice(0, 155),
      images: [],
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/produkte/[asin]">) {
  const { asin } = await params;
  const product = productByAsin.get(asin);
  if (!product) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    sku: product.asin,
    brand: { "@type": "Brand", name: product.brand },
    description: product.summary,
  };
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className="product-detail-hero">
        <div className="site-width detail-grid">
          <div>
            <Link className="back-link" href="/produkte">
              ← Alle Geräte
            </Link>
            <p className="product-brand">
              {product.brand} · {product.model}
            </p>
            <h1>{product.title}</h1>
            <p className="detail-summary">{product.summary}</p>
            <div className="detail-price">
              <strong>{formatPrice(product.price)}</strong>
              <span>Produktdaten geprüft am {getCheckedDate(product)}</span>
            </div>
            <AffiliateLink href={product.affiliateUrl} productId={product.id} />
            <p className="affiliate-note light">
              * Affiliate-Link. Der Kaufpreis ändert sich dadurch nicht.
              Aktuelle Preise und Verfügbarkeit siehst du bei Amazon.
            </p>
          </div>
          <ProductVisual product={product} />
        </div>
      </section>
      <section className="detail-section">
        <div className="site-width detail-content">
          <div>
            <p className="section-number">Auf einen Blick</p>
            <h2>Was dokumentiert ist.</h2>
            <dl className="fact-list">
              <div>
                <dt>Geeignete Runde</dt>
                <dd>
                  {product.people
                    ? `Bis etwa ${product.people} Personen`
                    : "Nicht eindeutig angegeben"}
                </dd>
              </div>
              <div>
                <dt>Leistung</dt>
                <dd>
                  {product.watts ? `${product.watts} Watt` : "Nicht angegeben"}
                </dd>
              </div>
              <div>
                <dt>Grillfläche</dt>
                <dd>{product.plate}</dd>
              </div>
              <div>
                <dt>Abmessungen</dt>
                <dd>{product.dimensions}</dd>
              </div>
              <div>
                <dt>Gewicht</dt>
                <dd>{product.weight}</dd>
              </div>
              <div>
                <dt>Farbe</dt>
                <dd>{product.color}</dd>
              </div>
            </dl>
          </div>
          <aside className="detail-aside">
            <p className="section-number">Einordnung</p>
            <h2>{product.recommendation}</h2>
            <ul>
              {product.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            <div className="caution-box">
              <strong>Was wir nicht behaupten</strong>
              <p>
                {product.caveat}. Die Einordnung basiert ausschließlich auf
                dokumentierten Produktangaben, nicht auf einem eigenen
                Praxistest.
              </p>
            </div>
          </aside>
        </div>
      </section>
      <section className="feature-section">
        <div className="site-width">
          <p className="section-number">Eigenschaften</p>
          <div className="feature-grid">
            {product.features.map((feature, index) => (
              <article key={feature}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{feature}</p>
              </article>
            ))}
          </div>
          <div className="source-box">
            <div>
              <strong>Datenquelle</strong>
              <p>
                Amazon-Produktseite, zuletzt geprüft am{" "}
                {getCheckedDate(product)}. Angaben können sich ändern.
              </p>
            </div>
            <a
              href={product.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Quellseite öffnen ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
