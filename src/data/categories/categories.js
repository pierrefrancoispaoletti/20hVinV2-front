import { faWineBottle, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoBagel from "../../assets/images/bagel.png";
import logoSalade from "../../assets/images/salade.png";
import logoVin from "../../assets/images/vin.png";
import logoBoissons from "../../assets/images/boissons.png";
const logoSmall = "20px";
export const categories = [
  {
    name: "Evenements",
    title: "Événements",
    link: "/products/evenements",
    slug: "evenements",
    availableAt: "always",
  },
  {
    name: "Suggestions",
    link: "/",
    slug: "suggestions",
    availableAt: "always",
  },
  {
    name: "Créations",
    title: "Nos créations",
    link: "/products/creations",
    slug: "creations",
    availableAt: "always",
  },
  {
    name: "Côté Apéro",
    legend: "( à partager... ou pas ... )",
    link: "/products/apero",
    slug: "apero",
    availableAt: "midi",
  },
  {
    name: "Menus",
    title: "Nos menus",
    link: "/products/menus",
    slug: "menus",
    availableAt: "soir",
    subCategory: [
      { name: "Menu enfant", slug: "enfant" },
      { name: "Menus Corse", slug: "corse" },
    ],
  },
  {
    name: "Entrées",
    title: "Entrées",
    link: "/products/entrees",
    slug: "entrees",
    availableAt: "always",
  },
  {
    name: "Pâtes",
    title: "Pâtes",
    link: "/products/pates",
    slug: "pates",
    availableAt: "always",
  },
  {
    name: "Nos Gnocchi",
    title: "Gnocchi",
    link: "/products/gnocchi",
    slug: "gnocchi",
    availableAt: "always",
  },
  // {
  //   name: "Nos Risotto",
  //   title: "Risotto",
  //   link: "/products/risotto",
  //   slug: "risotto",
  // },
  {
    name: "Pizza",
    title: "Pizza",
    link: "/products/pizza",
    slug: "pizza",
    availableAt: "always",
  },
  // {
  //   name: "Nos Poissons",
  //   title: "Poissons",
  //   link: "/products/poissons",
  //   slug: "poissons",
  // },
  // {
  //   name: "Nos Viandes",
  //   title: "Viandes",
  //   link: "/products/viandes",
  //   slug: "viandes",
  // },
  {
    name: "Nos Douceurs",
    title: "Les douceurs",
    link: "/products/douceurs",
    slug: "douceurs",
    availableAt: "always",
    subCategory: [
      { name: "Pizzas sucrées", slug: "pizzas-sucrees" },
      { name: "Desserts", slug: "desserts" },
    ],
  },
  {
    name: "Softs et boissons chaudes",
    link: "/products/softs",
    slug: "softs",
    availableAt: "always",
  },
  {
    name: "Cocktails",
    link: "/products/cocktails",
    slug: "cocktails",
    availableAt: "soir",
    subCategory: [
      { name: "Cocktails", slug: "cocktails-a" },
      { name: "Sans-alcool", slug: "cocktails-b" },
    ],
  },
  {
    name: "Alcools",
    link: "/products/alcools",
    slug: "alcools",
    availableAt: "always",
    subCategory: [
      { name: "Apéritifs", slug: "aperitifs" },
      { name: "Bières", slug: "bieres" },
      { name: "Digestifs", slug: "digestifs" },
    ],
  },
  {
    name: "La Cave",
    link: "/products/cave",
    slug: "cave",
    availableAt: "always",
    subCategory: [
      { name: "Vins Corse", slug: "vins-corse" },
      { name: "Vins Français", slug: "vins-fr" },
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
  {
    name: "Evenements",
    title: "Événements",
    link: "/products/evenements",
    slug: "evenements",
    availableAt: "always",
  },
];
