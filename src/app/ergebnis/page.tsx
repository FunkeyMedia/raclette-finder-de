import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { devices } from "@/data/products";
import type { FinderAnswers, RankedProduct } from "@/data/types";
import { parseFinderAnswers, rankProducts } from "@/lib/ranking";
import { getAmazonProducts } from "@/lib/amazon-creators-api";

export const metadata: Metadata = { title: "Deine Raclette-Empfehlung", description: "Deine personalisierte, transparent berechnete Raclette-Auswahl.", robots: { index: false, follow: true } };

type ResultPick = { product: RankedProduct; label: string };

function selectResultPicks(ranked: RankedProduct[], budget: FinderAnswers["budget"]): ResultPick[] {
  const best = ranked[0];
  if (!best) return [];

  const selected = new Set([best.id]);
  const take = (candidate: RankedProduct | undefined) => {
    if (!candidate || selected.has(candidate.id)) return undefined;
    selected.add(candidate.id);
    return candidate;
  };

  if (budget === "any") {
    const affordable = take(ranked.find((product) => !selected.has(product.id) && product.price !== null && product.price <= 55));
    const premium = take(ranked.find((product) => !selected.has(product.id) && product.price !== null && product.price >= 85));
    const fallback = premium ? undefined : take(ranked.find((product) => !selected.has(product.id)));

    return [
      { product: best, label: "Beste Empfehlung für dich" },
      ...(affordable ? [{ product: affordable, label: "Preisbewusste Alternative" }] : []),
      ...(premium ? [{ product: premium, label: "Premium- oder Spezialalternative" }] : []),
      ...(!premium && fallback ? [{ product: fallback, label: "Weitere passende Alternative" }] : []),
    ].slice(0, 3);
  }

  const remainingByPrice = ranked
    .filter((product) => !selected.has(product.id) && product.price !== null)
    .sort((a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY) || b.score - a.score);
  const priceAlternative = take(remainingByPrice[0]);
  const furtherAlternative = take(ranked.find((product) => !selected.has(product.id)));
  const priceLabel = budget === "premium"
    ? "Günstigere Option ab 85 €"
    : budget === "mid"
      ? "Preisbewusste Option im Budgetrahmen"
      : "Günstigste passende Option";

  return [
    { product: best, label: "Beste Empfehlung für dich" },
    ...(priceAlternative ? [{ product: priceAlternative, label: priceLabel }] : []),
    ...(furtherAlternative ? [{ product: furtherAlternative, label: "Weitere passende Alternative" }] : []),
  ];
}

export default async function ResultPage({ searchParams }: PageProps<"/ergebnis">) {
  const input = await searchParams;
  const answers = parseFinderAnswers(input);
  const ranked = rankProducts(devices, answers);
  const query = new URLSearchParams(Object.entries(answers).map(([key, value]) => [key, String(value)])).toString();
  const picks = selectResultPicks(ranked, answers.budget);
  const best = picks[0]?.product;
  const compareIds = picks.map(({ product }) => product.asin).join(",");
  const amazonProducts = await getAmazonProducts(picks.map(({ product }) => product.asin));

  if (!best) {
    return <main><section className="result-hero"><div className="site-width result-heading"><p className="eyebrow"><span />Deine Auswahl</p><h1>Für diese Kombination fehlt noch ein passendes Gerät.</h1><p>Deine Budgetgrenze bleibt verbindlich. Passe eine Antwort an, damit wir dir keine unpassende Empfehlung zeigen.</p><div className="answer-summary"><Link href={`/finder?${query}`}>Antworten anpassen</Link></div></div></section></main>;
  }

  return <main><section className="result-hero"><div className="site-width result-heading"><p className="eyebrow"><span />Deine Auswahl</p><h1>Das passt zu eurem Abend.</h1><p>Aus {ranked.length} passenden Geräten haben wir {picks.length} Empfehlungen innerhalb deiner gewählten Vorgaben sortiert.</p><div className="answer-summary"><span>{answers.people} Personen</span><span>{answers.budget === "any" ? "Budget offen" : answers.budget === "low" ? "Bis etwa 55 €" : answers.budget === "mid" ? "Etwa 35–105 €" : "Ab etwa 85 €"}</span><span>{answers.plate === "any" ? "Platte offen" : answers.plate === "stone" ? "Naturstein" : answers.plate === "grill" ? "Grillplatte" : "Kombination"}</span><Link href={`/finder?${query}`}>Antworten anpassen</Link></div></div></section>
    <section className="result-section"><div className="site-width"><div className="result-explanation"><div><p className="section-number">Dein bester Treffer</p><h2>{best.score}% Match, weil die wichtigsten Kriterien zusammenpassen.</h2></div><div><p>Eine gewählte Budgetklasse ist ein verbindlicher Filter. Der Score sortiert anschließend nur noch die Produkte, die diesen Preisrahmen erfüllen.</p><Link href="/so-funktionierts">Berechnung verstehen →</Link></div></div><div className="product-grid result-grid">{picks.map(({ product, label }) => <ProductCard key={product.id} product={product} amazon={amazonProducts.get(product.asin)} label={label} showScore />)}</div>{picks.length > 1 ? <div className="compare-cta"><div><p className="section-number">Direktvergleich</p><h2>Die Unterschiede nebeneinander sehen.</h2></div><Link className="button button-dark" href={`/vergleich?ids=${compareIds}`}>{picks.length} Produkte vergleichen →</Link></div> : null}</div></section>
  </main>;
}
