import styled, { css } from "styled-components";
import { colors } from "../../_const";

const modalColorType = (props) => {
  switch (props.modalType.toLowerCase()) {
    case "ajouter":
      return css`
        border: 3px solid green;
        background: lightgreen;
        color: ${colors.main};
      `;
    case "editer":
      return css`
        border: 3px solid ${colors.main};
        background: purple;
        color: ${colors.main};
      `;
    default:
      return css`
        background: lightgreen;
      `;
  }
};

const isShownModal = (props) => {
  if (!props.open)
    return css`
      display: none;
    `;
};

const isDisabled = (props) => {
  if (props.disabled) {
    return css`
      background: #ccc;
    `;
  }
};

export const AddProductModalContainer = styled.div`
  position: fixed;
  z-index: 18;
  top: ${(props) =>
    props.scrollPosition + 10}px; // Utilisation de la position de défilement
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 12px;
  border: 2px solid ${colors.main};
  align-items: center;
  ${isShownModal} & > form {
    width: 80%;
  }
  margin: 15px 15px;
`;

export const CloseIconButton = styled.button`
  background: ${colors.main};
  color: black;
  font-size: 1.3em;
  font-weight: bold;
  border: 1px solid black;
  border-radius: 50px;
  padding: 8px 14px;
  :active {
    background: black;
    border: 1px solid ${colors.secondary};
    color: ${colors.secondary};
  }
`;

export const AddProductTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  background: ${colors.main};
`;

export const AddProductButtonStyled = styled.button`
  float: right;
  font-size: 1em;
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 50px;
  font-weight: bold;
  ${modalColorType}
  ${isDisabled}
`;

export const CheckBoxContainer = styled.div`
  display: grid;

  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  & label {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 5px;
    background-color: ${colors.light};
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
  & input[type="checkbox"] {
    accent-color: ${colors.main};
  }
  & input[type="number"] {
    outline: none;
    font-size: 1em;
    width: auto;
    padding: 5px;
    border: 1px solid ${colors.main};
    border-radius: 5px;
    text-align: center;
  }
`;
