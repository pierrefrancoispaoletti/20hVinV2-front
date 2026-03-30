import CategoriesActionTypes from "./types";

export const getCategoriesAction = ({ categories }) => ({
  type: CategoriesActionTypes.GET_CATEGORIES,
  payload: categories,
});

export const addCategoryAction = (category) => ({
  type: CategoriesActionTypes.ADD_CATEGORY,
  payload: category,
});

export const updateCategoryAction = (category) => ({
  type: CategoriesActionTypes.UPDATE_CATEGORY,
  payload: category,
});

export const deleteCategoryAction = (category) => ({
  type: CategoriesActionTypes.DELETE_CATEGORY,
  payload: category,
});

export const reorderCategoriesAction = ({ categories }) => ({
  type: CategoriesActionTypes.REORDER_CATEGORIES,
  payload: categories,
});
