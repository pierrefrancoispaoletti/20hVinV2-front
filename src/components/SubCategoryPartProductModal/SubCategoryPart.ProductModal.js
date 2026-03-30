import React from "react";
import styled from "styled-components";
import { colors } from "../../_const";

const SubCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  margin: 16px 0;
  background: rgba(255,255,255,0.03);
  border: 1px solid ${colors.border};
  border-radius: 12px;
`;

const SubCategoryTitle = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 4px;
  font-family: 'Space Grotesk', sans-serif;
`;

const OptionsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const RadioButtonLabel = styled.label`
  background-color: ${(props) => (props.checked ? colors.wine : "transparent")};
  color: ${(props) => (props.checked ? "#fff" : "rgba(255,255,255,0.55)")};
  padding: 8px 16px;
  border-radius: 50px;
  border: 1px solid ${(props) => (props.checked ? colors.wine : "rgba(255,255,255,0.1)")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  &:hover {
    border-color: rgba(255,255,255,0.25);
  }
`;

const RadioButton = styled.input`
  display: none;
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
      <SubCategoryTitle>Sous-catégorie</SubCategoryTitle>
      <OptionsGrid>
        {subCategories.map((sub) => (
          <div key={sub.slug}>
            <RadioButton
              id={sub.slug}
              type="radio"
              name="subCategory"
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
      </OptionsGrid>
    </SubCategoryContainer>
  );
};

export default SubCategoryPartProductModal;
