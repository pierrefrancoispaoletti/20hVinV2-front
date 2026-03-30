import React from "react";
import AdminButtonBar from "../AdminButtonBar/AdminButtonBar";
import { TableauContent } from "../TableauHomePage/tableau-homepage.style";
import { selectCurrentUser } from "../../redux/reducers/User/selector";
import { useSelector } from "react-redux";
import WineElement from "../WineElement/WineElement";
import TranslatorComponent from "../TranslatorComponent/TranslatorComponent";
import { getCurrentTimeSlotFrance } from "../../_const";

const getWineBarColor = (value) => {
  switch (value) {
    case "rouge": return "#742f37";
    case "blanc": return "#d4c44a";
    case "rosé": return "#ffb9b9";
    default: return "transparent";
  }
};

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

  // Determine wine colors for the left bar (cave category only)
  const isCave = category === "cave";
  const checkedColors = isCave
    ? couleur.filter((c) => c.isChecked && c.value !== "au verre")
    : [];
  const hasWineBar = checkedColors.length > 0;

  return (
    <TableauContent
      visible={user?.role === "isAdmin" || visible}
      category={category}
      last={index === length - 1}
      style={hasWineBar ? { paddingLeft: 0, flexDirection: "row", alignItems: "stretch" } : undefined}
    >
      {/* Wine color bar on the left */}
      {hasWineBar && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 5,
            minWidth: 5,
            borderRadius: 3,
            overflow: "hidden",
            marginLeft: 24,
            marginRight: 16,
            flexShrink: 0,
            alignSelf: "stretch",
          }}
        >
          {checkedColors.map((c) => (
            <div
              key={c.value}
              style={{
                flex: 1,
                background: getWineBarColor(c.value),
              }}
            />
          ))}
        </div>
      )}

      {/* Product content */}
      <div style={hasWineBar ? { flex: 1, padding: "0" } : undefined}>
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
        <p className="description">
          {description?.length > 0 && (
            <TranslatorComponent>
              {description?.replace("\n", " ")}
            </TranslatorComponent>
          )}
        </p>
      </div>
    </TableauContent>
  );
};

export default ProductElement;
