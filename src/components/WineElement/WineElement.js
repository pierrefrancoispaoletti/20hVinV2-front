import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  WinePriceContainer,
  WinePriceElement,
} from "../TableauHomePage/tableau-homepage.style";
import { faWineBottle, faWineGlass } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../_const";

const WineElement = ({ couleur, wineContent }) => {
  const getWineColor = (couleur) => {
    switch (couleur) {
      case "rouge":
        return "#f25957";
      case "blanc":
        return "#f1f285";
      case "rosé":
        return "#ffb9b9";
      case "au verre":
        return "white";
      default:
        return colors.ecriture;
    }
  };
  return (
    <WinePriceContainer>
      {couleur.map(
        (color) =>
          color?.isChecked && (
            <WinePriceElement
              className='price wineprice'
              key={color.value}
              color={color.value}
            >
              <div
                style={{
                  display: "flex",
                  wrap: "wrap",
                  justifyContent: "center",
                  color: getWineColor(color.value),
                }}
              >
                <span>
                  <FontAwesomeIcon
                    icon={
                      getWineColor(color.value) !== "white"
                        ? faWineBottle
                        : faWineGlass
                    }
                    size='1x'
                  />
                </span>
                <span style={{ display: "inline-block", paddingLeft: "8px" }}>
                  {Number(color.price).toFixed(2)}€
                </span>
              </div>
            </WinePriceElement>
          ),
      )}
    </WinePriceContainer>
  );
};

export default WineElement;
