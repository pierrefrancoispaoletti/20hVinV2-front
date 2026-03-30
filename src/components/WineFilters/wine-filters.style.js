import styled from "styled-components";
import { colors } from "../../_const";

export const PriceSortContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 24px;
  border-bottom: 1px solid ${colors.border};
`;

export const SortGroup = styled.div`
  display: flex;
  gap: 0;
`;

export const SortBtn = styled.button`
  padding: 6px 12px;
  border: 1px solid ${(props) =>
    props.active ? colors.accent : "rgba(255,255,255,0.08)"};
  background: ${(props) =>
    props.active ? colors.wine : "transparent"};
  color: ${(props) =>
    props.active ? "#fff" : "rgba(255,255,255,0.55)"};
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:first-child {
    border-radius: 8px 0 0 8px;
    border-right: none;
  }
  &:last-child {
    border-radius: 0 8px 8px 0;
  }
`;

export const ColorFilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  flex-wrap: wrap;
`;

export const ColorFilterBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 50px;
  border: 1px solid ${(props) =>
    props.active ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.08)"};
  background: ${(props) =>
    props.active ? "rgba(255,255,255,0.08)" : "transparent"};
  color: ${(props) =>
    props.active ? colors.ecriture : "rgba(255,255,255,0.55)"};
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(255,255,255,0.2);
  }
`;

export const ColorDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => props.color};
  flex-shrink: 0;
`;
