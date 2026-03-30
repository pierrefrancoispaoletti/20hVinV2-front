// Mapping slug → assets visuels (ce qui ne peut pas être stocké en base)
// Les champs de données (name, availableAt, subCategory…) sont dans MongoDB.
const categoryAssets = {};

export const getCategoryLink = (slug) =>
  slug === "suggestions" ? "/" : `/products/${slug}`;

export default categoryAssets;
