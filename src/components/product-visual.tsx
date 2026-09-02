import Image from "next/image";
import type { AmazonProductData, Product } from "@/data/types";

export function ProductVisual({
  product,
  amazon,
  brand,
  compact = false,
}: {
  product?: Product;
  amazon?: AmazonProductData;
  brand?: string;
  compact?: boolean;
}) {
  if (!product) {
    return (
      <figure className={`product-visual product-visual-missing ${compact ? "is-compact" : ""}`}>
        <p>Originalbild derzeit nicht verfügbar</p>
      </figure>
    );
  }

  const brandName = product.brand || brand || "Raclette";

  if (!amazon?.imageUrl) {
    return (
      <figure className={`product-visual product-visual-missing ${compact ? "is-compact" : ""}`}>
        <div className="amazon-image-placeholder" aria-hidden="true"><span>Produktbild</span></div>
        <p>Originalbild wird geladen</p>
      </figure>
    );
  }

  return (
    <figure className={`product-visual ${compact ? "is-compact" : ""}`}>
      <a
        className="product-image-link"
        href={amazon.detailPageUrl}
        target="_blank"
        rel="sponsored noopener noreferrer"
        aria-label={`${product.title} bei Amazon ansehen (Affiliate-Link)`}
      >
        <Image
          alt={`${brandName}: ${product.title} – Original-Produktbild von Amazon`}
          className="product-image"
          fill
          loading={compact ? "lazy" : "eager"}
          sizes={compact ? "(max-width: 620px) 100vw, (max-width: 980px) 50vw, 33vw" : "(max-width: 860px) 100vw, 50vw"}
          src={amazon.imageUrl}
          unoptimized
        />
      </a>
      <figcaption>Originalbild von Amazon</figcaption>
    </figure>
  );
}
