import styled from "styled-components";
import { colors } from "../../_const";

export const CopyrightStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;

  .footer__copyright {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    padding: 10px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.75rem;
    color: rgba(255,255,255,0.2) !important;
    letter-spacing: 1px;
  }

  .footer__alvp {
    border-radius: 8px;
    padding: 2px 5px;
    font-family: 'Space Grotesk', sans-serif;
    color: rgba(255,255,255,0.15) !important;
    font-size: 0.65rem;
  }

  h3 {
    font-family: 'Libre Baskerville', serif;
    text-align: center !important;
    letter-spacing: 0.1em;
    font-size: 1.2em !important;
    color: ${colors.ecriture} !important;
    font-weight: 400;
  }

  .alvp__icon {
    animation: heartPulse 2s infinite linear;
  }

  .link {
    color: rgba(255,255,255,0.2);
    text-decoration: none;
  }

  @keyframes heartPulse {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.3);
    }

    100% {
      transform: scale(1);
    }
  }
`;
