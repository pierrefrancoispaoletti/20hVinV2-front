import React from "react";

import {
  FormInputContainer,
  GroupContainer,
  LabelContainer,
} from "./form-input.style";

const FormInput = ({ handleChange, label, ...others }) => {
  const isClassicLabel =
    others.name === "subCategory" ||
    others.type === "date" ||
    others.type === "time";
  return (
    <GroupContainer>
      {isClassicLabel && <label htmlFor={label}>{label}</label>}
      <FormInputContainer onChange={handleChange} {...others} />
      {label && !isClassicLabel && (
        <LabelContainer
          htmlFor=""
          className={`${
            String(others?.value)?.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </LabelContainer>
      )}
    </GroupContainer>
  );
};

export default FormInput;
