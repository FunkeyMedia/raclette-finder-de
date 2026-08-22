import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/product-card";
import { devices } from "@/data/products";

export default function Home() {
  return (
    <main>
      <section className="hero-shell">
        <Image
          alt="Fünf Freunde genießen gemeinsam einen Raclette-Abend"
          className="hero-photo"
          fill
          priority
          sizes="100vw"
          src="/images/hero-raclette-evening.png"
        />
        <div className="hero-photo-shade" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="site-width hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Dein Abend. Dein Raclette.</p>
            <h1>Das richtige Raclette fühlt sich schon vor dem ersten Käse gut an.</h1>
            <p className="hero-lead">Sag uns, wie ihr zusammenkommt. In wenigen klaren Fragen finden wir das Gerät, das zu eurer Runde, eurem Tisch und eurem Budget passt.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/finder">Finder starten <span aria-hidden="true">→</span></Link>
              <Link className="text-link" href="/so-funktionierts">So entsteht deine Empfehlung</Link>
            </div>
            <ul className="trust-row" aria-label="Vorteile des Finders">
              <li><strong>Unter 1 Min.</strong><span>Schnellmodus</span></li>
              <li><strong>200</strong><span>geprüfte Geräte</span></li>
              <li><strong>Transparent</strong><span>statt Bauchgefühl</span></li>
            </ul>
          </div>
          <div className="hero-stage">
            <div className="hero-image-caption"><span>Gemeinsam statt kompliziert</span><strong>In wenigen Fragen zur passenden Tischrunde.</strong></div>
          </div>
        </div>
      </section>
      <section className="intro-strip" aria-labelledby="intro-title">
        <div className="site-width intro-grid"><p className="section-number">01 — Klarheit</p><div><h2 id="intro-title">Kein stundenlanges Vergleichen. Keine Empfehlung ohne Warum.</h2><p>Wir übersetzen technische Details in eine Entscheidung, die zu deinem echten Raclette-Abend passt.</p></div></div>
      </section>
      <section className="steps-section" aria-labelledby="steps-title"><div className="site-width">
        <div className="section-heading"><p className="section-number">02 — Der Weg</p><h2 id="steps-title">Drei kleine Schritte. Ein ziemlich guter Abend.</h2></div>
        <div className="steps-grid">
          <article><span>1</span><h3>Erzähl uns von euch</h3><p>Wie groß ist eure Runde, was mögt ihr und wie viel Platz steht auf dem Tisch?</p></article>
          <article><span>2</span><h3>Wir rechnen nachvollziehbar</h3><p>Passende Geräte werden nach Größe, Budget, Platte und euren Prioritäten gewichtet.</p></article>
          <article><span>3</span><h3>Du entscheidest mit Ruhe</h3><p>Eine klare Empfehlung, zwei ehrliche Alternativen und alle Unterschiede auf einen Blick.</p></article>
        </div>
      </div></section>
      <section className="finder-band"><div className="site-width finder-band-grid"><div><p className="eyebrow dark"><span />Der Schnellmodus</p><h2>Die passende Richtung in weniger als einer Minute.</h2><p>Vier verständliche Fragen reichen für eine belastbare Vorauswahl. Du kannst jede Antwort später ändern.</p><Link className="button button-primary" href="/finder?mode=quick">Schnell finden <span aria-hidden="true">→</span></Link></div><div className="score-demo"><div className="score-ring"><strong>94</strong><span>% Match</span></div><h3>Warum dieser Treffer?</h3><ul><li>Die passende Größe für eure Runde</li><li>In deiner Budgetklasse</li><li>Die gewünschte Grillfläche</li></ul><Link href="/so-funktionierts">Ranking verstehen →</Link></div></div></section>
      <section className="recommend-section" aria-labelledby="recommend-title"><div className="site-width"><div className="section-heading split"><div><p className="section-number">03 — Orientierung</p><h2 id="recommend-title">Ein erster Blick auf beliebte Größen.</h2></div><Link className="outline-link" href="/produkte">Alle 200 Geräte ansehen</Link></div><div className="product-grid">{devices.slice(0,3).map((product, index) => <ProductCard key={product.id} product={product} label={["Für Paare", "Für große Runden", "Stein & Genuss"][index]} />)}</div></div></section>
      <section className="trust-section"><div className="site-width trust-grid"><div><p className="section-number">04 — Vertrauen</p><h2>Wir verkaufen dir keine Gewissheit, die Produktdaten nicht hergeben.</h2></div><div className="trust-copy"><p>Unsere Empfehlung ist eine regelbasierte Entscheidungshilfe. Sie ersetzt keinen eigenen Test und keine individuelle Fachberatung.</p><ul><li>Produktinformationen zuletzt geprüft am 22. August 2026</li><li>Affiliate-Finanzierung klar gekennzeichnet</li><li>Keine erfundenen Testsiegel oder Echtzeitpreise</li><li>Jeder Match-Score wird verständlich begründet</li></ul><Link className="text-link dark-link" href="/affiliate-transparenz">Unsere Transparenzregeln</Link></div></div></section>
      <section className="closing-cta"><div className="site-width"><p>Bereit für mehr Käse und weniger Grübeln?</p><h2>Findet euer Raclette.</h2><Link className="button button-primary" href="/finder">Finder starten <span aria-hidden="true">→</span></Link></div></section>
    </main>
  );
}
