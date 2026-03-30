import styled from "styled-components";
import { colors } from "../../_const";

export const AdminPanelContainer = styled.section`
  padding: 20px 16px 100px;
  max-width: 680px;
  margin: 0 auto;
`;

export const AdminPanelTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${colors.accent};
  font-family: 'Space Grotesk', sans-serif;
  margin: 16px 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${colors.border};
`;

export const CategoryCard = styled.div`
  background: ${(props) => (props.invisible ? "rgba(255,255,255,0.02)" : colors.surface)};
  border-radius: 12px;
  margin-bottom: 10px;
  border: 1px solid ${colors.border};
  overflow: hidden;
  opacity: ${(props) => (props.invisible ? 0.5 : 1)};
  transition: opacity 0.2s ease;
`;

export const CategoryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
`;

export const CategoryName = styled.span`
  flex: 1;
  font-size: 0.95rem;
  font-weight: 500;
  font-family: 'Space Grotesk', sans-serif;
  color: ${(props) => (props.invisible ? "rgba(255,255,255,0.3)" : colors.ecriture)};
  text-decoration: ${(props) => (props.invisible ? "line-through" : "none")};
`;

export const AvailabilityBadge = styled.button`
  background-color: ${(props) =>
    props.slot === "midi"
      ? "#2d5a2d"
      : props.slot === "soir"
        ? "#5a3a0a"
        : colors.secondary};
  color: ${(props) =>
    props.slot === "midi"
      ? "#8fbc8f"
      : props.slot === "soir"
        ? "#ffb347"
        : colors.main};
  border: none;
  border-radius: 8px;
  padding: 4px 12px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  text-transform: uppercase;
  min-width: 64px;
  transition: filter 0.15s ease;
  font-family: 'Space Grotesk', sans-serif;
  &:hover {
    filter: brightness(1.2);
  }
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  color: ${(props) => props.iconcolor || "rgba(255,255,255,0.4)"};
  transition: background 0.15s ease;
  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.06);
  }
  &:disabled {
    opacity: 0.2;
    cursor: default;
  }
`;

export const SubCategoryPanel = styled.div`
  background: rgba(255,255,255,0.03);
  border-top: 1px solid ${colors.border};
  padding: 12px 16px 16px 48px;
`;

export const SubCategoryArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

export const SubCategoryTag = styled.span`
  background-color: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 4px 10px;
  font-size: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${colors.ecriture};
  font-family: 'Space Grotesk', sans-serif;
`;

export const SubCategoryInline = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const FormField = styled.input`
  padding: 9px 12px;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  font-size: 0.9rem;
  background: transparent;
  color: ${colors.ecriture};
  font-family: 'Space Grotesk', sans-serif;
  outline: none;
  transition: border-color 0.15s ease;
  &:focus {
    border-color: ${colors.accent};
  }
  &::placeholder {
    color: rgba(255,255,255,0.25);
  }
`;

export const FormSelect = styled.select`
  padding: 9px 12px;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  font-size: 0.9rem;
  background: ${colors.surface};
  color: ${colors.ecriture};
  font-family: 'Space Grotesk', sans-serif;
  outline: none;
  cursor: pointer;
  transition: border-color 0.15s ease;
  &:focus {
    border-color: ${colors.accent};
  }
`;

export const AddCategoryForm = styled.form`
  display: grid;
  gap: 12px;
  margin-top: 16px;
  padding: 20px;
  background: ${colors.surface};
  border: 1px solid ${colors.accent};
  border-radius: 12px;
`;

export const FormLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${colors.accent};
  margin-bottom: 2px;
  display: block;
  font-family: 'Space Grotesk', sans-serif;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SubmitButton = styled.button`
  background-color: ${colors.wine};
  color: ${colors.main};
  border: none;
  padding: 11px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Space Grotesk', sans-serif;
  transition: filter 0.15s ease;
  &:hover {
    filter: brightness(1.15);
  }
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  background: transparent;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 14px 20px;
  width: 70%;
  color: rgba(255,255,255,0.5);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Space Grotesk', sans-serif;
  transition: all 0.15s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.03);
    border-color: ${colors.accent};
    color: ${colors.accent};
  }
`;
