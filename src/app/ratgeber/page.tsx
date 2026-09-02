import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

type Recipe = {
  title: string;
  mood: string;
  teaser: string;
  ingredients: string;
  method: string;
};

type RecipeChapter = {
  id: string;
  number: string;
  label: string;
  title: string;
  intro: string;
  tone: string;
  recipes: Recipe[];
};

export const metadata: Metadata = {
  title: "20 Raclette-Ideen: von klassisch bis süß",
  description:
    "20 kreative Raclette-Rezepte für einen gemütlichen Abend: Klassiker, vegetarische Pfännchen, Ideen aus aller Welt, Grillfavoriten und süße Desserts.",
  alternates: { canonical: "/ratgeber" },
  openGraph: {
    title: "20 Raclette-Ideen für einen Abend, der bleibt",
    description:
      "Von Alpen-Klassiker bis Beeren-Cheesecake: 20 einfache Pfännchen-Ideen für Familie und Freunde.",
  },
  twitter: {
    title: "20 Raclette-Ideen für einen Abend, der bleibt",
    description:
      "Von Alpen-Klassiker bis Beeren-Cheesecake: 20 einfache Pfännchen-Ideen für Familie und Freunde.",
  },
};

const chapters: RecipeChapter[] = [
  {
    id: "klassiker",
    number: "01",
    label: "Vertraute Klassiker",
    title: "So schmeckt Hüttenzauber.",
    intro:
      "Kartoffeln, würziger Käse und knusprige Kleinigkeiten: vier Pfännchen, bei denen sofort alle wissen, warum Raclette so glücklich macht.",
    tone: "ember",
    recipes: [
      {
        title: "Alpen-Klassiker",
        mood: "Herzstück",
        teaser: "Der erste Bissen fühlt sich an wie ein warmer Platz am Kamin.",
        ingredients: "Kartoffelscheiben · Speck · Raclettekäse · Cornichons · schwarzer Pfeffer",
        method:
          "Speck auf der Grillplatte knusprig braten. Kartoffel und Speck ins Pfännchen geben, Käse darüber schmelzen und mit Cornichons und Pfeffer vollenden.",
      },
      {
        title: "Flammkuchen-Pfännchen",
        mood: "Knusperliebe",
        teaser: "Cremig, rauchig und genau richtig für das zweite Pfännchen.",
        ingredients: "dünnes Fladenbrot · Crème fraîche · rote Zwiebel · Speck · Bergkäse",
        method:
          "Fladenbrot passend zuschneiden, dünn mit Crème fraîche bestreichen und belegen. Unter dem Käse backen, bis der Rand goldbraun ist.",
      },
      {
        title: "Pizza Margherita",
        mood: "Für alle",
        teaser: "Ein kleiner Italienurlaub, der sogar bei Kindern sofort ankommt.",
        ingredients: "Baguettescheibe · Tomatensauce · Kirschtomate · Mozzarella · Basilikum",
        method:
          "Brot mit wenig Tomatensauce bestreichen, Tomate und Mozzarella auflegen und überbacken. Basilikum erst danach daraufzupfen.",
      },
      {
        title: "Käsespätzle Deluxe",
        mood: "Seelenwärmer",
        teaser: "Wenn aus einem Rest Spätzle das heimliche Lieblingspfännchen wird.",
        ingredients: "gekochte Spätzle · Bergkäse · Röstzwiebeln · Schnittlauch · Muskat",
        method:
          "Spätzle mit einer Prise Muskat ins Pfännchen geben, Käse darauf schmelzen und zum Schluss mit Röstzwiebeln und Schnittlauch bestreuen.",
      },
    ],
  },
  {
    id: "vegetarisch",
    number: "02",
    label: "Bunt & vegetarisch",
    title: "Gemüse darf hier glänzen.",
    intro:
      "Diese Kombinationen brauchen keine Nebenrolle: Sie sind frisch, würzig, farbenfroh und verschwinden meistens schneller als gedacht.",
    tone: "sage",
    recipes: [
      {
        title: "Caprese mit Pesto",
        mood: "Sonnenmoment",
        teaser: "Tomate, Basilikum und geschmolzener Käse bringen Licht in dunkle Abende.",
        ingredients: "Kirschtomaten · Mini-Mozzarella · grünes Pesto · Pinienkerne · Basilikum",
        method:
          "Tomaten halbieren, mit Mozzarella und einem Klecks Pesto erwärmen. Pinienkerne auf der Platte rösten und mit Basilikum darübergeben.",
      },
      {
        title: "Waldpilz & Thymian",
        mood: "Waldspaziergang",
        teaser: "Erdig, cremig und so duftend, dass die Nachbarn neugierig werden.",
        ingredients: "Champignons · Kräuterseitlinge · Crème fraîche · Thymian · Raclettekäse",
        method:
          "Pilze auf der Platte kräftig anrösten. Mit Crème fraîche ins Pfännchen geben, Käse schmelzen lassen und frischen Thymian darüberstreuen.",
      },
      {
        title: "Kürbis, Ziege & Honig",
        mood: "Goldener Abend",
        teaser: "Süß, salzig und nussig – ein Pfännchen wie spätes Herbstlicht.",
        ingredients: "vorgegarter Kürbis · Ziegenkäse · Walnuss · Honig · Rosmarin",
        method:
          "Kürbis mit Ziegenkäse erwärmen, bis die Ränder leicht bräunen. Mit Walnuss, wenig Honig und fein gehacktem Rosmarin servieren.",
      },
      {
        title: "Grüner Garten",
        mood: "Frisch & frech",
        teaser: "Knackiges Gemüse, ein Hauch Chili und viel geschmolzener Cheddar.",
        ingredients: "vorgegarter Brokkoli · Zucchini · Mais · Cheddar · Chiliflocken",
        method:
          "Zucchini auf der Platte anrösten, mit Brokkoli und Mais ins Pfännchen geben. Cheddar darüber schmelzen und mit Chili abschmecken.",
      },
    ],
  },
  {
    id: "weltreise",
    number: "03",
    label: "Kleine Weltreise",
    title: "Vier Länder. Ein Tisch.",
    intro:
      "Ein paar Gewürze verändern die ganze Stimmung. Diese Pfännchen reisen von Mexiko über Griechenland und Thailand bis nach Korea.",
    tone: "sun",
    recipes: [
      {
        title: "Mexico Fuego",
        mood: "Fiesta",
        teaser: "Scharf, saftig, käsig – und garantiert nicht lange unbeachtet.",
        ingredients: "schwarze Bohnen · Mais · Salsa · Jalapeño · Cheddar · Tortillachips",
        method:
          "Bohnen, Mais, Salsa und Jalapeño mit Cheddar überbacken. Kurz vor dem Essen zerbröselte Tortillachips darübergeben.",
      },
      {
        title: "Griechische Nacht",
        mood: "Meeresbrise",
        teaser: "Oliven, Oregano und Feta schmecken nach einer langen Tafel im Süden.",
        ingredients: "Paprika · Zucchini · schwarze Oliven · Feta · Oregano",
        method:
          "Paprika und Zucchini auf der Platte rösten, mit Oliven ins Pfännchen geben und Feta darüberbröseln. Mit Oregano gratinieren.",
      },
      {
        title: "Thai-Curry-Creme",
        mood: "Sanfte Wärme",
        teaser: "Cremiges Curry trifft auf milden Käse – überraschend harmonisch.",
        ingredients: "vorgegarte Süßkartoffel · Babyspinat · Kokoscreme · Currypaste · Mozzarella",
        method:
          "Süßkartoffel, Spinat und einen kleinen Klecks Kokoscreme mit wenig Currypaste mischen. Mozzarella darüber sanft schmelzen.",
      },
      {
        title: "Seoul Cheese Melt",
        mood: "Umami",
        teaser: "Kimchi, Sesam und würziges Rind bringen Spannung in die Runde.",
        ingredients: "dünnes Rindfleisch · gut abgetropftes Kimchi · milder Käse · Frühlingszwiebel · Sesam",
        method:
          "Rindfleisch auf der Platte vollständig durchgaren. Mit Kimchi ins Pfännchen geben, Käse schmelzen und mit Frühlingszwiebel und Sesam toppen.",
      },
    ],
  },
  {
    id: "grill",
    number: "04",
    label: "Von der Grillplatte",
    title: "Oben rösten, unten schmelzen.",
    intro:
      "Hier arbeiten Grillplatte und Pfännchen als Team. Fleisch und Meeresfrüchte immer vollständig durchgaren – dann wird es richtig gut.",
    tone: "ink",
    recipes: [
      {
        title: "Teriyaki Chicken",
        mood: "Süß & würzig",
        teaser: "Ananas, Sesam und glänzende Sauce sorgen für sofortige gute Laune.",
        ingredients: "Hähnchenwürfel · Ananas · Teriyakisauce · Gouda · Frühlingszwiebel",
        method:
          "Hähnchen auf der Platte vollständig durchgaren, Ananas kurz mitrösten. Beides mit wenig Sauce und Gouda überbacken, dann garnieren.",
      },
      {
        title: "Steakhouse-Pfännchen",
        mood: "Feierabend",
        teaser: "Pfeffer, Zwiebeln und saftiges Rind – klein gebaut, groß im Geschmack.",
        ingredients: "Rinderstreifen · rote Zwiebel · Paprika · Pfefferkäse · Petersilie",
        method:
          "Rind und Gemüse auf der Platte bis zum gewünschten Gargrad braten. Im Pfännchen mit Pfefferkäse überbacken und Petersilie ergänzen.",
      },
      {
        title: "Lachs, Dill & Zitrone",
        mood: "Nordlicht",
        teaser: "Frisch, cremig und elegant genug für das besondere Pfännchen.",
        ingredients: "Kartoffelscheiben · Räucherlachs · Frischkäse · Dill · Zitronenabrieb",
        method:
          "Kartoffel mit Frischkäse erwärmen. Räucherlachs erst danach locker darauflegen und mit Dill sowie wenig Zitronenabrieb servieren.",
      },
      {
        title: "Garnelen in Knoblauchbutter",
        mood: "Küstenabend",
        teaser: "Ein Duft wie Urlaub – mit Tomate, Kräutern und goldener Kruste.",
        ingredients: "Garnelen · Knoblauchbutter · Kirschtomate · Mozzarella · Petersilie",
        method:
          "Garnelen auf der Platte vollständig durchgaren. Mit Tomate und wenig Knoblauchbutter ins Pfännchen geben, überbacken und mit Petersilie abschließen.",
      },
    ],
  },
  {
    id: "suess",
    number: "05",
    label: "Süßer Abschluss",
    title: "Das letzte Pfännchen gehört dem Dessert.",
    intro:
      "Wenn eigentlich niemand mehr kann, ist plötzlich doch noch Platz. Vier warme Kleinigkeiten zum Teilen – oder eben auch nicht.",
    tone: "berry",
    recipes: [
      {
        title: "Apfelstrudel-Moment",
        mood: "Kindheit",
        teaser: "Warmer Apfel und Zimt machen den Raum sofort ein bisschen gemütlicher.",
        ingredients: "dünne Apfelscheiben · Briochewürfel · Rosinen · Zimt · Mandelblättchen",
        method:
          "Apfel und Brioche mit etwas Butter weich werden lassen. Rosinen und Zimt dazugeben, Mandelblättchen auf der Platte rösten und darüberstreuen.",
      },
      {
        title: "Birne & Schokolade",
        mood: "Leises Glück",
        teaser: "Saftige Birne unter dunkler Schokolade – schlicht und wunderschön.",
        ingredients: "reife Birne · dunkle Schokolade · Haselnuss · Prise Salz · optional Vanilleeis",
        method:
          "Birne kurz erwärmen, Schokolade darauf schmelzen und mit Haselnuss sowie einer Prise Salz bestreuen. Eis erst auf dem Teller dazugeben.",
      },
      {
        title: "Banane Salted Caramel",
        mood: "Mitternacht",
        teaser: "Karamellisiert, knusprig und gefährlich gut nach einem langen Abend.",
        ingredients: "Banane · Karamellsauce · Butterkeks · Erdnüsse · Meersalz",
        method:
          "Banane im Pfännchen warm und leicht goldbraun werden lassen. Karamell, Keksbrösel, Erdnüsse und wenige Salzflocken darübergeben.",
      },
      {
        title: "Beeren-Cheesecake",
        mood: "Farbenfroh",
        teaser: "Cremige Vanille, warme Beeren und Keks – ein kleines Fest zum Schluss.",
        ingredients: "Beeren · Frischkäse · Vanillezucker · Butterkeks · weiße Schokolade",
        method:
          "Frischkäse mit wenig Vanillezucker verrühren, mit Beeren erwärmen und weiße Schokolade schmelzen lassen. Mit Keksbröseln servieren.",
      },
    ],
  },
];

const allRecipes = chapters.flatMap((chapter) => chapter.recipes);

const recipeImages = [
  "01-alpen-klassiker.jpg",
  "02-flammkuchen.jpg",
  "03-pizza-margherita.jpg",
  "04-kaesespaetzle.jpg",
  "05-caprese-pesto.jpg",
  "06-waldpilz-thymian.jpg",
  "07-kuerbis-ziege-honig.jpg",
  "08-gruener-garten.jpg",
  "09-mexico-fuego.jpg",
  "10-griechische-nacht.jpg",
  "11-thai-curry.jpg",
  "12-seoul-cheese-melt.jpg",
  "13-teriyaki-chicken.jpg",
  "14-steakhouse.jpg",
  "15-lachs-dill-zitrone.jpg",
  "16-garnelen-knoblauchbutter.jpg",
  "17-apfelstrudel.jpg",
  "18-birne-schokolade.jpg",
  "19-banane-salted-caramel.jpg",
  "20-beeren-cheesecake.jpg",
] as const;

function RecipeCard({ recipe, index }: { recipe: Recipe; index: number }) {
  return (
    <article className="recipe-card">
      <figure className="recipe-card-image">
        <Image
          alt={`${recipe.title} in einem kleinen Raclette-Pfännchen`}
          fill
          sizes="(max-width: 620px) calc(100vw - 28px), (max-width: 1180px) 50vw, 580px"
          src={`/images/recipes/${recipeImages[index]}`}
        />
      </figure>
      <div className="recipe-card-content">
        <div className="recipe-card-topline">
          <span className="recipe-index">{String(index + 1).padStart(2, "0")}</span>
          <span className="recipe-mood">{recipe.mood}</span>
        </div>
        <h3>{recipe.title}</h3>
        <p className="recipe-teaser">{recipe.teaser}</p>
        <div className="recipe-detail">
          <strong>Ins Pfännchen</strong>
          <p>{recipe.ingredients}</p>
        </div>
        <div className="recipe-detail recipe-method">
          <strong>So geht&apos;s</strong>
          <p>{recipe.method}</p>
        </div>
      </div>
    </article>
  );
}

export default function GuidePage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "20 Raclette-Rezeptideen",
    numberOfItems: allRecipes.length,
    itemListElement: allRecipes.map((recipe, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: recipe.title,
    })),
  };

  const recipeOffsets = chapters.map((_, chapterIndex) =>
    chapters.slice(0, chapterIndex).reduce((sum, chapter) => sum + chapter.recipes.length, 0),
  );

  return (
    <main className="recipe-guide">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />

      <section className="guide-hero">
        <div className="site-width guide-hero-grid">
          <div className="guide-hero-copy">
            <p className="eyebrow"><span /> Raclette-Rezepte</p>
            <h1>20 Pfännchen, die euren Abend unvergesslich machen.</h1>
            <p className="guide-hero-lead">
              Mal vertraut, mal überraschend, immer zum Teilen: Diese Ideen bringen Lieblingsmenschen, warmes Licht und richtig guten Käse an einen Tisch.
            </p>
            <div className="guide-stats" aria-label="Überblick zum Rezept-Ratgeber">
              <div><strong>20</strong><span>Rezeptideen</span></div>
              <div><strong>5</strong><span>Genusswelten</span></div>
              <div><strong>1</strong><span>langer Abend</span></div>
            </div>
          </div>
          <figure className="guide-hero-figure">
            <Image
              alt="Freunde lachen gemeinsam an einem warm beleuchteten Raclette-Tisch"
              fill
              preload
              sizes="(max-width: 860px) 100vw, 48vw"
              src="/images/hero-raclette-evening.png"
            />
            <figcaption><span>Mehr als Abendessen</span> Die besten Erinnerungen passen in kein Pfännchen.</figcaption>
          </figure>
        </div>
      </section>

      <nav className="guide-jumpbar" aria-label="Zu den Rezeptkategorien">
        <div className="site-width guide-jumpbar-inner">
          <span>Spring direkt zu:</span>
          {chapters.map((chapter) => <a key={chapter.id} href={`#${chapter.id}`}>{chapter.label}</a>)}
        </div>
      </nav>

      <section className="guide-opening" aria-labelledby="guide-opening-title">
        <div className="site-width guide-opening-grid">
          <p className="section-number">Bevor es zischt</p>
          <div>
            <h2 id="guide-opening-title">Ein guter Raclette-Abend beginnt nicht mit Perfektion. Sondern mit Auswahl.</h2>
            <p>
              Stelle Zutaten in kleinen Schalen auf den Tisch, schneide alles mundgerecht vor und lass jede Person frei kombinieren. Die Angaben unten gelten jeweils für ein Pfännchen – so könnt ihr neugierig probieren, ohne euch festzulegen.
            </p>
          </div>
          <aside className="guide-basics">
            <strong>Die entspannte Basis</strong>
            <ul>
              <li>200–250 g Käse pro Person</li>
              <li>250 g Kartoffeln pro Person</li>
              <li>3–5 Lieblingszutaten pro Gast</li>
              <li>Dips, Brot und etwas Frisches dazu</li>
            </ul>
          </aside>
        </div>
      </section>

      {chapters.map((chapter, chapterIndex) => {
        const startIndex = recipeOffsets[chapterIndex];
        return (
          <div key={chapter.id}>
            <section className={`recipe-chapter chapter-${chapter.tone}`} id={chapter.id} aria-labelledby={`${chapter.id}-title`}>
              <div className="site-width">
                <header className="recipe-chapter-heading">
                  <div><span>{chapter.number}</span><p>{chapter.label}</p></div>
                  <div><h2 id={`${chapter.id}-title`}>{chapter.title}</h2><p>{chapter.intro}</p></div>
                </header>
                <div className="recipe-grid">
                  {chapter.recipes.map((recipe, index) => (
                    <RecipeCard key={recipe.title} recipe={recipe} index={startIndex + index} />
                  ))}
                </div>
              </div>
            </section>

            {chapterIndex === 1 ? (
              <section className="guide-story-break" aria-labelledby="story-break-title">
                <div className="site-width guide-story-grid">
                  <figure>
                    <Image
                      alt="Raclette-Grill mit buntem Gemüse, Kartoffeln, Käse und vielen Händen am Tisch"
                      fill
                      sizes="(max-width: 860px) 100vw, 58vw"
                      src="/images/finder-raclette-table.png"
                    />
                  </figure>
                  <div>
                    <p className="section-number">Der schönste Teil</p>
                    <h2 id="story-break-title">Zwischen dem ersten und dem letzten Pfännchen passiert der Abend.</h2>
                    <p>Man reicht Schalen weiter, probiert beim Gegenüber und bleibt länger sitzen als geplant. Genau dafür sind diese Rezepte gemacht.</p>
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        );
      })}

      <section className="guide-safety" aria-labelledby="guide-safety-title">
        <div className="site-width guide-safety-grid">
          <div>
            <p className="section-number">Entspannt genießen</p>
            <h2 id="guide-safety-title">Vier kleine Vorbereitungen, die den Abend leichter machen.</h2>
          </div>
          <ol>
            <li><span>01</span><div><strong>Vorgaren</strong><p>Kartoffeln, Kürbis, Süßkartoffeln und Brokkoli vorher bissfest garen.</p></div></li>
            <li><span>02</span><div><strong>Getrennt arbeiten</strong><p>Für rohes Fleisch und Meeresfrüchte eigene Zangen, Bretter und Teller verwenden.</p></div></li>
            <li><span>03</span><div><strong>Sicher durchgaren</strong><p>Hähnchen und Garnelen vollständig garen; Fleisch nicht nur im Pfännchen erwärmen.</p></div></li>
            <li><span>04</span><div><strong>Langsam nachlegen</strong><p>Lieber kleine Portionen kühl aufbewahren und frische Schalen nach und nach auffüllen.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="guide-closing">
        <div className="site-width guide-closing-inner">
          <p>Jetzt fehlt nur noch das passende Gerät.</p>
          <h2>Für zwanzig Ideen und euren ganz eigenen Abend.</h2>
          <div>
            <Link className="button button-primary" href="/finder">Raclette finden <span aria-hidden="true">→</span></Link>
            <Link className="guide-closing-link" href="/vergleich">Geräte vergleichen</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
