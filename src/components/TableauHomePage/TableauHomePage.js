import React, { useEffect, useRef } from "react";
import {
  TableauContainer,
  TableauWrapper,
  TableauTitle,
  TableauLegend,
} from "./tableau-homepage.style";
import { useLocation } from "react-router-dom";
import { categories } from "../../data/categories/categories";
import AddProductButton from "../AddProductButton/AddProductButton";
import ProductModal from "../ProductModal/ProductModal";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/reducers/User/selector";
import SubCategorySelector from "../SubCategorySelector/SubCategorySelector";
import { categoriesStyle2 } from "../../_const";

const TableauHomePage = ({ setFilter, children, filter }) => {
  const location = useLocation();
  let findCategory = categories.find(
    (category) => category.link === location.pathname,
  );
  const user = useSelector(selectCurrentUser);

  let prevlocationValueRef = useRef(null);
  useEffect(() => {
    prevlocationValueRef.current = location.pathname;
  });
  const prevlocationValue = prevlocationValueRef.current;

  return (
    <TableauContainer
      className='tableau-homepage'
      style2={categoriesStyle2.includes(findCategory?.slug)}
    >
      <TableauWrapper
        transition={prevlocationValue !== location.pathname}
        transitionType=''
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
        {findCategory?.subCategory && (
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
