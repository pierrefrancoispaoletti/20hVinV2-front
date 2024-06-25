import styled from "styled-components";
import { colors } from "../../_const";

export const CopyrightStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .footer__copyright {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    padding: 1px;
    font-family: "poppins" !important;
    font-size: 1em;
    color: ${colors.ecriture}!important;
  }

  .footer__alvp {
    border-radius: 8px;
    padding: 2px 5px;
    font-family: "poppins" !important;
    color: ${colors.ecriture}!important;
  }

  h3 {
    font-family: "poppins" !important;
    text-align: center !important;
    letter-spacing: 2px;
    font-size: 1.1em !important;
    color: ${colors.ecriture} !important;
  }

  .alvp__icon {
    animation: heartPulse 2s infinite linear;
  }

  .link {
    color: ${colors.ecriture};
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
