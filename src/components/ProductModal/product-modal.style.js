import styled, { css } from "styled-components";
import { colors } from "../../_const";

const modalColorType = (props) => {
  switch (props.modalType.toLowerCase()) {
    case "ajouter":
      return css`
        background: ${colors.wine};
        border: 1px solid ${colors.wine};
        color: #fff;
      `;
    case "editer":
      return css`
        background: ${colors.secondary};
        border: 1px solid ${colors.secondary};
        color: #fff;
      `;
    default:
      return css`
        background: ${colors.wine};
        color: #fff;
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
      background: #333;
      opacity: 0.4;
      cursor: not-allowed;
    `;
  }
};

export const AddProductModalContainer = styled.div`
  position: fixed;
  z-index: 18;
  top: 10px;
  left: 0;
  right: 0;
  bottom: 10px;
  overflow-y: auto;
  background: ${colors.background};
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: 1px solid ${colors.border};
  align-items: center;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6);
  ${isShownModal}
  & > form {
    width: 85%;
    padding-bottom: 24px;
  }
  margin: 10px 12px;

  label {
    color: rgba(255,255,255,0.55);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  .textarea-description {
    width: 100%;
    background: transparent;
    color: ${colors.ecriture};
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 12px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    margin-top: 6px;
    resize: vertical;
    outline: none;
    transition: border-color 0.2s;
    &:focus {
      border-color: ${colors.accent};
    }
  }

  select {
    background: ${colors.surface} !important;
    color: ${colors.ecriture} !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
    border-radius: 10px !important;
    padding: 10px 12px !important;
    font-family: 'Space Grotesk', sans-serif !important;
    font-size: 0.9rem !important;
    outline: none;
    cursor: pointer;
    width: 100%;
    margin-top: 6px;
    transition: border-color 0.2s;
    &:focus {
      border-color: ${colors.accent};
    }
    option {
      background: ${colors.surface};
      color: ${colors.ecriture};
    }
  }
`;

export const CloseIconButton = styled.button`
  background: transparent;
  color: rgba(255,255,255,0.55);
  font-size: 1.1em;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    border-color: ${colors.accent};
    color: ${colors.accent};
  }
  &:active {
    background: ${colors.wine};
    border-color: ${colors.wine};
    color: #fff;
  }
`;

export const AddProductTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  padding: 20px 0 16px;
  border-bottom: 1px solid ${colors.border};
  margin-bottom: 16px;
  background: transparent;
  h3 {
    font-family: 'Libre Baskerville', serif;
    font-weight: 400;
    font-size: 1.2rem;
    color: ${colors.accent};
    letter-spacing: 1px;
  }
`;

export const AddProductButtonStyled = styled.button`
  width: 100%;
  font-size: 0.85rem;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 20px 0 8px;
  padding: 14px 20px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  ${modalColorType}
  ${isDisabled}
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  margin: 16px 0;
  padding: 16px;
  background: rgba(255,255,255,0.03);
  border: 1px solid ${colors.border};
  border-radius: 12px;

  & label {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0;
    border-radius: 0;
    cursor: pointer;
    color: ${colors.ecriture};
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    background: transparent;
  }
  & input[type="checkbox"] {
    accent-color: ${colors.accent};
    width: 18px;
    height: 18px;
  }
  & input[type="number"] {
    outline: none;
    font-size: 0.9rem;
    font-family: 'Space Grotesk', sans-serif;
    width: 70px;
    padding: 8px 10px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    text-align: center;
    background: transparent;
    color: ${colors.accent};
    transition: border-color 0.2s;
    &:focus {
      border-color: ${colors.accent};
    }
  }
`;
