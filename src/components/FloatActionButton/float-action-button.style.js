import styled from "styled-components";
import { colors } from "../../_const";

export const FABContainer = styled.div`
  position: fixed;
  right: 16px;
  bottom: 80px;
  border-radius: 50%;
  z-index: 999;
  & > button {
    color: white;
    outline: none;
    border: none;
    text-decoration: none;
    background: ${colors.wine};
    border-radius: 50%;
    padding: 14px 16px;
    cursor: pointer;
    transition: 0.2s all ease-in-out;
    box-shadow: 0 4px 16px rgba(116, 47, 55, 0.4);
    :active {
      background-color: ${colors.accent};
      color: ${colors.background};
    }
  }
`;
