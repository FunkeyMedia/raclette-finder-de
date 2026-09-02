import type { MetadataRoute } from "next";
import { devices } from "@/data/products";
import { recipes } from "@/data/recipes";
import { siteConfig } from "@/config/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/finder", "/vergleich", "/produkte", "/rezepte", "/ratgeber", "/so-funktionierts", "/ueber-uns", "/kontakt", "/affiliate-transparenz", "/impressum", "/datenschutz"];
  return [
    ...pages.map((pagePath) => ({
      url: `${siteConfig.url}${pagePath}`,
      lastModified: new Date("2026-09-02"),
      changeFrequency: pagePath === "" || pagePath === "/rezepte" ? "weekly" as const : "monthly" as const,
      priority: pagePath === "" ? 1 : pagePath === "/rezepte" ? .9 : .7,
    })),
    ...recipes.map((recipe) => ({
      url: `${siteConfig.url}/rezepte/${recipe.slug}`,
      lastModified: new Date("2026-09-02"),
      changeFrequency: "monthly" as const,
      priority: .72,
    })),
    ...devices.map((product) => ({
      url: `${siteConfig.url}/produkte/${product.asin}`,
      lastModified: new Date(product.checkedAt),
      changeFrequency: "monthly" as const,
      priority: .6,
    })),
  ];
}
