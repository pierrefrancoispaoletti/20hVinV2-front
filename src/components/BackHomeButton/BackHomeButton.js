import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../_const";
import { useLocation } from "react-router-dom";

const BackHomeButtonStyled = styled.button`
  background-color: transparent;
  position: fixed;
  bottom: 10px;
  z-index: 100000;
  right: 10px;
  border: none;
  outline: none;
  color: ${colors.main};
  border-radius: 50px;
  padding: 10px;
  font-size: 20px;
  :active {
    background: rgba(255, 255, 255, 0.4);
    color: ${colors.secondary};
  }
  :hover {
    background: rgba(255, 255, 255, 0.4);
    color: ${colors.secondary};
  }
  :focus {
    background: rgba(255, 255, 255, 0.4);
    color: ${colors.secondary};
  }
  :visited {
    background: rgba(255, 255, 255, 0.4);
    color: ${colors.secondary};
  }
  :link {
    background: rgba(255, 255, 255, 0.4);
    color: ${colors.secondary};
  }
`;

const BackHomeButton = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <Link to='/'>
      <BackHomeButtonStyled className='backhome-button'>
        <FontAwesomeIcon
          icon={faHome}
          size='2x'
        />
      </BackHomeButtonStyled>
    </Link>
  );
};

export default BackHomeButton;
