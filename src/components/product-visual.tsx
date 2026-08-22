export function ProductVisual({ brand, compact = false }: { brand: string; compact?: boolean }) {
  const initials = brand.split(/\s+/).slice(0, 2).map((word) => word[0]).join("").toUpperCase();
  return (
    <div className={`product-visual ${compact ? "is-compact" : ""}`} aria-label={`Illustrative Produktdarstellung für ${brand}`} role="img">
      <div className="visual-steam" aria-hidden="true" /><div className="visual-device" aria-hidden="true"><span>{initials || "RF"}</span><i /><i /><i /></div>
    </div>
  );
}
