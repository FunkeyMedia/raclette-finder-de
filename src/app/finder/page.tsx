import type { Metadata } from "next";
import { Suspense } from "react";
import { Finder } from "@/components/finder";

export const metadata: Metadata = { title: "Raclette-Finder starten", description: "Finde mit wenigen verständlichen Fragen das Raclette, das zu eurer Runde, eurem Budget und euren Vorlieben passt.", alternates: { canonical: "/finder" } };

export default function FinderPage() {
  return <main className="finder-page"><div className="finder-backdrop" aria-hidden="true" /><div className="site-width"><p className="finder-page-kicker">Persönliche Entscheidungshilfe</p><Suspense fallback={<div className="finder-loading">Finder wird vorbereitet …</div>}><Finder /></Suspense></div></main>;
}
