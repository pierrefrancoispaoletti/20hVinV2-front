import { createSelector } from "reselect";

const selectCategoriesRoot = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesRoot],
  ({ categories }) => categories
);

export const selectCategoryBySlug = (slug) =>
  createSelector([selectCategories], (categories) =>
    categories.find((cat) => cat.slug === slug)
  );
