import Link from "next/link";
import type { Product, RankedProduct } from "@/data/types";
import { formatPrice, getCheckedDate } from "@/data/products";
import { AffiliateLink } from "./affiliate-link";
import { ProductVisual } from "./product-visual";

export function ProductCard({ product, label, showScore = false }: { product: Product | RankedProduct; label?: string; showScore?: boolean }) {
  const ranked = product as RankedProduct;
  return (
    <article className="product-card">
      {label ? <p className="card-label">{label}</p> : null}
      <ProductVisual brand={product.brand} compact />
      <div className="product-card-body">
        <p className="product-brand">{product.brand} · {product.people ? `${product.people} Personen` : product.subcategory}</p>
        <h3><Link href={`/produkte/${product.asin}`}>{product.title}</Link></h3>
        {showScore && typeof ranked.score === "number" ? <div className="match-line"><strong>{ranked.score}%</strong><span>Match für dich</span></div> : null}
        <ul className="mini-features">
          {(showScore && ranked.reasons?.length ? ranked.reasons : product.features).slice(0, 2).map((feature) => <li key={feature}>{feature}</li>)}
        </ul>
        <div className="price-row"><div><strong>{formatPrice(product.price)}</strong><small>Stand: {getCheckedDate(product)}</small></div><Link className="detail-link" href={`/produkte/${product.asin}`}>Details</Link></div>
        <AffiliateLink href={product.affiliateUrl} productId={product.id} />
        <p className="affiliate-note">* Affiliate-Link. Preis und Verfügbarkeit werden bei Amazon geprüft.</p>
      </div>
    </article>
  );
}
