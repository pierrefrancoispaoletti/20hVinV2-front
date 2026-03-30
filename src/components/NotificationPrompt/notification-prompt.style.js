import styled, { keyframes } from "styled-components";
import { colors } from "../../_const";

const slideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const PromptContainer = styled.div`
  position: fixed;
  bottom: 72px;
  left: 12px;
  right: 12px;
  z-index: 999;
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  animation: ${slideUp} 0.3s ease-out;
`;

export const PromptText = styled.p`
  flex: 1;
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.82rem;
  color: ${colors.ecriture};
  line-height: 1.4;
`;

export const PromptActivateBtn = styled.button`
  background: ${colors.wine};
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 18px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  white-space: nowrap;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(1.15);
  }
`;

export const PromptDismissBtn = styled.button`
  background: none;
  border: none;
  color: rgba(255,255,255,0.4);
  font-size: 1rem;
  cursor: pointer;
  padding: 4px;
  flex-shrink: 0;
  transition: color 0.2s;
  &:hover {
    color: ${colors.accent};
  }
`;
