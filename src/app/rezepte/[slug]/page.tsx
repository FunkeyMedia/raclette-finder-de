import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AiImageBadge } from "@/components/ai-image-badge";
import { RecipeRacletteRecommendations, type RecipeRecommendationGroup } from "@/components/recipe-raclette-recommendations";
import { devices } from "@/data/products";
import { getRecipe, recipes } from "@/data/recipes";
import type { Product } from "@/data/types";

type Props = { params: Promise<{ slug: string }> };

const recommendationPeople = [2, 4, 8] as const;

function confidenceScore(product: Product) {
  const rating = product.rating ?? 0;
  const ratingCount = product.ratingCount ?? 0;
  const confidenceWeight = ratingCount / (ratingCount + 150);
  return 4.2 + (rating - 4.2) * confidenceWeight;
}

const racletteRecommendationGroups: RecipeRecommendationGroup[] = recommendationPeople.map((people) => ({
  people,
  products: devices
    .filter((product) => product.people === people && product.rating !== null)
    .sort((first, second) => confidenceScore(second) - confidenceScore(first) || (second.ratingCount ?? 0) - (first.ratingCount ?? 0))
    .slice(0, 3),
}));

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) return {};

  return {
    title: `${recipe.title}: einfaches Raclette-Rezept`,
    description: recipe.description,
    alternates: { canonical: `/rezepte/${recipe.slug}` },
    openGraph: {
      type: "article",
      title: recipe.title,
      description: recipe.description,
      images: [{ url: recipe.image, alt: recipe.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description: recipe.description,
      images: [recipe.image],
    },
  };
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();

  const related = recipes.filter((item) => item.category === recipe.category && item.slug !== recipe.slug).slice(0, 3);
  const recipeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    image: recipe.image,
    recipeCategory: "Raclette",
    recipeCuisine: recipe.category,
    prepTime: "PT10M",
    cookTime: "PT8M",
    totalTime: "PT18M",
    recipeYield: "1 Raclette-Pfännchen",
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((step) => ({ "@type": "HowToStep", text: step })),
  };

  return (
    <main className="recipe-article">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />

      <div className="site-width recipe-breadcrumbs" aria-label="Brotkrümelnavigation">
        <Link href="/">Startseite</Link><span aria-hidden="true">/</span>
        <Link href="/rezepte">Rezepte</Link><span aria-hidden="true">/</span>
        <span>{recipe.title}</span>
      </div>

      <article>
        <header className="recipe-article-hero site-width">
          <div className="recipe-article-copy">
            <p className="eyebrow"><span /> Rezept {String(recipe.number).padStart(2, "0")} · {recipe.category}</p>
            <h1>{recipe.title}</h1>
            <p className="recipe-article-lead">{recipe.tagline}</p>
            <dl className="recipe-facts">
              <div><dt>Vorbereitung</dt><dd>{recipe.preparationTime}</dd></div>
              <div><dt>Im Pfännchen</dt><dd>{recipe.cookingTime}</dd></div>
              <div><dt>Menge</dt><dd>1 Pfännchen</dd></div>
            </dl>
          </div>
          <figure>
            <Image alt={recipe.imageAlt} fill loading="eager" sizes="(max-width: 860px) 100vw, 48vw" src={recipe.image} />
            <AiImageBadge />
          </figure>
        </header>

        <section className="site-width recipe-article-body">
          <aside className="recipe-ingredients">
            <p>Für ein Pfännchen</p>
            <h2>Zutaten</h2>
            <ul>{recipe.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul>
            <p className="recipe-scale-note">Für eine größere Runde die Mengen einfach mit der Zahl der Gäste multiplizieren und mehrere Zutaten zur Auswahl anbieten.</p>
          </aside>
          <div className="recipe-method">
            <p className="section-number">Schritt für Schritt</p>
            <h2>So gelingt dein {recipe.title}</h2>
            <ol>
              {recipe.steps.map((step, index) => (
                <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>
              ))}
            </ol>
            <div className="recipe-tip">
              <strong>Unser Raclette-Tipp</strong>
              <p>Das Pfännchen nicht zu hoch stapeln. Eine flache Schicht wird gleichmäßiger heiß und bekommt schneller die gewünschte goldene Oberfläche.</p>
            </div>
          </div>
        </section>
      </article>

      <section className="recipe-finder-banner">
        <div className="site-width">
          <div><p>Passend zu deinem Rezept</p><h2>Finde das Raclette für eure Tischrunde.</h2></div>
          <Link className="button button-primary" href="/finder">Finder starten <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="site-width related-recipes" aria-labelledby="related-recipes-title">
        <div className="section-heading split">
          <div><p className="section-number">Noch mehr Ideen</p><h2 id="related-recipes-title">Das könnte dir auch schmecken.</h2></div>
          <Link className="outline-link" href="/rezepte">Alle 100 Rezepte</Link>
        </div>
        <div className="related-recipes-grid">
          {related.map((item) => (
            <Link href={`/rezepte/${item.slug}`} key={item.slug}>
              <figure><Image alt={item.imageAlt} fill sizes="(max-width: 620px) 100vw, 33vw" src={item.image} /><AiImageBadge /></figure>
              <p>{item.category}</p><h3>{item.title}</h3><span>Rezept öffnen →</span>
            </Link>
          ))}
        </div>
      </section>

      <RecipeRacletteRecommendations groups={racletteRecommendationGroups} />
    </main>
  );
}
