import { unstable_cache } from "next/cache";
import type { AmazonProductData } from "@/data/types";

const API_URL = "https://creatorsapi.amazon/catalog/v1/getItems";
const DEFAULT_TOKEN_URL = "https://api.amazon.co.uk/auth/o2/token";
const MARKETPLACE = process.env.AMAZON_MARKETPLACE ?? "www.amazon.de";
const MAX_ITEMS_PER_REQUEST = 10;

type JsonRecord = Record<string, unknown>;

let tokenCache: { value: string; expiresAt: number } | null = null;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null;
}

function readRecord(value: unknown, key: string): JsonRecord | undefined {
  if (!isRecord(value)) return undefined;
  const child = value[key];
  return isRecord(child) ? child : undefined;
}

function readString(value: unknown, key: string): string | undefined {
  if (!isRecord(value)) return undefined;
  return typeof value[key] === "string" ? value[key] : undefined;
}

function readNumber(value: unknown, key: string): number | undefined {
  if (!isRecord(value)) return undefined;
  return typeof value[key] === "number" ? value[key] : undefined;
}

export function amazonCreatorsApiIsConfigured() {
  return Boolean(
    process.env.AMAZON_CREATORS_CLIENT_ID &&
    process.env.AMAZON_CREATORS_CLIENT_SECRET &&
    (process.env.AMAZON_PARTNER_TAG || process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_ID),
  );
}

async function getAccessToken() {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) return tokenCache.value;

  const clientId = process.env.AMAZON_CREATORS_CLIENT_ID;
  const clientSecret = process.env.AMAZON_CREATORS_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  const response = await fetch(process.env.AMAZON_CREATORS_TOKEN_URL ?? DEFAULT_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      scope: "creatorsapi::default",
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) throw new Error(`Amazon token request failed (${response.status})`);
  const payload: unknown = await response.json();
  const accessToken = readString(payload, "access_token");
  const expiresIn = readNumber(payload, "expires_in") ?? 3600;
  if (!accessToken) throw new Error("Amazon token response did not contain an access token");

  tokenCache = { value: accessToken, expiresAt: Date.now() + Math.max(60, expiresIn - 120) * 1000 };
  return accessToken;
}

function parseAmazonItem(value: unknown): AmazonProductData | null {
  if (!isRecord(value)) return null;
  const asin = readString(value, "asin");
  const detailPageUrl = readString(value, "detailPageURL");
  if (!asin || !detailPageUrl) return null;

  const image = readRecord(readRecord(readRecord(value, "images"), "primary"), "large");
  const title = readRecord(readRecord(value, "itemInfo"), "title");
  const listings = readRecord(value, "offersV2")?.listings;
  const firstListing = Array.isArray(listings) && isRecord(listings[0]) ? listings[0] : undefined;
  const availability = readRecord(firstListing, "availability");
  const price = readRecord(firstListing, "price");
  const money = readRecord(price, "money");
  const availabilityType = readString(availability, "type");

  return {
    asin,
    title: readString(title, "displayValue") ?? null,
    detailPageUrl,
    imageUrl: readString(image, "url") ?? null,
    imageWidth: readNumber(image, "width") ?? null,
    imageHeight: readNumber(image, "height") ?? null,
    priceAmount: readNumber(money, "amount") ?? null,
    priceCurrency: readString(money, "currency") ?? null,
    priceDisplay: readString(money, "displayAmount") ?? null,
    availability: availabilityType === "IN_STOCK" ? "IN_STOCK" : availabilityType === "OUT_OF_STOCK" ? "OUT_OF_STOCK" : "UNKNOWN",
    availabilityMessage: readString(availability, "message") ?? null,
    fetchedAt: new Date().toISOString(),
  };
}

async function fetchAmazonBatchUncached(asinsKey: string) {
  if (!amazonCreatorsApiIsConfigured()) return [] as AmazonProductData[];
  const token = await getAccessToken();
  if (!token) return [] as AmazonProductData[];

  const itemIds = asinsKey.split(",").slice(0, MAX_ITEMS_PER_REQUEST);
  const partnerTag = process.env.AMAZON_PARTNER_TAG ?? process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_ID;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "x-marketplace": MARKETPLACE,
    },
    body: JSON.stringify({
      itemIds,
      itemIdType: "ASIN",
      languagesOfPreference: ["de_DE"],
      marketplace: MARKETPLACE,
      partnerTag,
      resources: [
        "images.primary.large",
        "itemInfo.title",
        "offersV2.listings.price",
        "offersV2.listings.availability",
      ],
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) throw new Error(`Amazon Creators API request failed (${response.status})`);
  const payload: unknown = await response.json();
  const result = readRecord(payload, "itemResults") ?? readRecord(payload, "itemsResult");
  const items = result?.items;
  return Array.isArray(items) ? items.map(parseAmazonItem).filter((item): item is AmazonProductData => item !== null) : [];
}

const fetchAmazonBatch = unstable_cache(fetchAmazonBatchUncached, ["amazon-creators-api-get-items-v1"], {
  revalidate: 3600,
});

export async function getAmazonProducts(asins: string[]) {
  const uniqueAsins = Array.from(new Set(asins.filter((asin) => /^[A-Z0-9]{10}$/.test(asin))));
  const batches: string[][] = [];
  for (let index = 0; index < uniqueAsins.length; index += MAX_ITEMS_PER_REQUEST) {
    batches.push(uniqueAsins.slice(index, index + MAX_ITEMS_PER_REQUEST));
  }

  try {
    const results = await Promise.all(batches.map((batch) => fetchAmazonBatch(batch.sort().join(","))));
    return new Map(results.flat().map((item) => [item.asin, item]));
  } catch (error) {
    console.error("Amazon product data could not be refreshed", error instanceof Error ? error.message : error);
    return new Map<string, AmazonProductData>();
  }
}
