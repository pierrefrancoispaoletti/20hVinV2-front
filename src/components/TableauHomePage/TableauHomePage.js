import React, { useEffect, useRef } from "react";
import {
  TableauContainer,
  TableauWrapper,
  TableauTitle,
  TableauLegend,
} from "./tableau-homepage.style";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCategories } from "../../redux/reducers/Categories/selectors";
import { getCategoryLink } from "../../data/categories/categoryAssets";
import AddProductButton from "../AddProductButton/AddProductButton";
import ProductModal from "../ProductModal/ProductModal";
import { selectCurrentUser } from "../../redux/reducers/User/selector";
import SubCategorySelector from "../SubCategorySelector/SubCategorySelector";
import { categoriesStyle2 } from "../../_const";

const TableauHomePage = ({ setFilter, children, filter }) => {
  const location = useLocation();
  const allCategories = useSelector(selectCategories);
  const user = useSelector(selectCurrentUser);

  const findCategory = allCategories.find(
    (cat) => getCategoryLink(cat.slug) === location.pathname,
  );

  let prevlocationValueRef = useRef(null);
  useEffect(() => {
    prevlocationValueRef.current = location.pathname;
  });
  const prevlocationValue = prevlocationValueRef.current;
  return (
    <TableauContainer
      className="tableau-homepage"
      style2={categoriesStyle2.includes(findCategory?.slug)}
    >
      <TableauWrapper
        transition={prevlocationValue !== location.pathname}
        transitionType=""
      >
        <TableauTitle>{findCategory?.title ?? findCategory?.name}</TableauTitle>
        {/* {findCategory?.logo && (
          <img
            width={findCategory?.width}
            src={findCategory?.logo}
            alt={findCategory?.alt}
          />
        )} */}
        <TableauLegend>{findCategory?.legend}</TableauLegend>
        {findCategory?.subCategory?.length > 0 && (
          <SubCategorySelector
            filter={filter}
            findCategory={findCategory}
            setFilter={setFilter}
          />
        )}
        {user && user.role === "isAdmin" && (
          <div style={{ position: "relative" }}>
            <AddProductButton />
            <ProductModal
              style={{ position: "fixed" }}
              currentCategory={findCategory?.slug}
            />
          </div>
        )}
        {children}
      </TableauWrapper>
    </TableauContainer>
  );
};

export default TableauHomePage;
