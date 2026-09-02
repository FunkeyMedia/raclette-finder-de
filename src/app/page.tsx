import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/product-card";
import { devices } from "@/data/products";
import { getAmazonProducts } from "@/lib/amazon-creators-api";

const featuredRecipes = [
  {
    title: "Klassisches Raclette",
    mood: "Herzstück",
    image: "/images/recipe-blog/original/001.webp",
    slug: "klassisches-raclette",
    alt: "Raclette-Pfännchen mit Kartoffeln, Speck, Käse und Cornichons",
    ingredients: "Kartoffeln · Speck · Raclettekäse · Cornichons",
  },
  {
    title: "Flammkuchen-Pfännchen",
    mood: "Knusperliebe",
    image: "/images/recipe-blog/original/010.webp",
    slug: "flammkuchen-raclette",
    alt: "Knuspriges Flammkuchen-Pfännchen mit Crème fraîche, Zwiebeln und Speck",
    ingredients: "Fladenbrot · Crème fraîche · Zwiebel · Bergkäse",
  },
  {
    title: "Pizza Margherita",
    mood: "Für alle",
    image: "/images/recipe-blog/original/011.webp",
    slug: "pizza-margherita",
    alt: "Pizza-Margherita-Pfännchen mit Tomate, Mozzarella und Basilikum",
    ingredients: "Baguette · Tomatensauce · Mozzarella · Basilikum",
  },
];

export default async function Home() {
  const featuredProducts = devices.slice(0, 3);
  const amazonProducts = await getAmazonProducts(featuredProducts.map((product) => product.asin));
  return (
    <main>
      <section className="hero-shell">
        <Image
          alt="Fünf Freunde genießen gemeinsam einen Raclette-Abend"
          className="hero-photo"
          fill
          preload
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
      <section className="recommend-section" aria-labelledby="recommend-title"><div className="site-width"><div className="section-heading split"><div><p className="section-number">01 — Raclette-Auswahl</p><h2 id="recommend-title">Drei Raclettes für euren Tisch.</h2></div><Link className="outline-link" href="/produkte">Alle 200 Geräte ansehen</Link></div><div className="product-grid">{featuredProducts.map((product, index) => <ProductCard key={product.id} product={product} amazon={amazonProducts.get(product.asin)} label={["Für Paare", "Für große Runden", "Stein & Genuss"][index]} />)}</div></div></section>
      <section className="home-recipe-section" aria-labelledby="home-recipes-title">
        <div className="site-width">
          <div className="section-heading split">
            <div><p className="section-number">02 — Pfännchen-Ideen</p><h2 id="home-recipes-title">Drei von 100 Ideen für den ersten Genuss.</h2></div>
            <Link className="outline-link" href="/rezepte">Alle 100 Rezepte ansehen</Link>
          </div>
          <div className="home-recipe-grid">
            {featuredRecipes.map((recipe, index) => (
              <article className="home-recipe-card" key={recipe.title}>
                <figure>
                  <Image alt={recipe.alt} fill sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 33vw" src={recipe.image} />
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
    </main>
  );
}
