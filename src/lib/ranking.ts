import type { FinderAnswers, Product, RankedProduct } from "@/data/types";

const budgets = {
  low: { min: 0, max: 55 },
  mid: { min: 35, max: 105 },
  premium: { min: 85, max: Number.POSITIVE_INFINITY },
  any: { min: 0, max: Number.POSITIVE_INFINITY },
};

export function productFitsBudget(product: Product, budget: FinderAnswers["budget"]) {
  if (budget === "any") return true;
  if (product.price === null) return false;
  const range = budgets[budget];
  return product.price >= range.min && product.price <= range.max;
}

function plateMatch(product: Product, preference: FinderAnswers["plate"]) {
  if (preference === "any" || preference === "flexible") return 1;
  const plate = product.plate.toLowerCase();
  if (preference === "stone") return plate.includes("stein") || product.title.toLowerCase().includes("stein");
  return plate.includes("grill") || plate.includes("aluminium") || plate.includes("antihaft");
}

export function rankProducts(allProducts: Product[], answers: FinderAnswers): RankedProduct[] {
  return allProducts
    .filter((product) => product.type === "device")
    .filter((product) => !product.people || product.people >= Math.max(2, answers.people - 1))
    .filter((product) => productFitsBudget(product, answers.budget))
    .map((product) => {
      let score = 48;
      const reasons: string[] = [];
      const cautions: string[] = [];

      if (product.people) {
        const difference = Math.abs(product.people - answers.people);
        score += Math.max(0, 28 - difference * 5);
        if (difference <= 1) reasons.push(`Ausgelegt für rund ${product.people} Personen`);
        if (product.people > answers.people + 3) cautions.push("Größer als für eure übliche Runde nötig");
      } else {
        cautions.push("Personenzahl nicht eindeutig angegeben");
      }

      if (answers.budget !== "any") {
        score += 15;
        reasons.push("Preis liegt im gewählten Budgetrahmen");
      }

      if (plateMatch(product, answers.plate)) {
        score += answers.plate === "any" ? 3 : 11;
        if (answers.plate !== "any") reasons.push(answers.plate === "stone" ? "Steinplatte entspricht deiner Vorliebe" : "Grillfläche entspricht deiner Vorliebe");
      } else if (answers.plate !== "any" && answers.plate !== "flexible") {
        score -= 8;
        cautions.push("Gewünschte Plattenart nicht klar ausgewiesen");
      }

      if (answers.priority === "power" && product.watts) {
        score += Math.min(12, Math.max(0, (product.watts - 800) / 80));
        if (product.watts >= 1200) reasons.push(`${product.watts} Watt für zügiges Aufheizen`);
      }
      if (answers.priority === "compact" && (product.people ?? 12) <= 4) score += 10;
      if (answers.priority === "easy" && /antihaft|abnehm|spülmaschinen/i.test(`${product.features.join(" ")} ${product.specialFeatures}`)) {
        score += 10;
        reasons.push("Merkmale für eine unkomplizierte Reinigung");
      }
      if (answers.priority === "balanced") score += Math.min(8, product.rating ? (product.rating - 3.8) * 8 : 0);
      if (product.availability.toLowerCase().includes("lager")) score += 4;

      return { ...product, score: Math.max(1, Math.min(99, Math.round(score))), reasons: reasons.slice(0, 3), cautions: cautions.slice(0, 2) };
    })
    .sort((a, b) => b.score - a.score || (b.rating ?? 0) - (a.rating ?? 0));
}

export function parseFinderAnswers(input: Record<string, string | string[] | undefined>): FinderAnswers {
  const first = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;
  const people = Math.min(12, Math.max(2, Number(first(input.people)) || 6));
  const budget = first(input.budget);
  const plate = first(input.plate);
  const priority = first(input.priority);
  return {
    people,
    budget: budget === "low" || budget === "mid" || budget === "premium" ? budget : "any",
    plate: plate === "stone" || plate === "grill" || plate === "flexible" ? plate : "any",
    priority: priority === "easy" || priority === "power" || priority === "compact" ? priority : "balanced",
    mode: first(input.mode) === "quick" ? "quick" : "guided",
  };
}
