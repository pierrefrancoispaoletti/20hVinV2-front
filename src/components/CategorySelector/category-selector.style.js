import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../_const";

export const CategoriesContainer = styled.nav`
  display: flex;
  padding: 0;
  overflow-x: auto;
  border-bottom: 1px solid ${colors.border};
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

export const ListContainer = styled.ul`
  padding: 0;
  margin: 0 auto;
  display: flex;
  align-items: stretch;
  list-style: none;
  width: 100%;
`;

export const CategoryItem = styled.li`
  font-family: 'Space Grotesk', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 0;
  padding: 14px 8px 12px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 6px;
`;

export const IconWrapper = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 2px;
`;

export const CategoryTitle = styled.span`
  line-height: 1;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  color: rgba(255,255,255,0.5);
  white-space: nowrap;
  transition: color 0.3s ease;
`;

export const LinkContainer = styled(NavLink)`
  text-decoration: none;
  flex: 1;
  display: flex;
  &.active {
    & > li {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 20%;
        width: 60%;
        height: 2px;
        background: ${colors.accent};
        border-radius: 1px;
      }
    }
    & ${CategoryTitle} {
      color: ${colors.accent};
    }
  }
`;
