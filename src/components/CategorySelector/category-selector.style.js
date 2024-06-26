import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../_const";

export const CategoriesContainer = styled.nav`
  margin: 50px auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  padding: 8px 0px;
`;

export const ListContainer = styled.ul`
  padding: 0px 8px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  list-style: none;
`;
export const CategoryItem = styled.li`
  font-family: "poppins";
  font-size: 0.7em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 75px;
  margin: 0px;
  background: ${colors.gold};
  border: 3px solid ${colors.ecriture};
  border-radius: 10%;
  padding: 6px;
  box-shadow: 0px 9px 15px -5px rgba(0, 0, 0, 0.58);
  transition: all 0.5s;
  text-align: center;
`;

export const IconWrapper = styled.div`
  text-align: center;
  margin-bottom: 6px;
`;

export const CategoryTitle = styled.span`
  line-height: 1em;
  font-size: 1em;
  text-align: center;
  width: 100%;
  color: ${colors.main};
`;

export const LinkContainer = styled(NavLink)`
  text-decoration: none;
  &.active {
    /* text-decoration: underline ${colors.main}; */
    & > li {
      background: ${colors.secondary};
      border: 3px solid ${colors.gold};
      color: ${colors.main};
    }
  }
`;
