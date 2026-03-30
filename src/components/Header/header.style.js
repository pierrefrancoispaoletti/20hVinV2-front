import styled from "styled-components";
import { colors } from "../../_const";

export const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  background: transparent;
  padding: 16px 0 8px;
`;

export const HeaderTitle = styled.div`
  position: absolute;
  top: 55%;
  font-family: 'Libre Baskerville', serif;
  font-size: 1.6rem;
  color: ${colors.accent};
  font-weight: 400;
  letter-spacing: 2px;
`;
