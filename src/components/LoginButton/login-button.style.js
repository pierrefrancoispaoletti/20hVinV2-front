import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../_const";

export const LoginButtonStyled = styled(Link)`
  position: absolute;
  top: 0px;
  right: 15px;
  border: 1px solid rgba(255,255,255,0.1);
  padding: 10px 12px;
  border-radius: 50px;
  color: rgba(255,255,255,0.4);
  transition: all 0.2s ease;
  text-decoration: none;
  :hover {
    border-color: ${colors.accent};
    color: ${colors.accent};
  }
  :active {
    background: ${colors.wine};
    color: ${colors.main};
    border-color: ${colors.wine};
  }
`;
