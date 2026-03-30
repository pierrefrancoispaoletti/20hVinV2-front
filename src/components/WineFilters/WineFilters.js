import React from "react";
import {
  PriceSortContainer,
  SortGroup,
  SortBtn,
  ColorFilterContainer,
  ColorFilterBtn,
  ColorDot,
} from "./wine-filters.style";

export const PriceSortBar = ({ priceSort, setPriceSort }) => {
  const handleSortClick = (sort) => {
    setPriceSort((prev) => (prev === sort ? null : sort));
  };

  return (
    <PriceSortContainer>
      <SortGroup>
        <SortBtn
          active={priceSort === "asc"}
          onClick={() => handleSortClick("asc")}
        >
          Prix ↑
        </SortBtn>
        <SortBtn
          active={priceSort === "desc"}
          onClick={() => handleSortClick("desc")}
        >
          Prix ↓
        </SortBtn>
      </SortGroup>
    </PriceSortContainer>
  );
};

export const WineColorFilter = ({ wineColorFilter, setWineColorFilter }) => {
  const handleColorClick = (color) => {
    setWineColorFilter((prev) => (prev === color ? null : color));
  };

  return (
    <ColorFilterContainer>
      <ColorFilterBtn
        active={!wineColorFilter}
        onClick={() => setWineColorFilter(null)}
      >
        Tous
      </ColorFilterBtn>
      <ColorFilterBtn
        active={wineColorFilter === "rouge"}
        onClick={() => handleColorClick("rouge")}
      >
        <ColorDot color="#742f37" />
        Rouge
      </ColorFilterBtn>
      <ColorFilterBtn
        active={wineColorFilter === "blanc"}
        onClick={() => handleColorClick("blanc")}
      >
        <ColorDot color="#d4c44a" />
        Blanc
      </ColorFilterBtn>
      <ColorFilterBtn
        active={wineColorFilter === "rosé"}
        onClick={() => handleColorClick("rosé")}
      >
        <ColorDot color="#ffb9b9" />
        Rosé
      </ColorFilterBtn>
    </ColorFilterContainer>
  );
};
