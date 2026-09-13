"use client";
import { useState } from "react";

export function ComparisonLink({ ids }: { ids: string[] }) {
  const [status, setStatus] = useState("");
  const [fallback, setFallback] = useState("");
  async function copy() {
    const url = new URL("/vergleich", window.location.origin);
    url.searchParams.set("ids", ids.join(","));
    try { await navigator.clipboard.writeText(url.href); setStatus("Vergleichslink kopiert"); setFallback(""); }
    catch { setStatus("Markiere und kopiere den Link."); setFallback(url.href); }
  }
  return <div className="compare-bottom">
    <button type="button" className="button secondary" onClick={copy}>Vergleichslink kopieren</button>
    <span role="status">{status}</span>
    {fallback && <input aria-label="Vergleichslink" readOnly value={fallback} onFocus={(event) => event.currentTarget.select()} style={{ maxWidth: "100%" }}/>}
  </div>;
}
