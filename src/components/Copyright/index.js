import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { url } from "../../_const";
import { CopyrightStyled } from "./copyright.style.js";

const Copyright = () => {
  return (
    <CopyrightStyled>
      <div className="footer__copyright">
        {"Copyright © "}
        <a className="link" href={url}>
          <span>20hVin&nbsp;</span>
        </a>
        <span>{` ${new Date().getFullYear()}. `}</span>
      </div>
      <div className="footer__alvp">
        <a className="link" href="mailto:pef@alvp-developments.com">
          Made with
          <FontAwesomeIcon
            className="alvp__icon"
            color="darkred"
            icon={faHeart}
            size="2x"
          />
          by ALVP-Developments Ajaccio
        </a>
      </div>
    </CopyrightStyled>
  );
};

export default Copyright;
