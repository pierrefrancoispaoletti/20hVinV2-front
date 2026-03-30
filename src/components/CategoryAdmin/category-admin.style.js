import styled from "styled-components";
import { colors } from "../../_const";

export const AdminPanelContainer = styled.section`
  padding: 20px 16px 100px;
  max-width: 680px;
  margin: 0 auto;
`;

export const AdminPanelTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: white;
  margin: 16px 0 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.4);
`;

export const CategoryCard = styled.div`
  background: ${(props) => (props.invisible ? "#f5f5f0" : "white")};
  border-radius: 12px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  opacity: ${(props) => (props.invisible ? 0.6 : 1)};
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
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => (props.invisible ? "#999" : colors.ecriture)};
  text-decoration: ${(props) => (props.invisible ? "line-through" : "none")};
`;

export const AvailabilityBadge = styled.button`
  background-color: ${(props) =>
    props.slot === "midi"
      ? "#4caf50"
      : props.slot === "soir"
        ? "#ff9800"
        : colors.secondary};
  color: white;
  border: none;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  text-transform: uppercase;
  min-width: 64px;
  transition: filter 0.15s ease;
  &:hover {
    filter: brightness(1.1);
  }
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  color: ${(props) => props.iconcolor || "#666"};
  transition: background 0.15s ease;
  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.06);
  }
  &:disabled {
    opacity: 0.2;
    cursor: default;
  }
`;

export const SubCategoryPanel = styled.div`
  background: #f8f7f2;
  border-top: 1px solid #e8e8e0;
  padding: 12px 16px 16px 48px;
`;

export const SubCategoryArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

export const SubCategoryTag = styled.span`
  background-color: white;
  border: 1px solid #d0cfc5;
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${colors.ecriture};
`;

export const SubCategoryInline = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const FormField = styled.input`
  padding: 9px 12px;
  border: 1.5px solid #d0cfc5;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  color: ${colors.ecriture};
  outline: none;
  transition: border-color 0.15s ease;
  &:focus {
    border-color: ${colors.secondary};
  }
  &::placeholder {
    color: #bbb;
  }
`;

export const FormSelect = styled.select`
  padding: 9px 12px;
  border: 1.5px solid #d0cfc5;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  color: ${colors.ecriture};
  outline: none;
  cursor: pointer;
  transition: border-color 0.15s ease;
  &:focus {
    border-color: ${colors.secondary};
  }
`;

export const AddCategoryForm = styled.form`
  display: grid;
  gap: 12px;
  margin-top: 16px;
  padding: 20px;
  background: white;
  border: 1.5px solid ${colors.secondary};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const FormLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${colors.secondary};
  margin-bottom: 2px;
  display: block;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SubmitButton = styled.button`
  background-color: ${colors.secondary};
  color: white;
  border: none;
  padding: 11px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: filter 0.15s ease;
  &:hover {
    filter: brightness(1.1);
  }
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  background: transparent;
  border: 2px dashed rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  padding: 14px 20px;
  width: 70%;
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;
