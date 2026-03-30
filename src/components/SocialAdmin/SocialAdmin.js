import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faSave } from "@fortawesome/free-solid-svg-icons";
import { selectConfig } from "../../redux/reducers/Config/selectors";
import { selectCurrentUser } from "../../redux/reducers/User/selector";
import { updateConfig } from "../../redux/reducers/Config/querries";
import {
  AdminPanelContainer,
  AdminPanelTitle,
  AddCategoryForm,
  FormGroup,
  FormLabel,
  FormField,
  SubmitButton,
} from "../CategoryAdmin/category-admin.style";

const FIELDS = [
  { key: "facebook", label: "Facebook", icon: faFacebook, placeholder: "https://facebook.com/..." },
  { key: "instagram", label: "Instagram", icon: faInstagram, placeholder: "https://instagram.com/..." },
  { key: "mail", label: "E-mail", icon: faEnvelope, placeholder: "contact@restaurant.fr" },
  { key: "phoneNumber", label: "Téléphone", icon: faPhone, placeholder: "+33 6 00 00 00 00" },
];

const SocialAdmin = () => {
  const dispatch = useDispatch();
  const config = useSelector(selectConfig);
  const user = useSelector(selectCurrentUser);

  const [form, setForm] = useState({
    facebook: "",
    instagram: "",
    mail: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (config) {
      setForm({
        facebook: config.facebook ?? "",
        instagram: config.instagram ?? "",
        mail: config.mail ?? "",
        phoneNumber: config.phoneNumber ?? "",
      });
    }
  }, [config]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateConfig(form, dispatch, user?.token);
  };

  return (
    <AdminPanelContainer>
      <AdminPanelTitle>Réseaux sociaux &amp; contact</AdminPanelTitle>

      <AddCategoryForm onSubmit={handleSubmit}>
        {FIELDS.map(({ key, label, icon, placeholder }) => (
          <FormGroup key={key}>
            <FormLabel htmlFor={key}>
              <FontAwesomeIcon icon={icon} style={{ marginRight: 6 }} />
              {label}
            </FormLabel>
            <FormField
              id={key}
              name={key}
              value={form[key]}
              onChange={handleChange}
              placeholder={placeholder}
            />
          </FormGroup>
        ))}
        <SubmitButton type="submit">
          <FontAwesomeIcon icon={faSave} style={{ marginRight: 8 }} />
          Enregistrer
        </SubmitButton>
      </AddCategoryForm>
    </AdminPanelContainer>
  );
};

export default SocialAdmin;
