import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { selectCurrentUser } from "../../redux/reducers/User/selector";
import { selectPushLoading } from "../../redux/reducers/Push/selectors";
import { sendPushNotification } from "../../redux/reducers/Push/querries";
import {
  AdminPanelContainer,
  AdminPanelTitle,
  AddCategoryForm,
  FormGroup,
  FormLabel,
  FormField,
  SubmitButton,
} from "../CategoryAdmin/category-admin.style";
import styled from "styled-components";
import { colors } from "../../_const";

const FormTextArea = styled.textarea`
  padding: 10px 12px;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  font-size: 0.9rem;
  background: transparent;
  color: ${colors.ecriture};
  font-family: 'Space Grotesk', sans-serif;
  outline: none;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.15s ease;
  &:focus {
    border-color: ${colors.accent};
  }
  &::placeholder {
    color: rgba(255,255,255,0.25);
  }
`;

const PushAdmin = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const loading = useSelector(selectPushLoading);
  const [form, setForm] = useState({ title: "", body: "", url: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.body) return;
    sendPushNotification(form, dispatch, user?.token);
    setForm({ title: "", body: "", url: "" });
  };

  return (
    <AdminPanelContainer>
      <AdminPanelTitle>Notifications Push</AdminPanelTitle>

      <AddCategoryForm onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Titre *</FormLabel>
          <FormField
            name="title"
            placeholder="ex. Soirée Jazz ce vendredi !"
            value={form.title}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Message *</FormLabel>
          <FormTextArea
            name="body"
            placeholder="ex. Venez découvrir notre soirée jazz avec..."
            value={form.body}
            onChange={handleChange}
            rows={4}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Lien (optionnel)</FormLabel>
          <FormField
            name="url"
            placeholder="ex. /#/products/evenements"
            value={form.url}
            onChange={handleChange}
          />
        </FormGroup>
        <SubmitButton type="submit" disabled={loading || !form.title || !form.body}>
          <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: 8 }} />
          {loading ? "Envoi en cours..." : "Envoyer la notification"}
        </SubmitButton>
      </AddCategoryForm>
    </AdminPanelContainer>
  );
};

export default PushAdmin;
