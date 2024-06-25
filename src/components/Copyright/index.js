import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import "./copyright.style.js";
import {
  faEnvelope,
  faHeart,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { facebook, instagram, mail, phoneNumber, url } from "../../_const";
import { CopyrightStyled } from "./copyright.style.js";
const Copyright = () => {
  return (
    <CopyrightStyled>
      <div>
        <h3>Retrouvez nous sur : </h3>
      </div>
      <div className='footer__icons'>
        <a
          target='_blank'
          href={facebook}
          rel='noreferrer'
        >
          <FontAwesomeIcon
            style={{
              color: "white",
              background: "transparent",
              borderRadius: "100%",
            }}
            size='2x'
            icon={faFacebook}
            pull='left'
          />
        </a>
        <a
          target='_blank'
          href={instagram}
          rel='noreferrer'
        >
          <FontAwesomeIcon
            style={{ color: "white", borderRadius: "100%" }}
            size='2x'
            icon={faInstagram}
            pull='right'
          />
        </a>
      </div>
      <div>
        <h3>Contactez nous ! </h3>
      </div>
      <div className='footer__icons'>
        <a href={`mailto:${mail}`}>
          <FontAwesomeIcon
            style={{
              color: "white",
            }}
            size='2x'
            icon={faEnvelope}
            pull='left'
          />
        </a>
        <a href={`tel:${phoneNumber}`}>
          <FontAwesomeIcon
            style={{
              color: "white",
            }}
            size='2x'
            icon={faPhone}
          />
        </a>
      </div>
      <div
        className='footer__copyright'
        style={{ color: "white" }}
      >
        {"Copyright © "}
        <a
          className='link'
          href={url}
        >
          <span>Le TDO&nbsp;</span>
        </a>
        <span>{` ${new Date().getFullYear()}. `}</span>
      </div>
      {/* <div className='footer__alvp'>
        <a
          className='link'
          href='mailto:pef@alvp-developments.com'
        >
          Made with
          <FontAwesomeIcon
            className='alvp__icon'
            color='darkred'
            icon={faHeart}
            size='2x'
          />
          by ALVP-Developments Ajaccio
        </a>
      </div> */}
    </CopyrightStyled>
  );
};

export default Copyright;
