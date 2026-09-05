import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AiImageBadge } from "@/components/ai-image-badge";
import { ProductCard } from "@/components/product-card";
import { siteConfig } from "@/config/site";
import { devices } from "@/data/products";
import { getAmazonProducts } from "@/lib/amazon-creators-api";

export const metadata: Metadata = {
  title: { absolute: "Raclette Finder: Geräte vergleichen & passend auswählen" },
  description:
    "Welches Raclette passt zu euch? Vergleicht 200 Geräte, findet Empfehlungen nach Personen, Grillplatte und Budget und entdeckt 100 Raclette-Rezepte.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    title: "Raclette Finder: Das passende Gerät für euren Abend",
    description:
      "200 Raclette-Geräte vergleichen, persönliche Empfehlungen erhalten und 100 Rezeptideen entdecken.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Raclette Finder – das passende Raclette finden" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raclette Finder: Das passende Gerät für euren Abend",
    description: "200 Geräte, transparente Auswahlkriterien und 100 Raclette-Rezepte.",
    images: ["/og.png"],
  },
};

const frequentlyAskedQuestions = [
  {
    question: "Welche Raclette-Größe passt zu wie vielen Personen?",
    answer:
      "Für zwei Personen reicht meist ein kompaktes Gerät mit zwei Pfännchen. Für Familien und Freundesrunden sind Modelle mit sechs bis acht Pfännchen praktisch; sehr große Runden profitieren von acht bis zehn Plätzen und einer entsprechend großen Grillfläche.",
  },
  {
    question: "Naturstein oder beschichtete Grillplatte – was ist besser?",
    answer:
      "Naturstein speichert Wärme lange und eignet sich für gleichmäßiges, fettarmes Grillen, braucht aber mehr Zeit zum Aufheizen. Beschichtete Platten werden schneller heiß, sind leichter und lassen sich meist einfacher reinigen. Entscheidend ist, was besser zu eurem Raclette-Abend passt.",
  },
  {
    question: "Worauf sollte ich beim Raclette-Kauf achten?",
    answer:
      "Wichtig sind Personenzahl, Größe der Grillfläche, Anzahl der Pfännchen, regelbare Temperatur, Kabellänge und Reinigung. Auch die Stellfläche auf dem Tisch und die Art der Grillplatte sollten vor dem Kauf berücksichtigt werden.",
  },
  {
    question: "Wie entstehen die Empfehlungen im Raclette Finder?",
    answer:
      "Der Finder gleicht eure Angaben zu Runde, Budget, Grillvorlieben und Platz mit dokumentierten Produkteigenschaften ab. Die Kriterien und Gewichtungen sind transparent erklärt; bezahlte Platzierungen beeinflussen die Reihenfolge nicht.",
  },
] as const;

const featuredRecipes = [
  {
    title: "Klassisches Raclette",
    mood: "Herzstück",
    image: "/images/recipe-blog/unique/001.webp",
    slug: "klassisches-raclette",
    alt: "Raclette-Pfännchen mit Kartoffeln, Speck, Käse und Cornichons",
    ingredients: "Kartoffeln · Speck · Raclettekäse · Cornichons",
  },
  {
    title: "Flammkuchen-Pfännchen",
    mood: "Knusperliebe",
    image: "/images/recipe-blog/unique/010.webp",
    slug: "flammkuchen-raclette",
    alt: "Knuspriges Flammkuchen-Pfännchen mit Crème fraîche, Zwiebeln und Speck",
    ingredients: "Fladenbrot · Crème fraîche · Zwiebel · Bergkäse",
  },
  {
    title: "Pizza Margherita",
    mood: "Für alle",
    image: "/images/recipe-blog/unique/011.webp",
    slug: "pizza-margherita",
    alt: "Pizza-Margherita-Pfännchen mit Tomate, Mozzarella und Basilikum",
    ingredients: "Baguette · Tomatensauce · Mozzarella · Basilikum",
  },
];

export default async function Home() {
  const featuredProducts = devices.slice(0, 3);
  const amazonProducts = await getAmazonProducts(featuredProducts.map((product) => product.asin));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description:
          "Unabhängige Entscheidungshilfe zum Vergleichen und Auswählen von Raclette-Geräten.",
        inLanguage: "de-DE",
      },
      {
        "@type": "WebApplication",
        "@id": `${siteConfig.url}/#finder`,
        name: "Raclette Finder",
        url: `${siteConfig.url}/finder`,
        applicationCategory: "ShoppingApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        description:
          "Kostenlose Entscheidungshilfe für ein Raclette-Gerät passend zu Personenzahl, Budget, Tisch und Grillvorlieben.",
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        mainEntity: frequentlyAskedQuestions.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <section className="hero-shell">
        <Image
          alt="Fünf Freunde genießen gemeinsam einen Raclette-Abend"
          className="hero-photo"
          fill
          preload
          sizes="100vw"
          src="/images/hero-raclette-evening.png"
        />
        <AiImageBadge />
        <div className="hero-photo-shade" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="site-width hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Dein Abend. Dein Raclette.</p>
            <h1>Welches Raclette passt zu euch?</h1>
            <p className="hero-lead">Der Raclette Finder vergleicht 200 Geräte nach Personenzahl, Grillplatte, Leistung, Platz und Budget. Beantwortet wenige klare Fragen und findet das Modell, das zu eurem Abend passt.</p>
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
      <section className="intro-strip" aria-labelledby="home-intro-title">
        <div className="site-width intro-grid">
          <p className="section-number">Raclette-Kaufberatung</p>
          <div>
            <h2 id="home-intro-title">Das passende Raclette richtet sich nach eurer Runde – nicht nach dem größten Karton.</h2>
            <p>Für die Auswahl zählen vor allem die Zahl der Pfännchen, eine ausreichend große Grillfläche, die gewünschte Plattenart und der verfügbare Platz auf dem Tisch. Unser kostenloser Finder ordnet diese Kriterien ein und führt euch direkt zu passenden Geräten.</p>
            <div className="intro-links" aria-label="Direkte Einstiege">
              <Link href="/finder">Persönliche Empfehlung</Link>
              <Link href="/vergleich">Raclettes vergleichen</Link>
              <Link href="/ratgeber">Kaufberatung lesen</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="steps-section" aria-labelledby="decision-title">
        <div className="site-width">
          <div className="section-heading">
            <p className="section-number">01 — Entscheidung</p>
            <h2 id="decision-title">In drei Schritten zum richtigen Raclette.</h2>
          </div>
          <div className="steps-grid">
            <article><span>01</span><h3>Runde festlegen</h3><p>Zwei Personen brauchen weniger Fläche als eine große Familie. Plant pro Person ein Pfännchen und genügend Platz für Zutaten und Teller ein.</p></article>
            <article><span>02</span><h3>Grillart wählen</h3><p>Naturstein hält die Wärme lange, beschichtete Platten heizen schneller auf. Kombigeräte bieten mehr Abwechslung, benötigen aber meist mehr Stellfläche.</p></article>
            <article><span>03</span><h3>Alltag mitdenken</h3><p>Regelbare Temperatur, Kabellänge, herausnehmbare Platten und eine einfache Reinigung entscheiden darüber, wie gern das Gerät später genutzt wird.</p></article>
          </div>
        </div>
      </section>
      <section className="recommend-section" aria-labelledby="recommend-title"><div className="site-width"><div className="section-heading split"><div><p className="section-number">02 — Raclette-Auswahl</p><h2 id="recommend-title">Drei Raclettes für euren Tisch.</h2></div><Link className="outline-link" href="/produkte">Alle 200 Geräte ansehen</Link></div><div className="product-grid">{featuredProducts.map((product, index) => <ProductCard key={product.id} product={product} amazon={amazonProducts.get(product.asin)} label={["Für Paare", "Für große Runden", "Stein & Genuss"][index]} />)}</div></div></section>
      <section className="home-recipe-section" aria-labelledby="home-recipes-title">
        <div className="site-width">
          <div className="section-heading split">
            <div><p className="section-number">03 — Pfännchen-Ideen</p><h2 id="home-recipes-title">Drei von 100 Ideen für den ersten Genuss.</h2></div>
            <Link className="outline-link" href="/rezepte">Alle 100 Rezepte ansehen</Link>
          </div>
          <div className="home-recipe-grid">
            {featuredRecipes.map((recipe, index) => (
              <article className="home-recipe-card" key={recipe.title}>
                <figure>
                  <Image alt={recipe.alt} fill sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 33vw" src={recipe.image} />
                  <AiImageBadge />
                </figure>
                <div>
                  <p><span>{String(index + 1).padStart(2, "0")}</span>{recipe.mood}</p>
                  <h3>{recipe.title}</h3>
                  <p className="home-recipe-ingredients">{recipe.ingredients}</p>
                  <Link href={`/rezepte/${recipe.slug}`}>Rezept entdecken <span aria-hidden="true">→</span></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="home-faq-section" aria-labelledby="home-faq-title">
        <div className="site-width home-faq-grid">
          <div className="home-faq-intro">
            <p className="section-number">04 — Kurz beantwortet</p>
            <h2 id="home-faq-title">Häufige Fragen vor dem Raclette-Kauf.</h2>
            <p>Klare Antworten auf die wichtigsten Entscheidungen. Noch mehr Details findet ihr in unserem <Link href="/ratgeber">Raclette-Ratgeber</Link>.</p>
          </div>
          <div className="home-faq-list">
            {frequentlyAskedQuestions.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>{item.question}<span aria-hidden="true">+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="home-seo-section" aria-labelledby="home-seo-title">
        <div className="site-width">
          <div className="home-seo-heading">
            <p className="section-number">05 — Orientierung</p>
            <h2 id="home-seo-title">Raclette finden, vergleichen und gut vorbereitet genießen.</h2>
          </div>
          <div className="home-seo-copy">
            <article><h3>Raclette-Geräte passend zur Personenzahl auswählen</h3><p>Ein gutes <Link href="/produkte">Raclette-Gerät</Link> muss zur tatsächlichen Runde passen. Für Paare sind kompakte Mini-Raclettes schnell aufgebaut und platzsparend, während Familien und größere Gruppen von sechs, acht oder zehn Pfännchen sowie einer breiteren Grillfläche profitieren. Der <Link href="/finder">Raclette Finder</Link> berücksichtigt deshalb Personenzahl, Tischgröße und Budget gemeinsam, statt einfach nur besonders große oder teure Geräte zu zeigen.</p></article>
            <article><h3>Naturstein, Grillplatte und Ausstattung vergleichen</h3><p>Beim <Link href="/vergleich">Raclette-Vergleich</Link> lohnt sich der Blick auf mehr als Wattzahl und Preis. Naturstein verteilt Wärme gleichmäßig und speichert sie lange, eine beschichtete Grillplatte wird meist schneller heiß und lässt sich leichter reinigen. Temperaturregelung, Kabellänge, Plattenaufteilung und spülmaschinengeeignete Teile beeinflussen den Alltag ebenfalls. Unsere <Link href="/so-funktionierts">Auswahlmethode</Link> macht sichtbar, welche dokumentierten Eigenschaften in die Empfehlung einfließen.</p></article>
            <article><h3>Von der Kaufberatung bis zum ersten Pfännchen</h3><p>Nach der Gerätewahl helfen <Link href="/rezepte">100 Raclette-Rezepte</Link> bei der Planung – von klassischen Kartoffel-Käse-Pfännchen bis zu vegetarischen, internationalen und süßen Ideen. Produktdaten und Verfügbarkeiten werden regelmäßig geprüft; der dokumentierte Stand ist {siteConfig.dataCheckedAt}. Wir führen zu Angeboten bei Amazon, erklären die Finanzierung aber offen in unserer <Link href="/affiliate-transparenz">Affiliate-Transparenz</Link>: Die redaktionelle Einordnung bleibt von einer Vergütung unabhängig.</p></article>
          </div>
        </div>
      </section>
      <section className="closing-cta" aria-labelledby="home-closing-title">
        <div className="site-width">
          <p>Bereit für eine klare Auswahl?</p>
          <h2 id="home-closing-title">Euer Raclette wartet.</h2>
          <Link className="button button-primary" href="/finder">Finder starten <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
