import type { MetadataRoute } from "next";
import { devices } from "@/data/products";
import { siteConfig } from "@/config/site";
export default function sitemap(): MetadataRoute.Sitemap { const pages = ["", "/finder", "/vergleich", "/produkte", "/ratgeber", "/so-funktionierts", "/ueber-uns", "/kontakt", "/affiliate-transparenz", "/impressum", "/datenschutz"]; return [...pages.map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: new Date("2026-08-22"), changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : .7 })), ...devices.map((product) => ({ url: `${siteConfig.url}/produkte/${product.asin}`, lastModified: new Date(product.checkedAt), changeFrequency: "monthly" as const, priority: .6 }))]; }
