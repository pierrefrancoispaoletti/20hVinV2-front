import CategoriesActionTypes from "./types";

const INITIAL_STATE = {
  categories: [],
};

export const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CategoriesActionTypes.GET_CATEGORIES:
      return { ...state, categories: action.payload };

    case CategoriesActionTypes.ADD_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload] };

    case CategoriesActionTypes.UPDATE_CATEGORY: {
      const index = state.categories.findIndex(
        (cat) => cat._id === action.payload._id
      );
      const updated = [...state.categories];
      updated[index] = action.payload;
      return { ...state, categories: updated };
    }

    case CategoriesActionTypes.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (cat) => cat._id !== action.payload._id
        ),
      };

    case CategoriesActionTypes.REORDER_CATEGORIES:
      return { ...state, categories: action.payload };

    default:
      return state;
  }
};
