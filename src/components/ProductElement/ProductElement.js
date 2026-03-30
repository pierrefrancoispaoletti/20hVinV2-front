import React from "react";
import AdminButtonBar from "../AdminButtonBar/AdminButtonBar";
import { TableauContent } from "../TableauHomePage/tableau-homepage.style";
import { selectCurrentUser } from "../../redux/reducers/User/selector";
import { useSelector } from "react-redux";
import WineElement from "../WineElement/WineElement";
import TranslatorComponent from "../TranslatorComponent/TranslatorComponent";
import { getCurrentTimeSlotFrance } from "../../_const";

const ProductElement = ({ product, index, length }) => {
  const {
    _id,
    price,
    description,
    title,
    visible,
    category,
    couleur,
    date,
    heure,
    show,
  } = product;
  const user = useSelector(selectCurrentUser);

  const wineContent = (couleur) => {
    if (couleur) {
      if (
        couleur.some((color) => color.isChecked && color.value === "au verre")
      ) {
        return "AU VERRE";
      } else {
        return "75 cl";
      }
    }
    return "";
  };
  return (
    <TableauContent
      visible={user?.role === "isAdmin" || visible}
      category={category}
      last={index === length - 1}
    >
      {user && user.role === "isAdmin" && (
        <AdminButtonBar _id={_id} product={product} />
      )}
      <h3 className="title">
        <span style={{ display: "inline-block" }}>
          {`${visible ? "" : "CACHÉ : "} ${title}`}
          {user?.role === "isAdmin" && show && show !== "always" && (() => {
            const currentSlot = getCurrentTimeSlotFrance();
            const isActive = show === currentSlot;
            const label = show === "midi" ? "MIDI" : "SOIR";
            const color = show === "midi" ? "#4caf50" : "#ff9800";
            return (
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.55rem",
                  fontWeight: "bold",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  marginLeft: "8px",
                  verticalAlign: "middle",
                  letterSpacing: "1px",
                  backgroundColor: isActive ? color : "#888",
                  color: "white",
                }}
              >
                {isActive ? label : `⏱ ${label}`}
              </span>
            );
          })()}
        </span>
        {category === "evenements" ? (
          <span className="price">
            {date ? `Le ${new Date(date).toLocaleDateString()}` : ""}
            {heure ? ` à ${heure}` : ""}
          </span>
        ) : category !== "cave" ||
          couleur.every((color) => !color.isChecked) ? (
          <span className="price">{price?.toFixed(2)} €</span>
        ) : (
          <WineElement couleur={couleur} wineContent={wineContent} />
        )}
      </h3>
      {/* <WineColorContainer>
        {couleur.map(
          (color) =>
            color.isChecked && (
              <WineItemElement key={color.value} color={color.value}>
                <FontAwesomeIcon icon={faWineBottle} size="2x" />
              </WineItemElement>
            )
        )}
      </WineColorContainer> */}
      <p className="description">
        {description?.length > 0 && (
          <TranslatorComponent>
            {description?.replace("\n", " ")}
          </TranslatorComponent>
        )}
      </p>
    </TableauContent>
  );
};

export default ProductElement;
