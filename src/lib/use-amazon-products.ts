"use client";

import { useEffect, useMemo, useState } from "react";
import type { AmazonProductData } from "@/data/types";

export function useAmazonProducts(asins: string[]) {
  const [items, setItems] = useState<Record<string, AmazonProductData>>({});
  const [completed, setCompleted] = useState<Record<string, true>>({});
  const key = useMemo(() => Array.from(new Set(asins)).join(","), [asins]);
  const loading = asins.some((asin) => !completed[asin]);

  useEffect(() => {
    const requested = key.split(",").filter(Boolean);
    const missing = requested.filter((asin) => !completed[asin]);
    if (!missing.length) return;

    const controller = new AbortController();
    const batches: string[][] = [];
    for (let index = 0; index < missing.length; index += 10) batches.push(missing.slice(index, index + 10));
    Promise.all(batches.map(async (batch) => {
      const response = await fetch(`/api/amazon-products?asins=${encodeURIComponent(batch.join(","))}`, { signal: controller.signal });
      if (!response.ok) return [] as AmazonProductData[];
      const payload = await response.json() as { items?: AmazonProductData[] };
      return payload.items ?? [];
    }))
      .then((results) => setItems((current) => ({ ...current, ...Object.fromEntries(results.flat().map((item) => [item.asin, item])) })))
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) console.error("Amazon product data could not be loaded");
      })
      .finally(() => setCompleted((current) => ({ ...current, ...Object.fromEntries(missing.map((asin) => [asin, true])) })));

    return () => controller.abort();
    // Keep previously loaded ASINs in memory while filters change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { items, loading };
}
