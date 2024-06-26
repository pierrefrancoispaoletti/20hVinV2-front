import React from "react";
import { categories } from "../../data/categories/categories";
import {
  CategoriesContainer,
  CategoryItem,
  CategoryTitle,
  IconWrapper,
  LinkContainer,
  ListContainer,
} from "./category-selector.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CategorySelector = () => {
  return (
    <CategoriesContainer>
      <ListContainer>
        {categories.map((category) => (
          <LinkContainer
            to={category.link}
            key={category.name}
          >
            <CategoryItem>
              <IconWrapper>
                {category?.icon ? (
                  <FontAwesomeIcon
                    icon={category.icon}
                    color='white'
                    size='3x'
                  />
                ) : (
                  <span></span>
                )}
              </IconWrapper>
              <CategoryTitle>{category.name}</CategoryTitle>
            </CategoryItem>
          </LinkContainer>
        ))}
      </ListContainer>
    </CategoriesContainer>
  );
};

export default CategorySelector;
