import { NextRequest, NextResponse } from "next/server";
import { productByAsin } from "@/data/products";
import { amazonCreatorsApiIsConfigured, getAmazonProducts } from "@/lib/amazon-creators-api";

export async function GET(request: NextRequest) {
  const requested = (request.nextUrl.searchParams.get("asins") ?? "")
    .split(",")
    .map((asin) => asin.trim().toUpperCase())
    .filter((asin) => productByAsin.has(asin))
    .slice(0, 10);

  if (!requested.length) {
    return NextResponse.json({ configured: amazonCreatorsApiIsConfigured(), items: [] }, { status: 400 });
  }

  const products = await getAmazonProducts(requested);
  return NextResponse.json(
    { configured: amazonCreatorsApiIsConfigured(), items: requested.flatMap((asin) => products.get(asin) ?? []) },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300" } },
  );
}
