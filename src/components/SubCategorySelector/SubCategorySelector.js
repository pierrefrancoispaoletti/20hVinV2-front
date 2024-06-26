import React, { useEffect, useState } from "react";
import {
  OpenSubMenuChevron,
  SubCategoryFilterContainer,
} from "../TableauHomePage/tableau-homepage.style";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const SubCategorySelector = ({ filter, findCategory, setFilter }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (findCategory?.subCategory?.length > 0 && filter === "") {
      setFilter(findCategory.subCategory[0].slug);
    }
  });

  const handleSetFilter = (value) => {
    setFilter(value);
  };

  return (
    <SubCategoryFilterContainer
      className={`subcategory-container ${open ? "isOpen" : "isOpen"}`}
    >
      {findCategory?.subCategory?.map((sub) => (
        <div
          key={sub.name}
          className={`menu ${filter === sub.slug ? "selected" : ""}`}
          onClick={() => handleSetFilter(sub.slug)}
        >
          <span className='subcategory-name'>{sub.name}</span>
          {sub.logo && (
            <img
              width={sub.width}
              src={sub.logo}
              alt={sub.alt}
            />
          )}
        </div>
      ))}
    </SubCategoryFilterContainer>
  );
};

export default SubCategorySelector;
