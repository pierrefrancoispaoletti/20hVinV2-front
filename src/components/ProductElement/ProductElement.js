import React from "react";
import AdminButtonBar from "../AdminButtonBar/AdminButtonBar";
import { TableauContent } from "../TableauHomePage/tableau-homepage.style";
import { selectCurrentUser } from "../../redux/reducers/User/selector";
import { useSelector } from "react-redux";
import WineElement from "../WineElement/WineElement";
import TranslatorComponent from "../TranslatorComponent/TranslatorComponent";
import ImageElement from "../ImageElement/ImageElement";
import { getCurrentTimeSlotFrance } from "../../_const";

const getWineBarColor = (value) => {
  switch (value) {
    case "rouge": return "#742f37";
    case "blanc": return "#d4c44a";
    case "rosé": return "#ffb9b9";
    default: return "transparent";
  }
};

const ProductElement = ({ product, index, length, onOpen }) => {
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
    image,
  } = product;
  const user = useSelector(selectCurrentUser);
  const isAdmin = user?.role === "isAdmin";

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

  const isCave = category === "cave";
  const checkedColors = isCave
    ? couleur.filter((c) => c.isChecked && c.value !== "au verre")
    : [];
  const hasWineBar = checkedColors.length > 0;
  const hasThumb = !!image?.url && !isCave;
  const canOpenSheet = !isCave && typeof onOpen === "function";

  const handleClick = (e) => {
    if (e.target.closest("[data-admin-bar]")) return;
    if (canOpenSheet) onOpen(product);
  };

  const textBlock = (
    <>
      {isAdmin && (
        <div data-admin-bar>
          <AdminButtonBar _id={_id} product={product} />
        </div>
      )}
      <h3 className="title">
        <span style={{ display: "inline-block" }}>
          {`${visible ? "" : "CACHÉ : "} ${title}`}
          {isAdmin && show && show !== "always" && (() => {
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
    </>
  );

  const thumb = hasThumb && (
    <ImageElement
      image={image.url}
      width={56}
      height={56}
      alt={title}
      style={{ borderRadius: 8, objectFit: "cover", flexShrink: 0 }}
    />
  );

  return (
    <TableauContent
      visible={isAdmin || visible}
      category={category}
      last={index === length - 1}
      onClick={canOpenSheet ? handleClick : undefined}
      style={{
        ...(hasWineBar
          ? { paddingLeft: 0, flexDirection: "row", alignItems: "stretch" }
          : {}),
        cursor: canOpenSheet ? "pointer" : "default",
      }}
    >
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

      {hasWineBar ? (
        <div style={{ flex: 1, padding: "0", display: "flex", gap: 12, alignItems: "center" }}>
          {thumb}
          <div style={{ flex: 1, minWidth: 0 }}>{textBlock}</div>
        </div>
      ) : hasThumb ? (
        <div style={{ display: "flex", gap: 12, alignItems: "center", width: "100%" }}>
          {thumb}
          <div style={{ flex: 1, minWidth: 0 }}>{textBlock}</div>
        </div>
      ) : (
        textBlock
      )}
    </TableauContent>
  );
};

export default ProductElement;
