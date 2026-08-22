export type Product = {
  id: string;
  type: "device" | "accessory";
  title: string;
  brand: string;
  model: string;
  asin: string;
  amazonUrl: string;
  affiliateUrl: string;
  category: string;
  subcategory: string;
  price: number | null;
  priceLabel: string;
  prime: boolean;
  availability: string;
  people: number | null;
  watts: number | null;
  plate: string;
  material: string;
  dimensions: string;
  weight: string;
  color: string;
  features: string[];
  specialFeatures: string;
  rating: number | null;
  ratingCount: number | null;
  summary: string;
  benefits: string[];
  caveat: string;
  audience: string;
  useCase: string;
  priceClass: string;
  recommendation: string;
  checkedAt: string;
  sourceUrl: string;
};

export type FinderAnswers = {
  people: number;
  budget: "low" | "mid" | "premium" | "any";
  plate: "stone" | "grill" | "flexible" | "any";
  priority: "easy" | "power" | "compact" | "balanced";
  mode?: "quick" | "guided";
};

export type RankedProduct = Product & {
  score: number;
  reasons: string[];
  cautions: string[];
};
