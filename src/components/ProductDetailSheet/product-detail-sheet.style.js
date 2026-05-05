import styled, { keyframes } from "styled-components";
import { colors } from "../../_const";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  animation: ${fadeIn} 200ms ease-out;
`;

export const SheetContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  background: ${colors.surface};
  color: ${colors.ecriture};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideUp} 300ms ease-out;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.4);
`;

export const Handle = styled.div`
  width: 40px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  margin: 12px auto 0;
`;

export const HeroImage = styled.img`
  width: 100%;
  max-height: 50vh;
  object-fit: cover;
  display: block;
  cursor: zoom-in;
`;

export const Body = styled.div`
  padding: 20px 24px 32px;
`;

export const Title = styled.h2`
  margin: 0 0 8px;
  font-size: 1.5rem;
`;

export const Meta = styled.div`
  color: ${colors.accent};
  margin-bottom: 16px;
  font-weight: 600;
`;

export const Description = styled.p`
  line-height: 1.6;
  white-space: pre-wrap;
  margin: 0;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 18px;
  cursor: pointer;
  z-index: 2;
`;
