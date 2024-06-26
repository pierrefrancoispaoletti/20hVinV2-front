import React from "react";
import styled from "styled-components";
import { colors } from "../../_const";

export const ColorFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  padding: 20px;
`;

export const RadioButtonLabel = styled.label`
  background-color: ${(props) => (props.checked ? colors.main : "transparent")};
  padding: 10px;
  color: ${(props) => (props.checked ? "white" : colors.main)};
  border-radius: 20px;
  border: 1px solid white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
`;

export const RadioButton = styled.input`
  display: none;
  &:checked + ${RadioButtonLabel} {
    background-color: ${colors.main};
    color: black;
    text-decoration: underline;
  }
`;

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.toLocaleLowerCase().substring(1);
}

const ColorFilter = ({ selectedColor, setSelectedColor }) => {
  const colors = ["rouge", "blanc", "rosé"];

  return (
    <ColorFilterContainer>
      {colors.map((color) => (
        <div key={color}>
          <RadioButton
            type='radio'
            name='color'
            value={color}
            checked={selectedColor === color}
            onChange={(e) => setSelectedColor(e.target.value)}
            id={color}
          />
          <RadioButtonLabel
            htmlFor={color}
            checked={selectedColor === color}
          >
            {capitalize(color)}
          </RadioButtonLabel>
        </div>
      ))}
      <div>
        <RadioButton
          type='radio'
          name='color'
          value=''
          checked={selectedColor === ""}
          onChange={() => setSelectedColor("")}
          id='all'
        />
        <RadioButtonLabel
          htmlFor='all'
          checked={selectedColor === ""}
        >
          Tous
        </RadioButtonLabel>
      </div>
    </ColorFilterContainer>
  );
};

export default ColorFilter;
