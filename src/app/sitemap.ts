import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { recipes } from "@/data/recipes";
import { siteConfig } from "@/config/site";

const contentUpdatedAt = new Date("2026-09-03");

const staticPages = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/finder", changeFrequency: "monthly", priority: 0.9 },
  { path: "/vergleich", changeFrequency: "weekly", priority: 0.85 },
  { path: "/produkte", changeFrequency: "weekly", priority: 0.9 },
  { path: "/rezepte", changeFrequency: "weekly", priority: 0.9 },
  { path: "/ratgeber", changeFrequency: "monthly", priority: 0.8 },
  { path: "/so-funktionierts", changeFrequency: "monthly", priority: 0.7 },
  { path: "/ueber-uns", changeFrequency: "monthly", priority: 0.6 },
  { path: "/kontakt", changeFrequency: "yearly", priority: 0.4 },
  { path: "/affiliate-transparenz", changeFrequency: "yearly", priority: 0.4 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPages.map((page) => ({
      url: `${siteConfig.url}${page.path}`,
      lastModified: contentUpdatedAt,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...recipes.map((recipe) => ({
      url: `${siteConfig.url}/rezepte/${recipe.slug}`,
      lastModified: contentUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.72,
      images: [`${siteConfig.url}${recipe.image}`],
    })),
    ...products.map((product) => ({
      url: `${siteConfig.url}/produkte/${product.asin}`,
      lastModified: new Date(product.checkedAt),
      changeFrequency: "monthly" as const,
      priority: product.type === "device" ? 0.65 : 0.55,
    })),
  ];
}
