import React from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../redux/reducers/Categories/selectors";
import { selectCurrentUser } from "../../redux/reducers/User/selector";
import { getCurrentTimeSlotFrance } from "../../_const";
import categoryAssets, { getCategoryLink } from "../../data/categories/categoryAssets";
import {
  CategoriesContainer,
  CategoryItem,
  CategoryTitle,
  IconWrapper,
  LinkContainer,
  ListContainer,
} from "./category-selector.style";

const CategorySelector = () => {
  const user = useSelector(selectCurrentUser);
  const allCategories = useSelector(selectCategories);
  const currentSlot = getCurrentTimeSlotFrance();

  const visibleCategories =
    user?.role === "isAdmin"
      ? allCategories
      : allCategories.filter((cat) => {
          const avail = cat.availableAt ?? "always";
          return cat.isVisible && (avail === "always" || avail === currentSlot);
        });

  return (
    <CategoriesContainer>
      <ListContainer>
        {visibleCategories.map((category) => {
          const assets = categoryAssets[category.slug];
          const link = getCategoryLink(category.slug);
          return (
            <LinkContainer to={link} key={category._id || category.slug}>
              <CategoryItem>
                <IconWrapper>
                  {assets?.logo ? (
                    <img
                      style={assets.style}
                      width={assets.widthCategorySelector}
                      src={assets.logo}
                      alt={category.name}
                    />
                  ) : assets?.icon ? (
                    assets.icon
                  ) : null}
                </IconWrapper>
                <CategoryTitle>{category.name}</CategoryTitle>
              </CategoryItem>
            </LinkContainer>
          );
        })}
      </ListContainer>
    </CategoriesContainer>
  );
};

export default CategorySelector;
