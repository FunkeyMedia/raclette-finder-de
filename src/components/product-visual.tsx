import Image from "next/image";
import type { Product } from "@/data/types";

function getVisual(product: Product) {
  if (product.type === "accessory") return "/images/product-accessories.png";

  const searchable = `${product.title} ${product.plate} ${product.subcategory}`.toLocaleLowerCase("de");
  if ((product.people ?? 8) <= 2) return "/images/product-mini-2.png";
  if (/rund|round|kreis/.test(searchable)) return "/images/product-round-4.png";
  if (/stein|granit|stone|marmor|kombination|kombiniert/.test(searchable)) return "/images/product-combi-stone.png";
  return "/images/product-grill-8.png";
}

export function ProductVisual({ product, brand, compact = false }: { product?: Product; brand?: string; compact?: boolean }) {
  const brandName = product?.brand ?? brand ?? "Raclette";
  return (
    <figure className={`product-visual ${compact ? "is-compact" : ""}`}>
      <Image
        alt={`Neutrales KI-Symbolbild eines Raclette-Typs für ${brandName} – kein Original-Produktfoto`}
        className="product-image"
        fill
        sizes={compact ? "(max-width: 620px) 100vw, (max-width: 980px) 50vw, 33vw" : "(max-width: 860px) 100vw, 50vw"}
        src={product ? getVisual(product) : "/images/product-grill-8.png"}
      />
      <figcaption>KI-Symbolbild · Bauart ähnlich · kein Originalfoto</figcaption>
    </figure>
  );
}
