import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { devices } from "@/data/products";
import { parseFinderAnswers, rankProducts } from "@/lib/ranking";

export const metadata: Metadata = { title: "Deine Raclette-Empfehlung", description: "Deine personalisierte, transparent berechnete Raclette-Auswahl.", robots: { index: false, follow: true } };

export default async function ResultPage({ searchParams }: PageProps<"/ergebnis">) {
  const input = await searchParams;
  const answers = parseFinderAnswers(input);
  const ranked = rankProducts(devices, answers);
  const best = ranked[0];
  const budget = ranked.find((product) => product.id !== best.id && product.price !== null && product.price <= 55) ?? ranked[1];
  const premium = ranked.find((product) => product.id !== best.id && product.id !== budget.id && product.price !== null && product.price >= 85) ?? ranked.find((product) => product.id !== best.id && product.id !== budget.id) ?? ranked[2];
  const picks = [best, budget, premium].filter(Boolean);
  const query = new URLSearchParams(Object.entries(answers).map(([key, value]) => [key, String(value)])).toString();
  const compareIds = picks.map((product) => product.asin).join(",");

  return <main><section className="result-hero"><div className="site-width result-heading"><p className="eyebrow"><span />Deine Auswahl</p><h1>Das passt zu eurem Abend.</h1><p>Aus {ranked.length} passenden Geräten haben wir drei unterschiedliche Wege nach vorn sortiert.</p><div className="answer-summary"><span>{answers.people} Personen</span><span>{answers.budget === "any" ? "Budget offen" : answers.budget === "low" ? "Preisbewusst" : answers.budget === "mid" ? "Mittleres Budget" : "Premium"}</span><span>{answers.plate === "any" ? "Platte offen" : answers.plate === "stone" ? "Naturstein" : answers.plate === "grill" ? "Grillplatte" : "Kombination"}</span><Link href={`/finder?${query}`}>Antworten anpassen</Link></div></div></section>
    <section className="result-section"><div className="site-width"><div className="result-explanation"><div><p className="section-number">Dein bester Treffer</p><h2>{best.score}% Match, weil die wichtigsten Kriterien zusammenpassen.</h2></div><div><p>Der Score ist kein Testurteil. Er beschreibt, wie gut die dokumentierten Produkteigenschaften zu deinen Antworten passen.</p><Link href="/so-funktionierts">Berechnung verstehen →</Link></div></div><div className="product-grid result-grid"><ProductCard product={best} label="Beste Empfehlung für dich" showScore /><ProductCard product={budget} label="Preisbewusste Alternative" showScore /><ProductCard product={premium} label="Premium- oder Spezialalternative" showScore /></div><div className="compare-cta"><div><p className="section-number">Direktvergleich</p><h2>Die Unterschiede nebeneinander sehen.</h2></div><Link className="button button-dark" href={`/vergleich?ids=${compareIds}`}>3 Produkte vergleichen →</Link></div></div></section>
  </main>;
}
