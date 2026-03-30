import styled from "styled-components";
import { colors } from "../../_const";

export const AdminButtonBarContainer = styled.div`
  position: relative;
  margin: 12px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const AdminButtonContainer = styled.div`
  margin: 8px;
`;

export const AdminButton = styled.button`
  border: 1px solid rgba(255,255,255,0.1);
  outline: none;
  border-radius: 8px;
  padding: 10px 14px;
  background: transparent;
  color: ${colors.ecriture};
  cursor: pointer;
  transition: all 0.2s ease;
  :active {
    background: ${colors.wine};
    border-color: ${colors.wine};
  }
`;
