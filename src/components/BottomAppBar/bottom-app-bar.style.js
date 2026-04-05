import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../_const";

export const BarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: linear-gradient(to top, ${colors.background} 70%, transparent);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 6px;
  z-index: 1000;
`;

export const BarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const BarButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255,255,255,0.55);
  transition: all 0.2s ease;
  text-decoration: none;
  &:hover {
    border-color: ${colors.accent};
    color: ${colors.accent};
  }
  &:active {
    background: rgba(255, 255, 255, 0.05);
    color: ${colors.accent};
  }
`;

export const BarAction = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${colors.accent}44;
  background: transparent;
  color: ${colors.accent};
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    border-color: ${colors.accent};
    color: ${colors.accent};
    background: ${colors.accent}11;
  }
  &:active {
    background: ${colors.accent}22;
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const BarAnchor = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255,255,255,0.55);
  transition: all 0.2s ease;
  text-decoration: none;
  &:hover {
    border-color: ${colors.accent};
    color: ${colors.accent};
  }
  &:active {
    background: rgba(255, 255, 255, 0.05);
    color: ${colors.accent};
  }
`;
