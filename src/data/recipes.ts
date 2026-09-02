export type RecipeCategory =
  | "Klassiker"
  | "Italien & Mittelmeer"
  | "Mexiko"
  | "Comfort Food"
  | "Weltreise"
  | "Fisch & Meer"
  | "Vegetarisch & vegan"
  | "Dessert";

export type Recipe = {
  number: number;
  title: string;
  slug: string;
  category: RecipeCategory;
  tagline: string;
  description: string;
  ingredients: string[];
  steps: string[];
  image: string;
  imageAlt: string;
  preparationTime: string;
  cookingTime: string;
};

type RecipeSeed = [title: string, category: RecipeCategory, ingredients: string];

const seeds: RecipeSeed[] = [
  ["Klassisches Raclette", "Klassiker", "3–4 gekochte Kartoffelscheiben|2 Cornichons|3 Silberzwiebeln|2 Scheiben Raclettekäse|schwarzer Pfeffer"],
  ["Elsässer Pfännchen", "Klassiker", "3 Kartoffelscheiben|25 g Speckwürfel|einige Zwiebelringe|2 Scheiben Raclettekäse|Schnittlauch"],
  ["Schweizer Alpen-Pfännchen", "Klassiker", "1 kleines Rösti|3 Champignons|30 g Schinken|2 Scheiben Raclettekäse|Petersilie"],
  ["Bauernfrühstück-Raclette", "Klassiker", "4 Bratkartoffelscheiben|1 kleines Ei|25 g Speck|1 Frühlingszwiebel|1 Scheibe Raclettekäse"],
  ["Käsespätzle-Pfännchen", "Klassiker", "80 g gekochte Spätzle|35 g Bergkäse|1 EL Röstzwiebeln|Schnittlauch|eine Prise Muskat"],
  ["Schnitzel-Raclette", "Klassiker", "60 g gegarte Schnitzelstreifen|2 Paprikastreifen|2 Champignons|2 Scheiben Raclettekäse|Petersilie"],
  ["Currywurst-Pfännchen", "Klassiker", "½ gebratene Bratwurst|2 EL Curryketchup|einige Zwiebelringe|30 g Gouda|Currypulver"],
  ["Leberkäse-Raclette", "Klassiker", "60 g gebratener Leberkäse|3 Kartoffelscheiben|1 kleines Ei|1 Scheibe Raclettekäse|Schnittlauch"],
  ["Bratwurst-Apfel-Pfännchen", "Klassiker", "½ gebratene Bratwurst|4 dünne Apfelspalten|1 TL körniger Senf|30 g Bergkäse|Thymian"],
  ["Flammkuchen-Raclette", "Klassiker", "1 Stück dünnes Fladenbrot|1 EL Crème fraîche|25 g Speck|rote Zwiebel|30 g Bergkäse"],
  ["Pizza Margherita", "Italien & Mittelmeer", "1 kleiner Pizzaboden|2 EL Tomatensauce|4 Kirschtomaten|40 g Mozzarella|Basilikum"],
  ["Pizza Salami", "Italien & Mittelmeer", "1 kleiner Pizzaboden|2 EL Tomatensauce|4 Salamischeiben|40 g Mozzarella|Oregano"],
  ["Pizza Hawaii", "Italien & Mittelmeer", "1 kleiner Pizzaboden|2 EL Tomatensauce|30 g Kochschinken|3 Ananasstücke|40 g Gouda"],
  ["Pizza Funghi", "Italien & Mittelmeer", "1 kleiner Pizzaboden|2 EL Tomatensauce|4 Champignons|40 g Mozzarella|Oregano"],
  ["Calzone-Pfännchen", "Italien & Mittelmeer", "1 Stück Pizzateig|25 g Schinken|2 Champignons|35 g Mozzarella|1 EL Tomatensauce"],
  ["Lasagne-Raclette", "Italien & Mittelmeer", "2 kleine gegarte Nudelplatten|3 EL Bolognese|1 EL Béchamelsauce|35 g Mozzarella|Parmesan"],
  ["Carbonara-Pfännchen", "Italien & Mittelmeer", "80 g gekochte Pasta|25 g gebratener Speck|1 Eigelb|1 EL Sahne|20 g Parmesan"],
  ["Pesto-Pasta-Raclette", "Italien & Mittelmeer", "80 g gekochte Pasta|1 EL grünes Pesto|4 Kirschtomaten|35 g Mozzarella|Pinienkerne"],
  ["Gnocchi Caprese", "Italien & Mittelmeer", "80 g gegarte Gnocchi|4 Kirschtomaten|40 g Mozzarella|1 TL Pesto|Basilikum"],
  ["Tortellini-Pfännchen", "Italien & Mittelmeer", "80 g gegarte Käsetortellini|2 EL Tomatensauce|eine Handvoll Spinat|20 g Parmesan|Basilikum"],
  ["Gyros-Raclette", "Italien & Mittelmeer", "70 g durchgegartes Gyros|rote Zwiebel|3 Paprikastreifen|1 EL Tzatziki|35 g Gouda"],
  ["Souvlaki-Pfännchen", "Italien & Mittelmeer", "70 g durchgegartes Hähnchen|3 Oliven|4 Kirschtomaten|30 g Feta|Oregano"],
  ["Moussaka-Raclette", "Italien & Mittelmeer", "3 vorgegarte Auberginenscheiben|3 Kartoffelscheiben|3 EL Hackfleischsauce|30 g Käse|Oregano"],
  ["Mediterranes Gemüse-Pfännchen", "Italien & Mittelmeer", "3 Zucchinischeiben|3 Paprikastreifen|2 Auberginenscheiben|3 Oliven|30 g Feta"],
  ["Tomate-Mozzarella-Raclette", "Italien & Mittelmeer", "1 große Tomate|50 g Mozzarella|Basilikum|1 TL Olivenöl|Balsamicocreme"],
  ["Antipasti-Pfännchen", "Italien & Mittelmeer", "gegrillte Paprika|2 Artischockenherzen|4 Oliven|20 g Parmesan|italienische Kräuter"],
  ["Parma-Pfännchen", "Italien & Mittelmeer", "3 Kartoffelscheiben|2 Scheiben Parmaschinken|1 kleine Feige|30 g Gorgonzola|Rucola"],
  ["Bruschetta-Raclette", "Italien & Mittelmeer", "2 Baguettescheiben|1 gewürfelte Tomate|½ Knoblauchzehe|35 g Mozzarella|Basilikum"],
  ["Vier-Käse-Pfännchen", "Italien & Mittelmeer", "3 Kartoffelscheiben|20 g Mozzarella|15 g Gorgonzola|15 g Parmesan|20 g Gouda"],
  ["Ravioli-Raclette", "Italien & Mittelmeer", "5 gegarte Ravioli|2 EL Tomatensauce|1 EL Ricotta|20 g Parmesan|Basilikum"],
  ["Taco-Pfännchen", "Mexiko", "50 g durchgegartes Hackfleisch|2 EL Mais|2 EL Kidneybohnen|1 EL Salsa|35 g Cheddar"],
  ["Nacho-Raclette", "Mexiko", "1 Handvoll Tortillachips|4 Jalapeñoringe|4 Kirschtomaten|1 Frühlingszwiebel|40 g Cheddar"],
  ["Burrito-Pfännchen", "Mexiko", "3 EL gekochter Reis|40 g durchgegartes Hackfleisch|2 EL Kidneybohnen|2 EL Mais|35 g Cheddar"],
  ["Quesadilla-Raclette", "Mexiko", "2 kleine Tortillastücke|50 g gegartes Hähnchen|3 Paprikastreifen|40 g Cheddar|1 EL Salsa"],
  ["Chili-con-Carne-Raclette", "Mexiko", "5 EL Chili con Carne|35 g Cheddar|1 EL Sour Cream|Frühlingszwiebel|Tortillachips"],
  ["Fajita-Pfännchen", "Mexiko", "60 g gegarte Hähnchenstreifen|Paprika|Zwiebel|35 g Cheddar|Fajita-Gewürz"],
  ["Jalapeño-Popper-Pfännchen", "Mexiko", "2 große Jalapeños|2 EL Frischkäse|35 g Cheddar|1 EL Semmelbrösel|Frühlingszwiebel"],
  ["Mexikanische Süßkartoffel", "Mexiko", "80 g vorgegarte Süßkartoffel|2 EL schwarze Bohnen|2 EL Mais|1 EL Salsa|35 g Cheddar"],
  ["Enchilada-Raclette", "Mexiko", "2 kleine Tortillaröllchen|50 g gegartes Hähnchen|2 EL Enchiladasauce|40 g Cheddar|Koriander"],
  ["Guacamole-Nacho-Pfännchen", "Mexiko", "1 Handvoll Nachos|40 g Cheddar|4 Jalapeñoringe|2 EL Guacamole|1 EL Tomatensalsa"],
  ["Cheeseburger-Pfännchen", "Comfort Food", "1 durchgegartes Mini-Patty|2 Gewürzgurkenscheiben|Zwiebel|1 EL Burgersauce|35 g Cheddar"],
  ["BBQ-Bacon-Burger", "Comfort Food", "1 durchgegartes Mini-Patty|2 Streifen Bacon|1 EL BBQ-Sauce|1 EL Röstzwiebeln|35 g Cheddar"],
  ["Hotdog-Raclette", "Comfort Food", "½ gebratenes Würstchen|Gewürzgurke|1 EL Röstzwiebeln|1 TL Senf|30 g Gouda"],
  ["Pulled-Pork-Pfännchen", "Comfort Food", "70 g heißes Pulled Pork|1 EL BBQ-Sauce|2 EL Mais|35 g Cheddar|Frühlingszwiebel"],
  ["Mac-and-Cheese-Raclette", "Comfort Food", "90 g gekochte Makkaroni|3 EL Käsesauce|30 g Cheddar|1 EL Semmelbrösel|Petersilie"],
  ["Buffalo-Chicken-Pfännchen", "Comfort Food", "70 g gegartes Hähnchen|1 EL Buffalo-Sauce|1 Frühlingszwiebel|25 g Blauschimmelkäse|Sellerie"],
  ["Philly-Cheesesteak-Raclette", "Comfort Food", "70 g gegarte Rindfleischstreifen|Paprika|Zwiebel|40 g Schmelzkäse|Petersilie"],
  ["Club-Sandwich-Pfännchen", "Comfort Food", "2 Toastwürfel|50 g gegartes Hähnchen|2 Streifen Bacon|2 Tomatenscheiben|35 g Käse"],
  ["BBQ-Mais-Pfännchen", "Comfort Food", "5 EL Mais|1 EL BBQ-Sauce|rote Zwiebel|35 g Cheddar|Petersilie"],
  ["Loaded-Potato-Raclette", "Comfort Food", "1 kleine Ofenkartoffel|25 g Bacon|1 EL Sour Cream|1 Frühlingszwiebel|40 g Cheddar"],
  ["Teriyaki-Hähnchen", "Weltreise", "70 g gegartes Hähnchen|3 Ananasstücke|3 Paprikastreifen|1 EL Teriyakisauce|Sesam"],
  ["Asia-Lachs-Pfännchen", "Weltreise", "70 g gegarter Lachs|1 TL Sojasauce|1 Frühlingszwiebel|Sesam|Limettensaft"],
  ["Sushi-Raclette", "Weltreise", "4 EL Sushireis|50 g gegarter Lachs|¼ Avocado|4 Gurkenstreifen|1 TL Sriracha-Mayonnaise"],
  ["Thai-Curry-Pfännchen", "Weltreise", "60 g gegartes Hähnchen|4 EL Gemüse|2 EL Kokosmilch|½ TL rote Currypaste|Koriander"],
  ["Erdnuss-Hähnchen-Raclette", "Weltreise", "70 g gegartes Hähnchen|Paprika|1 EL Erdnusssauce|1 EL Erdnüsse|Koriander"],
  ["Gebratener-Reis-Pfännchen", "Weltreise", "5 EL gekochter Reis|1 kleines Ei|2 EL Erbsen|2 EL Karotten|1 TL Sojasauce"],
  ["Koreanisches BBQ-Raclette", "Weltreise", "70 g gegartes mariniertes Rind|2 EL Kimchi|1 Frühlingszwiebel|Sesam|30 g Käse"],
  ["Sweet-Chili-Garnelen", "Weltreise", "6 durchgegarte Garnelen|1 EL Sweet-Chili-Sauce|½ Knoblauchzehe|Limettensaft|Koriander"],
  ["Tofu-Teriyaki-Pfännchen", "Weltreise", "70 g gebratener Tofu|4 Brokkoliröschen|Paprika|1 EL Teriyakisauce|Sesam"],
  ["Mango-Curry-Raclette", "Weltreise", "60 g gegartes Hähnchen oder Tofu|¼ Mango|2 EL Kokosmilch|½ TL Currypaste|Koriander"],
  ["Lachs-Spinat-Pfännchen", "Fisch & Meer", "70 g gegarter Lachs|eine Handvoll Blattspinat|1 EL Sahne|½ Knoblauchzehe|30 g Käse"],
  ["Garnelen-Knoblauch-Raclette", "Fisch & Meer", "6 durchgegarte Garnelen|1 TL Knoblauchbutter|4 Kirschtomaten|20 g Parmesan|Petersilie"],
  ["Thunfisch-Pfännchen", "Fisch & Meer", "60 g Thunfisch|rote Zwiebel|2 EL Mais|4 Kirschtomaten|35 g Mozzarella"],
  ["Fischstäbchen-Raclette", "Fisch & Meer", "2 gegarte Fischstäbchen|1 EL Remoulade|2 Gewürzgurkenscheiben|30 g Gouda|Dill"],
  ["Flamm-Lachs-Raclette", "Fisch & Meer", "1 Stück Fladenbrot|1 EL Crème fraîche|50 g Räucherlachs|1 Frühlingszwiebel|Dill"],
  ["Meeresfrüchte-Pfännchen", "Fisch & Meer", "80 g durchgegarte Meeresfrüchte|½ Knoblauchzehe|4 Kirschtomaten|1 EL Weißweinsauce|Petersilie"],
  ["Lachs-Honig-Senf-Raclette", "Fisch & Meer", "70 g gegarter Lachs|1 TL Honig|1 TL Senf|Dill|3 Kartoffelscheiben"],
  ["Garnelen-Ananas-Pfännchen", "Fisch & Meer", "6 durchgegarte Garnelen|3 Ananasstücke|Chiliflocken|30 g Gouda|Limettensaft"],
  ["Krabben-Rührei-Raclette", "Fisch & Meer", "50 g Krabben|1 kleines Ei|1 EL Sahne|Schnittlauch|schwarzer Pfeffer"],
  ["Mediterraner Thunfisch", "Fisch & Meer", "60 g Thunfisch|4 Oliven|1 TL Kapern|4 Kirschtomaten|30 g Feta"],
  ["Brokkoli-Cheddar-Pfännchen", "Vegetarisch & vegan", "5 vorgegarte Brokkoliröschen|40 g Cheddar|1 EL Mandelblättchen|Pfeffer|Muskat"],
  ["Ziegenkäse-Honig-Raclette", "Vegetarisch & vegan", "50 g Ziegenkäse|4 Birnenspalten|1 EL Walnüsse|1 TL Honig|Thymian"],
  ["Spinat-Feta-Pfännchen", "Vegetarisch & vegan", "eine Handvoll Blattspinat|40 g Feta|½ Knoblauchzehe|1 EL Pinienkerne|Pfeffer"],
  ["Pilzrahm-Raclette", "Vegetarisch & vegan", "80 g gemischte Pilze|1 EL Sahne|Kräuter|35 g Bergkäse|Pfeffer"],
  ["Kürbis-Gorgonzola-Pfännchen", "Vegetarisch & vegan", "80 g vorgegarter Kürbis|30 g Gorgonzola|1 EL Walnüsse|Salbei|Pfeffer"],
  ["Rote-Bete-Ziegenkäse-Raclette", "Vegetarisch & vegan", "70 g gegarte Rote Bete|40 g Ziegenkäse|1 EL Walnüsse|1 TL Honig|Thymian"],
  ["Falafel-Pfännchen", "Vegetarisch & vegan", "2 gegarte Falafel|4 Kirschtomaten|Paprika|30 g Feta|1 EL Tahinsauce"],
  ["Halloumi-Gemüse-Raclette", "Vegetarisch & vegan", "60 g Halloumi|3 Zucchinischeiben|3 Paprikastreifen|4 Kirschtomaten|Kräuter"],
  ["Veggie-Burger-Pfännchen", "Vegetarisch & vegan", "1 gegartes Gemüsepatty|2 Gurkenscheiben|2 Tomatenscheiben|1 EL Burgersauce|35 g Käse"],
  ["Kartoffel-Lauch-Raclette", "Vegetarisch & vegan", "4 Kartoffelscheiben|½ kleine Lauchstange|1 EL Crème fraîche|40 g Bergkäse|Muskat"],
  ["Veganer Klassiker", "Vegetarisch & vegan", "4 Kartoffelscheiben|2 Cornichons|3 Silberzwiebeln|40 g veganer Raclettekäse|schwarzer Pfeffer"],
  ["Veganes Chili-Pfännchen", "Vegetarisch & vegan", "3 EL Kidneybohnen|2 EL Mais|3 EL Tomaten|40 g veganes Hack|35 g veganer Käse"],
  ["Vegane Pizza", "Vegetarisch & vegan", "1 kleiner Pizzaboden|2 EL Tomatensauce|4 EL Gemüse|40 g veganer Mozzarella|Oregano"],
  ["Curry-Kichererbsen-Raclette", "Vegetarisch & vegan", "5 EL Kichererbsen|2 EL Kokosmilch|½ TL Curry|eine Handvoll Spinat|4 Kirschtomaten"],
  ["Süßkartoffel-Avocado-Pfännchen", "Vegetarisch & vegan", "80 g vorgegarte Süßkartoffel|2 EL schwarze Bohnen|2 EL Mais|¼ Avocado|Limettensaft"],
  ["Veganes Gyros-Raclette", "Vegetarisch & vegan", "70 g gegartes veganes Gyros|Zwiebel|Paprika|40 g veganer Käse|Oregano"],
  ["Mediterranes Tofu-Pfännchen", "Vegetarisch & vegan", "70 g gebratener Tofu|4 Oliven|4 Kirschtomaten|3 Zucchinischeiben|30 g veganer Feta"],
  ["Linsen-Bolognese-Raclette", "Vegetarisch & vegan", "80 g gekochte Nudeln|4 EL Linsen-Bolognese|35 g veganer Käse|Basilikum|Pfeffer"],
  ["Veganer Flammkuchen", "Vegetarisch & vegan", "1 Stück Fladenbrot|1 EL vegane Crème fraîche|30 g Räuchertofu|rote Zwiebel|Schnittlauch"],
  ["Kimchi-Tofu-Pfännchen", "Vegetarisch & vegan", "70 g gebratener Tofu|2 EL Kimchi|1 Frühlingszwiebel|Sesam|30 g veganer Käse"],
  ["Apfel-Zimt-Pfännchen", "Dessert", "1 kleiner Apfel|½ TL Zimt|1 TL brauner Zucker|1 TL Butter|1 EL Vanillesauce"],
  ["Banane-Schokolade-Raclette", "Dessert", "1 kleine Banane|30 g Schokolade|1 EL gehackte Nüsse|1 TL Kokosraspel|eine Prise Salz"],
  ["Marshmallow-Keks-Pfännchen", "Dessert", "3 Butterkekse|25 g Schokolade|4 Mini-Marshmallows|1 TL Nüsse|eine Prise Salz"],
  ["Birne-Nougat-Raclette", "Dessert", "½ reife Birne|30 g Nougat|1 EL Haselnüsse|eine Prise Zimt|1 TL Butter"],
  ["Kaiserschmarrn-Pfännchen", "Dessert", "4 EL Kaiserschmarrnteig|1 TL Rosinen|1 TL Butter|Puderzucker|Apfelmus"],
  ["Cheesecake-Raclette", "Dessert", "2 Butterkekse|60 g Frischkäse|1 TL Zucker|Vanille|1 EL Beeren"],
  ["Crêpe-Pfännchen", "Dessert", "4 EL Crêpeteig|1 TL Butter|20 g Schokolade|½ Banane|Puderzucker"],
  ["Bratapfel-Raclette", "Dessert", "1 kleiner Apfel|20 g Marzipan|1 EL Mandeln|1 TL Rosinen|½ TL Zimt"],
  ["Ananas-Kokos-Pfännchen", "Dessert", "5 Ananasstücke|1 EL Kokosraspel|25 g weiße Schokolade|Limettenabrieb|1 TL Butter"],
  ["Beeren-Crumble-Raclette", "Dessert", "80 g gemischte Beeren|2 EL Haferflocken|1 TL Butter|1 TL brauner Zucker|1 EL Mandelblättchen"],
];

const taglines = [
  "Herzhaft, unkompliziert und wie gemacht für einen langen Abend.",
  "Ein kleines Pfännchen mit überraschend großem Geschmack.",
  "Schnell vorbereitet, goldbraun überbacken und sofort geliebt.",
  "Diese Kombination bringt Abwechslung auf den Raclette-Tisch.",
  "Einfach belegen, schmelzen lassen und gemeinsam genießen.",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function stepsFor(title: string, category: RecipeCategory, ingredients: string[]) {
  if (category === "Dessert") {
    return [
      `${ingredients.slice(0, 2).join(" und ")} mundgerecht vorbereiten. Das Pfännchen dünn mit Butter ausstreichen.`,
      "Die Hauptzutaten ins Pfännchen geben und unter dem Grill langsam erhitzen, bis Obst oder Teig weich und leicht gebräunt sind.",
      `Mit ${ingredients.slice(-2).join(" und ")} vollenden und noch warm servieren.`,
    ];
  }

  const needsGrill = /Hähnchen|Rind|Hack|Patty|Wurst|Schnitzel|Leberkäse|Gyros|Garnelen|Meeresfrüchte|Fischstäbchen|Halloumi|Tofu/i.test(
    ingredients.join(" "),
  );

  return [
    "Alle Zutaten mundgerecht schneiden. Kartoffeln, festes Gemüse, Nudeln und Reis bei Bedarf vorher bissfest garen.",
    needsGrill
      ? "Fleisch, Fisch, Halloumi oder Tofu zuerst auf der Grillplatte vollständig garen und erst danach ins Pfännchen geben."
      : "Die festen Zutaten kurz auf der Grillplatte anrösten oder direkt gleichmäßig im Pfännchen verteilen.",
    `Mit den übrigen Zutaten belegen und unter dem Grill goldbraun erhitzen. ${title} am besten sofort genießen.`,
  ];
}

export const recipes: Recipe[] = seeds.map(([title, category, ingredientText], index) => {
  const ingredients = ingredientText.split("|");
  const recipeNumber = String(index + 1).padStart(3, "0");
  return {
    number: index + 1,
    title,
    slug: slugify(title),
    category,
    tagline: taglines[index % taglines.length],
    description: `${title} ist eine einfache Raclette-Idee mit ${ingredients.slice(0, 3).join(", ")}. Zutaten, Zubereitung und Tipps für dein nächstes Pfännchen.`,
    ingredients,
    steps: stepsFor(title, category, ingredients),
    image: `/images/recipe-blog/unique/${recipeNumber}.webp`,
    imageAlt: `${title} frisch zubereitet im Raclette-Pfännchen`,
    preparationTime: "10 Minuten",
    cookingTime: "8 Minuten",
  };
});

export const recipeCategories = [...new Set(recipes.map((recipe) => recipe.category))];

export function getRecipe(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug);
}
