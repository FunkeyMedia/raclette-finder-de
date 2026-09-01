import Link from "next/link";
import type { AmazonProductData, Product, RankedProduct } from "@/data/types";
import { AffiliateLink } from "./affiliate-link";
import { ProductVisual } from "./product-visual";

const CARD_TITLE_WORDS = 10;
const CARD_FEATURE_WORDS = 14;

function shortenWords(value: string, limit: number) {
  const words = value.trim().split(/\s+/);
  return words.length > limit ? `${words.slice(0, limit).join(" ")} …` : value;
}

export function ProductCard({ product, amazon, amazonLoading = false, label, showScore = false }: { product: Product | RankedProduct; amazon?: AmazonProductData; amazonLoading?: boolean; label?: string; showScore?: boolean }) {
  const ranked = product as RankedProduct;
  const cardTitle = shortenWords(product.title, CARD_TITLE_WORDS);
  const cardFeatures = (showScore && ranked.reasons?.length ? ranked.reasons : product.features)
    .slice(0, 2)
    .map((feature) => ({ full: feature, short: shortenWords(feature, CARD_FEATURE_WORDS) }));
  return (
    <article className="product-card">
      {label ? <p className="card-label">{label}</p> : null}
      <ProductVisual product={product} amazon={amazon} compact />
      <div className="product-card-body">
        <p className="product-brand">{product.brand} · {product.people ? `${product.people} Personen` : product.subcategory}</p>
        <h3><Link href={`/produkte/${product.asin}`} aria-label={product.title} title={product.title}>{cardTitle}</Link></h3>
        {showScore && typeof ranked.score === "number" ? <div className="match-line"><strong>{ranked.score}%</strong><span>Match für dich</span></div> : null}
        <ul className="mini-features">
          {cardFeatures.map((feature, featureIndex) => <li key={`${product.id}-${featureIndex}`} title={feature.full}>{feature.short}</li>)}
        </ul>
        <div className="amazon-offer">
          <div className="amazon-offer-heading"><span>amazon.de</span><small>Aktueller Angebotspreis</small></div>
          <div className="price-row">
            <div>
              <strong>{amazon?.priceDisplay ?? (amazonLoading ? "Preis wird geladen …" : "Preis bei Amazon ansehen")}</strong>
              <small>{amazon?.availability === "IN_STOCK" ? "Auf Lager bei Amazon" : amazon?.availabilityMessage ?? "Preis und Verfügbarkeit können sich ändern"}</small>
            </div>
            <Link className="detail-link" href={`/produkte/${product.asin}`}>Details</Link>
          </div>
        </div>
        <AffiliateLink href={amazon?.detailPageUrl ?? product.affiliateUrl} productId={product.id}>Auf Amazon.de ansehen <span aria-hidden="true">›</span></AffiliateLink>
        <p className="affiliate-note">Als Amazon-Partner verdienen wir an qualifizierten Verkäufen. Für dich ändert sich der Preis nicht.</p>
      </div>
    </article>
  );
}
