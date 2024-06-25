const logoSmall = "20px";
export const categories = [
  {
    name: "Pizze Al Forno",
    link: "/",
    slug: "pizze",
  },
  {
    name: "La Cuisine",
    title: "La Cuisine",
    link: "/products/cuisine",
    slug: "cuisine",
    subCategory: [
      { name: "Antipasti", slug: "antipasti" },
      { name: "Pesce", slug: "pesce" },
      { name: "Pasta", slug: "pasta" },
      { name: "Carne", slug: "carne" },
    ],
  },
  {
    name: "Dolce",
    title: "Dolce",
    link: "/products/dolce",
    slug: "dolce",
  },
  {
    name: "Les Boissons",
    link: "/products/boissons",
    slug: "boissons",
    subCategory: [
      { name: "Apéritifs", slug: "aperitifs" },
      { name: "Eaux", slug: "eaux" },
      { name: "Softs", slug: "softs" },
    ],
  },
  {
    name: "Les Cocktails",
    link: "/products/cocktails",
    slug: "cocktails",
    subCategory: [
      { name: "Cocktails Classiques", slug: "cocktails-classiques" },
      { name: "Cocktails Création", slug: "cocktails-creations" },
    ],
  },
  {
    name: "Les Spiritueux",
    link: "/products/spiritueux",
    slug: "spiritueux",
    subCategory: [
      { name: "Gin", slug: "gins" },
      { name: "Rhum", slug: "rhum" },
      { name: "Vodka", slug: "vodka" },
      { name: "Whisky", slug: "whisky" },
      { name: "Autres", slug: "autres" },
    ],
  },
  {
    name: "La Vinothéque",
    link: "/products/cave",
    slug: "cave",
    subCategory: [
      { name: "Vins Corse", slug: "vins-corse" },
      { name: "Vins Français", slug: "vins-fr" },
      { name: "Vins du monde", slug: "vins-mnd" },
      { name: "Champagnes", slug: "champagnes" },
    ],
  },
  // {
  //   name: "Vitrine Salée",
  //   // icon: <FontAwesomeIcon icon={faSandwich} size="2x" />,
  //   link: "/products/la-vitrine-salee",
  //   slug: "la-vitrine-salee",
  //   subCategory: [
  //     { name: "Panini", slug: "panini" },
  //     { name: "Croques", slug: "croques" },
  //     { name: "Hot-dog", slug: "hotdog" },
  //     { name: "Bagels", slug: "bagels" },
  //   ],
  // },
  // {
  //   name: "Vitrine Sucrée",
  //   // icon: <FontAwesomeIcon icon={faCookie} size="2x" />,
  //   link: "/products/la-vitrine-sucree",
  //   slug: "la-vitrine-sucree",
  // },
];
