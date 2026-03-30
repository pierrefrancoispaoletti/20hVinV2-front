import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../_const";

export const BarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: ${colors.secondary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 1000;
  box-shadow: 0 -3px 12px rgba(0, 0, 0, 0.35);
`;

export const BarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const BarButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.6);
  color: white;
  transition: background 0.15s ease;
  &:active {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const BarAnchor = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.6);
  color: white;
  transition: background 0.15s ease;
  &:active {
    background: rgba(255, 255, 255, 0.2);
  }
`;
