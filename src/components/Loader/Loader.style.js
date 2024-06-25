import styled from "styled-components";
import { colors } from "../../_const";

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: center;
  margin: auto;
  letter-spacing: 8px;
  span {
    font-size: 2.5em;
    color: ${colors.ecriture};
    font-family: "Lora";
    :nth-child(n) {
      animation: evenCharacterAnimation 0.7s linear infinite;
    }
    :nth-child(2n) {
      animation: evenCharacterAnimation 0.8s linear infinite;
    }
    @keyframes evenCharacterAnimation {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
    @media (max-width: 500px) {
      font-size: 2em;
    }
    @media (max-width: 420px) {
      font-size: 1.2em;
    }
    @media (max-width: 320px) {
      font-size: 1em;
    }
  }
`;
