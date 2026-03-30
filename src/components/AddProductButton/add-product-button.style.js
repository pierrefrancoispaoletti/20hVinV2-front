import styled from "styled-components";
import { colors } from "../../_const";

export const AddProductButtonStyled = styled.button`
  background: #1a3a1a;
  border: 1px solid #2d5a2d;
  border-radius: 50%;
  padding: 9px 12px;
  color: #8fbc8f;
  cursor: pointer;
  transition: all 0.2s ease;
  :active {
    background: #2d5a2d;
    color: ${colors.main};
  }
`;
