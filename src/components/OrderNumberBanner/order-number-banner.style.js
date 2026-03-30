import styled from "styled-components";
import { colors } from "../../_const";

export const OrderBannerContainer = styled.div`
  width: 100%;
  color: ${colors.ecriture};
  font-size: 1.2em;
  margin-bottom: 12px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Space Grotesk', sans-serif;

  & button {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    align-self: center;
    color: ${colors.ecriture};
    outline: none;
    border: none;
    font-weight: 600;
    background: transparent;
    font-size: 1em;
    margin: 0;
    padding: 0;
    cursor: pointer;
    :active {
      background: rgba(255, 255, 255, 0.05);
      color: ${colors.accent};
    }
  }
`;
