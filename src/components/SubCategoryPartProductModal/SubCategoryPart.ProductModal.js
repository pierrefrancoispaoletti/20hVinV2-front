import React from "react";
import styled from "styled-components";
import { colors } from "../../_const";

const SubCategoryContainer = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  flex-flow: row wrap;
  padding: 20px;
`;

const RadioButtonLabel = styled.label`
  background-color: ${(props) => (props.checked ? colors.main : "transparent")};
  padding: 10px;
  border-radius: 20px;
  border: 1px solid black;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
`;

const RadioButton = styled.input`
  display: none;
  &:checked + ${RadioButtonLabel} {
    background-color: ${colors.secondary};
    color: white;
  }
`;

const SubCategoryPartProductModal = ({
  setProduct,
  subCategories,
  subCategory,
}) => {
  const handleChange = (e) => {
    const { value } = e.target;
    setProduct((prevState) => ({ ...prevState, subCategory: value }));
  };

  return (
    <SubCategoryContainer>
      Sous-Catégorie
      {subCategories.map((sub) => (
        <div key={sub.slug}>
          <RadioButton
            id={sub.slug}
            type='radio'
            name='subCategory'
            value={sub.slug}
            checked={subCategory === sub.slug}
            onChange={handleChange}
          />
          <RadioButtonLabel
            htmlFor={sub.slug}
            checked={subCategory === sub.slug}
          >
            {sub.name}
          </RadioButtonLabel>
        </div>
      ))}
    </SubCategoryContainer>
  );
};

export default SubCategoryPartProductModal;
