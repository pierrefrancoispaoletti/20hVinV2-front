import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  WinePriceContainer,
  WinePriceElement,
} from "../TableauHomePage/tableau-homepage.style";
import { faWineBottle, faWineGlass } from "@fortawesome/free-solid-svg-icons";

const WineElement = ({ couleur, wineContent }) => {
  const getWineColor = (couleur) => {
    switch (couleur) {
      case "rouge":
        return "#a04050";
      case "blanc":
        return "#d4c44a";
      case "rosé":
        return "#ffb9b9";
      case "au verre":
        return "#f4ba9a";
      default:
        return "#e8e3dc";
    }
  };

  return (
    <WinePriceContainer>
      {couleur.map(
        (color) =>
          color?.isChecked && (
            <WinePriceElement
              className="price wineprice"
              key={color.value}
              color={color.value}
            >
              <FontAwesomeIcon
                icon={
                  color.value !== "au verre" ? faWineBottle : faWineGlass
                }
                size="1x"
                style={{ color: getWineColor(color.value), marginRight: 6 }}
              />
              <span>{Number(color.price).toFixed(2)}€</span>
            </WinePriceElement>
          )
      )}
    </WinePriceContainer>
  );
};

export default WineElement;
