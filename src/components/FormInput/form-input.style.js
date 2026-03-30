import styled, { css } from "styled-components";
import { colors } from "../../_const";

const mainColor = colors.ecriture;

const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${colors.accent};
`;

export const GroupContainer = styled.div`
  position: relative;
  margin: auto 0;

  input[type="email"] {
    letter-spacing: 0.3em;
  }
  input[type="password"] {
    letter-spacing: 0.3em;
  }
  input[type="radio"] {
    transform: scale(1.5);
  }
`;

export const FormInputContainer = styled.input`
  width: 100%;
  background: transparent;
  color: ${mainColor};
  font-size: 1rem;
  font-family: 'Space Grotesk', sans-serif;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid rgba(255,255,255,0.15);
  margin: 25px 0;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-bottom-color: ${colors.accent};
  }

  &:focus ~ label {
    ${shrinkLabelStyles}
  }
`;

export const LabelContainer = styled.label`
  color: rgba(255,255,255,0.55);
  font-size: 0.9rem;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
  text-transform: capitalize;
  font-family: 'Space Grotesk', sans-serif;

  &.shrink {
    ${shrinkLabelStyles}
  }
`;
