import styled, { css } from "styled-components";
import { colors } from "../../_const";

const isVisible = (props) => {
  if (props.visible) {
    return css`
      visibility: visible;
    `;
  }
  return css`
    visibility: hidden;
  `;
};
export const LocalMessageContainer = styled.div`
  z-index: 12;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 15px;
  right: 0;
  left: 0;
  width: 100%;
  visibility: hidden;
  animation: 1s fadeIn;
  ${isVisible}
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const LocalMessageWrapper = styled.div`
  background-color: ${colors.surface};
  text-align: center;
  font-size: 0.85rem;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 500;
  padding: 12px 24px;
  border-radius: 8px;
  border: 1px solid ${colors.wine};
  color: ${colors.accent};
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
`;
