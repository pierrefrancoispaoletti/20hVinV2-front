import React from "react";
import { Link } from "react-router-dom";
import ImageElement from "../ImageElement/ImageElement";
import { HeaderContainer } from "./header.style";
import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <HeaderContainer>
      <Link to="/">
        <div>
          <ImageElement width="120px" image={logo} alt={"logo 20hVin"} />
        </div>
      </Link>
    </HeaderContainer>
  );
};

export default Header;
