import styled, { css } from "styled-components";
import { colors } from "../../_const";

const isDisabled = (props) => {
  if (props.disabled) {
    return css`
      background: #333;
      opacity: 0.5;
    `;
  }
};

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin: 24px;
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  padding: 32px 24px;
  & > h2 {
    color: ${colors.accent};
    font-family: 'Libre Baskerville', serif;
    font-weight: 400;
    margin-bottom: 16px;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const LoginButton = styled.button`
  font-size: 1.2em;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  background-color: ${colors.wine};
  outline: none;
  color: ${colors.main};
  border: 1px solid ${colors.wine};
  border-radius: 8px;
  padding: 12px 32px;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 1px;
  &:hover {
    filter: brightness(1.1);
  }
  ${isDisabled}
`;
