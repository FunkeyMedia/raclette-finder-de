"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/data/types";
import { useAmazonProducts } from "@/lib/use-amazon-products";
import { ProductCard } from "./product-card";

export type RecipeRecommendationGroup = {
  people: 2 | 4 | 8;
  products: Product[];
};

const recommendationLabels = ["Unsere Nr. 1", "Starke Alternative", "Ebenfalls passend"];

export function RecipeRacletteRecommendations({ groups }: { groups: RecipeRecommendationGroup[] }) {
  const [selectedPeople, setSelectedPeople] = useState<2 | 4 | 8>(groups[0]?.people ?? 2);
  const selectedGroup = groups.find((group) => group.people === selectedPeople) ?? groups[0];
  const asins = useMemo(() => groups.flatMap((group) => group.products.map((product) => product.asin)), [groups]);
  const amazonProducts = useAmazonProducts(asins);

  if (!selectedGroup) return null;

  const compareIds = selectedGroup.products.map((product) => product.asin).join(",");

  return (
    <section className="recipe-raclette-recommendations" aria-labelledby="recipe-raclette-title">
      <div className="site-width">
        <header className="recipe-raclette-heading">
          <div>
            <p className="section-number">Passendes Gerät zum Rezept</p>
            <h2 id="recipe-raclette-title">Unsere Top 3 Raclettes für eure Runde.</h2>
            <p>Wähle eure Gruppengröße und entdecke drei Geräte, die nach dokumentierter Eignung und Kundenbewertung besonders gut passen.</p>
          </div>
          <div className="recipe-people-switch" aria-label="Gruppengröße auswählen" role="group">
            {groups.map((group) => (
              <button
                aria-pressed={selectedPeople === group.people}
                key={group.people}
                onClick={() => setSelectedPeople(group.people)}
                type="button"
              >
                <strong>{group.people}</strong>
                <span>Personen</span>
              </button>
            ))}
          </div>
        </header>

        <div className="recipe-raclette-selection" aria-live="polite">
          <div>
            <span>Aktuelle Auswahl</span>
            <h3>Top 3 Raclettes für {selectedGroup.people} Personen</h3>
          </div>
          <div>
            <Link href={`/finder?people=${selectedGroup.people}&mode=quick`}>Auswahl im Finder verfeinern →</Link>
            <Link href={`/vergleich?ids=${compareIds}`}>Top 3 direkt vergleichen →</Link>
          </div>
        </div>

        <div className="product-grid recipe-raclette-grid">
          {selectedGroup.products.map((product, index) => (
            <ProductCard
              amazon={amazonProducts.items[product.asin]}
              amazonLoading={amazonProducts.loading}
              key={product.id}
              label={recommendationLabels[index]}
              product={product}
            />
          ))}
        </div>

        <p className="recipe-raclette-note">
          Die Reihenfolge berücksichtigt die passende Personenzahl sowie Bewertung und Anzahl der Rezensionen. Preise und Verfügbarkeit können sich ändern.
        </p>
      </div>
    </section>
  );
}
