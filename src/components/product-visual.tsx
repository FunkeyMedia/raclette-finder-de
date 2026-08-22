import Image from "next/image";
import type { Product } from "@/data/types";
import productImages from "@/data/product-images.json";

const exactAmazonImages = productImages as Record<string, string>;

function getAmazonImageUrl(asin: string) {
  return exactAmazonImages[asin] ?? `https://m.media-amazon.com/images/P/${encodeURIComponent(asin)}.01.LZZZZZZZ.jpg`;
}

export function ProductVisual({
  product,
  brand,
  compact = false,
}: {
  product?: Product;
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

  return (
    <figure className={`product-visual ${compact ? "is-compact" : ""}`}>
      <a
        className="product-image-link"
        href={product.affiliateUrl}
        target="_blank"
        rel="sponsored noopener noreferrer"
        aria-label={`${product.title} bei Amazon ansehen (Affiliate-Link)`}
      >
        {/* Das ASIN-basierte Originalbild wird direkt von Amazon ausgeliefert und nicht lokal gespeichert. */}
        <Image
          alt={`${brandName}: ${product.title} – Original-Produktbild von Amazon`}
          className="product-image"
          fill
          loading={compact ? "lazy" : "eager"}
          sizes={compact ? "(max-width: 620px) 100vw, (max-width: 980px) 50vw, 33vw" : "(max-width: 860px) 100vw, 50vw"}
          src={getAmazonImageUrl(product.asin)}
          unoptimized
        />
      </a>
      <figcaption>Original-Produktbild · Amazon-Affiliate-Link</figcaption>
    </figure>
  );
}
