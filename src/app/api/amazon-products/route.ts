import { NextRequest, NextResponse } from "next/server";
import { productByAsin } from "@/data/products";
import { amazonCreatorsApiIsConfigured, getAmazonProducts } from "@/lib/amazon-creators-api";

export async function GET(request: NextRequest) {
  const configured = amazonCreatorsApiIsConfigured();
  const requested = (request.nextUrl.searchParams.get("asins") ?? "")
    .split(",")
    .map((asin) => asin.trim().toUpperCase())
    .filter((asin) => productByAsin.has(asin))
    .slice(0, 10);

  if (!requested.length) {
    return NextResponse.json({ configured, source: configured ? "amazon-creators-api" : "catalog-fallback", items: [] }, { status: 400 });
  }

  const products = await getAmazonProducts(requested);
  return NextResponse.json(
    { configured, source: configured ? "amazon-creators-api-with-fallback" : "catalog-fallback", items: requested.flatMap((asin) => products.get(asin) ?? []) },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300" } },
  );
}
