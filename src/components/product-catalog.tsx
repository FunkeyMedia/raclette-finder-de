"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/data/types";
import { ProductCard } from "./product-card";
import { useAmazonProducts } from "@/lib/use-amazon-products";

type ProductKind = "all" | Product["type"];
type PriceRange = "all" | "under-40" | "40-80" | "over-80";
type PlateKind = "all" | "grill" | "stone" | "combination";
type SortOrder = "recommended" | "price-asc" | "price-desc" | "rating" | "reviews" | "people" | "power";

const PAGE_SIZE = 24;

function normalize(value: string) {
  return value.toLocaleLowerCase("de-DE").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function cleanBrand(value: string) {
  return value.replace(/[\u200B-\u200F\u202A-\u202E\u2060\uFEFF]/g, "").trim();
}

function matchesPrice(product: Product, range: PriceRange) {
  if (range === "all" || product.price === null) return range === "all";
  if (range === "under-40") return product.price < 40;
  if (range === "40-80") return product.price >= 40 && product.price <= 80;
  return product.price > 80;
}

function matchesPlate(product: Product, plate: PlateKind) {
  if (plate === "all") return true;
  const value = normalize(`${product.plate} ${product.title}`);
  const hasStone = value.includes("stein");
  const hasGrill = value.includes("grill") || value.includes("wendeplatte") || value.includes("antihaft");
  if (plate === "stone") return hasStone && !hasGrill;
  if (plate === "combination") return hasStone && hasGrill;
  return hasGrill && !hasStone;
}

export function ProductCatalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<ProductKind>("all");
  const [brand, setBrand] = useState("all");
  const [people, setPeople] = useState("all");
  const [price, setPrice] = useState<PriceRange>("all");
  const [plate, setPlate] = useState<PlateKind>("all");
  const [sort, setSort] = useState<SortOrder>("recommended");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const counts = useMemo(() => ({
    all: products.length,
    device: products.filter((product) => product.type === "device").length,
    accessory: products.filter((product) => product.type === "accessory").length,
  }), [products]);

  const brands = useMemo(() => Array.from(new Set(products
    .filter((product) => kind === "all" || product.type === kind)
    .map((product) => cleanBrand(product.brand))
    .filter(Boolean)))
    .sort((a, b) => a.localeCompare(b, "de-DE")), [kind, products]);

  const filteredProducts = useMemo(() => {
    const needle = normalize(query.trim());
    return products
      .filter((product) => kind === "all" || product.type === kind)
      .filter((product) => brand === "all" || cleanBrand(product.brand) === brand)
      .filter((product) => people === "all" || (product.people !== null && product.people >= Number(people)))
      .filter((product) => matchesPrice(product, price))
      .filter((product) => matchesPlate(product, plate))
      .filter((product) => {
        if (!needle) return true;
        return normalize([
          product.title,
          product.brand,
          product.model,
          product.subcategory,
          product.summary,
          product.features.join(" "),
        ].join(" ")).includes(needle);
      })
      .sort((a, b) => {
        if (sort === "price-asc") return (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY);
        if (sort === "price-desc") return (b.price ?? -1) - (a.price ?? -1);
        if (sort === "rating") return (b.rating ?? 0) - (a.rating ?? 0) || (b.ratingCount ?? 0) - (a.ratingCount ?? 0);
        if (sort === "reviews") return (b.ratingCount ?? 0) - (a.ratingCount ?? 0);
        if (sort === "people") return (b.people ?? 0) - (a.people ?? 0);
        if (sort === "power") return (b.watts ?? 0) - (a.watts ?? 0);
        return Number(b.recommendation === "Top-Empfehlung") - Number(a.recommendation === "Top-Empfehlung")
          || (b.rating ?? 0) - (a.rating ?? 0)
          || (b.ratingCount ?? 0) - (a.ratingCount ?? 0);
      });
  }, [brand, kind, people, plate, price, products, query, sort]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const visibleAsins = useMemo(() => visibleProducts.map((product) => product.asin), [visibleProducts]);
  const amazonProducts = useAmazonProducts(visibleAsins);
  const remaining = Math.max(0, filteredProducts.length - visibleProducts.length);
  const hasFilters = query !== "" || kind !== "all" || brand !== "all" || people !== "all" || price !== "all" || plate !== "all";

  function resetFilters() {
    setQuery("");
    setKind("all");
    setBrand("all");
    setPeople("all");
    setPrice("all");
    setPlate("all");
    setVisibleCount(PAGE_SIZE);
  }

  function changeKind(nextKind: ProductKind) {
    setKind(nextKind);
    setBrand("all");
    if (nextKind === "accessory") {
      setPeople("all");
      setPlate("all");
    }
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div className="catalog-explorer">
      <div className="catalog-type-switch" aria-label="Produktart">
        {([
          ["all", "Alle", counts.all],
          ["device", "Geräte", counts.device],
          ["accessory", "Zubehör", counts.accessory],
        ] as const).map(([value, label, count]) => (
          <button key={value} type="button" aria-pressed={kind === value} onClick={() => changeKind(value)}>
            <span>{label}</span><strong>{count}</strong>
          </button>
        ))}
      </div>

      <div className="catalog-layout">
        <aside className="catalog-filters" aria-label="Produkte filtern">
          <div className="filter-heading">
            <div><span>Deine Auswahl</span><strong>Produkte filtern</strong></div>
            {hasFilters ? <button type="button" onClick={resetFilters}>Zurücksetzen</button> : null}
          </div>

          <label className="catalog-search">
            <span>Suche</span>
            <span className="catalog-search-field"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(PAGE_SIZE); }} type="search" placeholder="Marke, Modell oder Merkmal" /></span>
          </label>

          <label className="filter-field">
            <span>Hersteller</span>
            <select value={brand} onChange={(event) => { setBrand(event.target.value); setVisibleCount(PAGE_SIZE); }}>
              <option value="all">Alle Hersteller</option>
              {brands.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>

          <fieldset disabled={kind === "accessory"} className={kind === "accessory" ? "is-disabled" : ""}>
            <legend>Mindestens geeignet für</legend>
            <div className="filter-pill-grid">
              {["all", "2", "4", "6", "8", "10"].map((value) => (
                <button key={value} type="button" aria-pressed={people === value} onClick={() => { setPeople(value); setVisibleCount(PAGE_SIZE); }}>
                  {value === "all" ? "Alle" : `${value}+`}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Preis</legend>
            <div className="filter-stack">
              {([
                ["all", "Jeder Preis"],
                ["under-40", "Unter 40 €"],
                ["40-80", "40 bis 80 €"],
                ["over-80", "Über 80 €"],
              ] as const).map(([value, label]) => (
                <label key={value}><input type="radio" name="price" value={value} checked={price === value} onChange={() => { setPrice(value); setVisibleCount(PAGE_SIZE); }} /><span>{label}</span></label>
              ))}
            </div>
          </fieldset>

          <fieldset disabled={kind === "accessory"} className={kind === "accessory" ? "is-disabled" : ""}>
            <legend>Grillfläche</legend>
            <div className="filter-stack">
              {([
                ["all", "Alle Platten"],
                ["grill", "Grillplatte"],
                ["stone", "Naturstein"],
                ["combination", "Stein & Grill kombiniert"],
              ] as const).map(([value, label]) => (
                <label key={value}><input type="radio" name="plate" value={value} checked={plate === value} onChange={() => { setPlate(value); setVisibleCount(PAGE_SIZE); }} /><span>{label}</span></label>
              ))}
            </div>
          </fieldset>
        </aside>

        <section className="catalog-results" aria-labelledby="catalog-result-title">
          <div className="catalog-results-toolbar">
            <div aria-live="polite"><span>Deine Auswahl</span><h2 id="catalog-result-title">{filteredProducts.length} Produkte</h2></div>
            <label><span>Sortieren nach</span><select value={sort} onChange={(event) => { setSort(event.target.value as SortOrder); setVisibleCount(PAGE_SIZE); }}>
              <option value="recommended">Empfehlung</option>
              <option value="price-asc">Preis: aufsteigend</option>
              <option value="price-desc">Preis: absteigend</option>
              <option value="rating">Beste Bewertung</option>
              <option value="reviews">Meiste Rezensionen</option>
              <option value="people">Größte Runde</option>
              <option value="power">Höchste Leistung</option>
            </select></label>
          </div>

          {hasFilters ? <div className="active-filter-summary"><span>Aktive Auswahl</span><button type="button" onClick={resetFilters}>Alle Filter löschen ×</button></div> : null}

          {visibleProducts.length ? (
            <>
              <div className="product-grid catalog-grid catalog-filtered-grid">
                {visibleProducts.map((product) => <ProductCard key={product.id} product={product} amazon={amazonProducts.items[product.asin]} amazonLoading={amazonProducts.loading} />)}
              </div>
              {remaining > 0 ? <div className="catalog-load-more"><p>{visibleProducts.length} von {filteredProducts.length} Produkten</p><div><button type="button" className="button button-primary" onClick={() => setVisibleCount((current) => current + PAGE_SIZE)}>Weitere {Math.min(PAGE_SIZE, remaining)} anzeigen</button><button type="button" className="catalog-show-all" onClick={() => setVisibleCount(filteredProducts.length)}>Alle anzeigen</button></div></div> : null}
            </>
          ) : (
            <div className="catalog-empty"><span aria-hidden="true">⌕</span><h3>Kein passendes Produkt gefunden.</h3><p>Probiere eine andere Kombination oder setze deine Auswahl zurück.</p><button type="button" onClick={resetFilters}>Alle Produkte anzeigen</button></div>
          )}
        </section>
      </div>
    </div>
  );
}
