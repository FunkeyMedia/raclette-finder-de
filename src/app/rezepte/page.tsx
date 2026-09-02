import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { recipeCategories, recipes } from "@/data/recipes";

export const metadata: Metadata = {
  title: "100 Raclette-Rezepte für jeden Geschmack",
  description:
    "Entdecke 100 Raclette-Rezepte: klassische Pfännchen, vegetarische und vegane Ideen, internationale Kombinationen, Fisch und süße Desserts.",
  alternates: { canonical: "/rezepte" },
  openGraph: {
    title: "100 Raclette-Rezepte für unvergessliche Abende",
    description: "Von klassisch bis kreativ: 100 einfache Raclette-Ideen mit Zutaten und Zubereitung.",
    images: [{ url: "/images/recipe-blog/alpen.webp", alt: "Raclette-Pfännchen mit geschmolzenem Käse" }],
  },
};

export default function RecipesPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "100 Raclette-Rezepte",
    numberOfItems: recipes.length,
    itemListElement: recipes.map((recipe) => ({
      "@type": "ListItem",
      position: recipe.number,
      name: recipe.title,
      url: `/rezepte/${recipe.slug}`,
    })),
  };

  return (
    <main className="recipes-index">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />

      <section className="recipes-index-hero">
        <div className="site-width recipes-index-hero-grid">
          <div>
            <p className="eyebrow"><span /> Raclette-Rezeptwelt</p>
            <h1>100 Ideen. Unendlich viele Lieblingspfännchen.</h1>
            <p>
              Klassisch, vegetarisch, würzig, international oder süß: Hier findet jede Person am Tisch ein Rezept, das sofort ausprobiert werden möchte.
            </p>
            <div className="recipes-index-stats">
              <div><strong>100</strong><span>Rezepte</span></div>
              <div><strong>8</strong><span>Kategorien</span></div>
              <div><strong>1</strong><span>perfekter Abend</span></div>
            </div>
          </div>
          <figure>
            <Image
              alt="Helles Raclette-Pfännchen mit Kartoffeln, Speck und geschmolzenem Käse"
              fill
              preload
              sizes="(max-width: 860px) 100vw, 46vw"
              src="/images/recipe-blog/unique/001.webp"
            />
          </figure>
        </div>
      </section>

      <nav className="recipe-category-nav" aria-label="Rezeptkategorien">
        <div className="site-width">
          {recipeCategories.map((category) => (
            <a href={`#${category.toLowerCase().replace(/[^a-zäöüß]+/g, "-")}`} key={category}>{category}</a>
          ))}
        </div>
      </nav>

      <div className="site-width recipe-library">
        {recipeCategories.map((category) => {
          const categoryRecipes = recipes.filter((recipe) => recipe.category === category);
          const id = category.toLowerCase().replace(/[^a-zäöüß]+/g, "-");
          return (
            <section className="recipe-library-section" id={id} key={category}>
              <header>
                <p>{String(categoryRecipes[0].number).padStart(2, "0")}–{String(categoryRecipes.at(-1)?.number).padStart(2, "0")}</p>
                <div><h2>{category}</h2><span>{categoryRecipes.length} Rezepte</span></div>
              </header>
              <div className="recipe-library-grid">
                {categoryRecipes.map((recipe) => (
                  <article className="recipe-library-card" key={recipe.slug}>
                    <Link href={`/rezepte/${recipe.slug}`} aria-label={`${recipe.title} öffnen`}>
                      <figure>
                        <Image alt={recipe.imageAlt} fill sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 33vw" src={recipe.image} />
                      </figure>
                      <div>
                        <p>{recipe.category}</p>
                        <h3>{recipe.title}</h3>
                        <span>{recipe.tagline}</span>
                        <strong>Rezept ansehen <i aria-hidden="true">→</i></strong>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section className="recipe-library-cta">
        <div className="site-width">
          <p>Schon ein Lieblingsrezept gefunden?</p>
          <h2>Jetzt fehlt nur noch das passende Raclette.</h2>
          <Link className="button button-primary" href="/finder">Passendes Raclette finden <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
