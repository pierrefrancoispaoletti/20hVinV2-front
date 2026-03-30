import styled, { css } from "styled-components";

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
  background-color: lightGreen;
  text-align: center;
  font-size: 1em;
  padding: 12px;
  border-radius: 50px;
  border: 3px solid green;
  color: black;
  text-transform: uppercase;
  box-shadow: 0px 9px 23px -5px rgba(0, 0, 0, 0.58);
`;
