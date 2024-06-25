import React from "react";
import { LoaderContainer } from "./Loader.style";
import coeur from "../../assets/images/COEUR_TDO.gif";

const LoaderElement = () => {
  return (
    <LoaderContainer className='loader'>
      <img
        src={coeur}
        alt='coeur'
        width={"80%"}
      />
    </LoaderContainer>
  );
};

export default LoaderElement;
