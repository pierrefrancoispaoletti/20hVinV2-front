export const filteredProductsList = (actionType, state, payload) => {
  switch (actionType) {
    case "ADD_PRODUCT":
      return [...state.products, { ...payload }];
    case "DELETE_PRODUCT":
      return state.products.filter((product) => product._id !== payload._id);
    case "UPDATE_PRODUCT": {
      let index = state.products.findIndex(
        (product) => product._id === payload._id
      );
      let update = [...state.products];
      update[index] = payload;
      return [...update];
    }
    default:
      return state.products;
  }
};

export const findSubCategoryName = (product, categories = []) => {
  let scSlug;
  let scLegend;
  let categoryName = categories
    .map(
      (category) =>
        category?.slug === product?.category &&
        category?.subCategory?.find((sc) => {
          if (sc?.slug === product?.subCategory) {
            scSlug = sc?.slug;
          }
          if (sc?.legend) scLegend = sc?.legend;
          return sc?.slug === product?.subCategory;
        })
    )
    .filter((p) => p)[0]?.name;
  return (
    <span className={`subcategory ${scSlug}`}>
      {categoryName} <span className="subcategory-legend">{scLegend}</span>
    </span>
  );
};
