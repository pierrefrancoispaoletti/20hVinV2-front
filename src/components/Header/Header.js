import React from "react";
import { Link } from "react-router-dom";
import ImageElement from "../ImageElement/ImageElement";
import Loginbutton from "../LoginButton/LoginButton";
import { HeaderContainer } from "./header.style";
import logo from "../../assets/images/logo.png";
import BackHomeButton from "../BackHomeButton/BackHomeButton";

const Header = () => {
  return (
    <HeaderContainer>
      <BackHomeButton />
      <Link to='/'>
        <div>
          <ImageElement
            width='120px'
            image={logo}
            alt={"logo TDO"}
          />
        </div>
      </Link>
      <Loginbutton />
    </HeaderContainer>
  );
};

export default Header;
