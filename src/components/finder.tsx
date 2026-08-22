"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

type Answers = Record<string, string>;
type Option = { value: string; title: string; description: string };
type Step = { key: string; eyebrow: string; question: string; help: string; options: Option[]; unsure?: string };

const guidedSteps: Step[] = [
  { key: "people", eyebrow: "Eure Runde", question: "Wie viele Menschen sitzen meistens am Tisch?", help: "Wähle die typische Runde – nicht den seltenen Ausnahmeabend.", options: [{ value: "2", title: "2", description: "Zu zweit" }, { value: "4", title: "3–4", description: "Kleine Runde" }, { value: "6", title: "5–6", description: "Lieblingsrunde" }, { value: "8", title: "7–8", description: "Große Tafel" }, { value: "10", title: "9+", description: "Viele Gäste" }] },
  { key: "budget", eyebrow: "Dein Rahmen", question: "Welche Budgetklasse fühlt sich richtig an?", help: "Deine Auswahl ist verbindlich: Wir empfehlen nur Geräte im gewählten Preisrahmen. Grundlage ist der zuletzt geprüfte Produktpreis, kein Livepreis.", options: [{ value: "low", title: "Bis etwa 55 €", description: "Preisbewusst" }, { value: "mid", title: "Etwa 35–105 €", description: "Solide Mitte" }, { value: "premium", title: "Ab etwa 85 €", description: "Premium & Spezial" }], unsure: "any" },
  { key: "plate", eyebrow: "Oben drauf", question: "Welche Grillfläche mögt ihr am liebsten?", help: "Stein speichert Wärme lange, beschichtete Grillflächen reagieren meist schneller.", options: [{ value: "stone", title: "Naturstein", description: "Ruhig & ursprünglich" }, { value: "grill", title: "Grillplatte", description: "Schnell & unkompliziert" }, { value: "flexible", title: "Kombination", description: "Von beidem etwas" }], unsure: "any" },
  { key: "priority", eyebrow: "Was zählt", question: "Was soll euch im Alltag am meisten helfen?", help: "Diese Priorität bekommt im Ranking zusätzliches Gewicht.", options: [{ value: "easy", title: "Leicht sauber", description: "Wenig Aufwand danach" }, { value: "power", title: "Zügig heiß", description: "Mehr Leistung" }, { value: "compact", title: "Kompakt", description: "Wenig Platzbedarf" }, { value: "balanced", title: "Ausgewogen", description: "Ein guter Mix" }] },
];

const defaults: Answers = { people: "6", budget: "any", plate: "any", priority: "balanced", mode: "guided" };

export function Finder() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "quick" ? "quick" : "guided";
  const querySeed = Object.fromEntries(["people", "budget", "plate", "priority"].flatMap((key) => {
    const value = searchParams.get(key);
    return value ? [[key, value]] : [];
  })) as Answers;
  const seed: Answers = { ...defaults, ...querySeed, mode: initialMode };
  const [answers, setAnswers] = useState<Answers>(() => {
    if (typeof window === "undefined") return seed;
    try {
      const stored = localStorage.getItem("raclette-finder:v1");
      return stored ? { ...defaults, ...JSON.parse(stored), ...querySeed, mode: initialMode } : seed;
    } catch { return seed; }
  });
  const [stepIndex, setStepIndex] = useState(0);
  const steps = useMemo(() => answers.mode === "quick" ? guidedSteps.filter((step) => step.key !== "plate") : guidedSteps, [answers.mode]);
  const step = steps[stepIndex];

  function choose(value: string) {
    const next = { ...answers, [step.key]: value };
    setAnswers(next);
    localStorage.setItem("raclette-finder:v1", JSON.stringify(next));
    if (stepIndex === steps.length - 1) {
      router.push(`/ergebnis?${new URLSearchParams(next).toString()}`);
    } else setStepIndex((current) => current + 1);
  }

  function changeMode(mode: "quick" | "guided") { setAnswers((current) => ({ ...current, mode })); setStepIndex(0); }
  const completed = stepIndex;

  return (
    <div className="finder-app">
      <div className="finder-toolbar"><div className="mode-toggle" role="group" aria-label="Finder-Modus"><button className={answers.mode === "quick" ? "active" : ""} onClick={() => changeMode("quick")} type="button">Schnell</button><button className={answers.mode === "guided" ? "active" : ""} onClick={() => changeMode("guided")} type="button">Geführt</button></div><span>{answers.mode === "quick" ? "Unter einer Minute" : "Mit einer Zusatzfrage"}</span></div>
      <div className="finder-progress"><div><span>Schritt {stepIndex + 1} von {steps.length}</span><span>{Math.round(((stepIndex + 1) / steps.length) * 100)} %</span></div><progress max={steps.length} value={stepIndex + 1} aria-label={`Fortschritt: Schritt ${stepIndex + 1} von ${steps.length}`} /></div>
      <div className="finder-question" key={step.key}>
        <p className="preview-kicker">{step.eyebrow}</p><h1>{step.question}</h1><p className="question-help">{step.help}</p>
        <div className={`finder-options ${step.options.length > 4 ? "many" : ""}`}>{step.options.map((option) => <button type="button" key={option.value} onClick={() => choose(option.value)}><strong>{option.title}</strong><span>{option.description}</span></button>)}</div>
        {step.unsure ? <button className="unsure-button" type="button" onClick={() => choose(step.unsure!)}>Ich bin nicht sicher – neutral gewichten</button> : null}
      </div>
      <div className="finder-bottom"><button type="button" disabled={stepIndex === 0} onClick={() => setStepIndex((current) => Math.max(0, current - 1))}>← Zurück</button><p aria-live="polite">{completed >= 2 ? "Eine belastbare Ergebnisvorschau ist bereit." : "Deine Antworten werden auf diesem Gerät gespeichert."}</p><button type="button" onClick={() => { setAnswers({ ...defaults, mode: answers.mode }); setStepIndex(0); localStorage.removeItem("raclette-finder:v1"); }}>Neu starten</button></div>
    </div>
  );
}
