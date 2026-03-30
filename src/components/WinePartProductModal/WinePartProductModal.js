import React from "react";
import { CheckBoxContainer } from "../ProductModal/product-modal.style";

const getColorDot = (value) => {
  switch (value) {
    case "rouge": return "#742f37";
    case "blanc": return "#d4c44a";
    case "rosé": return "#ffb9b9";
    default: return "#f4ba9a";
  }
};

const WinePartProductModal = ({ couleur, setProduct }) => {
  return (
    <CheckBoxContainer>
      <span style={{
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.4)",
        marginBottom: 8,
        fontFamily: "'Space Grotesk', sans-serif",
      }}>
        Couleurs & prix
      </span>
      {couleur.map((color) => (
        <div
          key={color.value}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 0",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <label
            htmlFor={color.value}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <span style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: getColorDot(color.value),
              display: "inline-block",
              flexShrink: 0,
            }} />
            {color.value.toUpperCase()}
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              name={color.value}
              type="checkbox"
              checked={color.isChecked}
              value={color.value}
              onChange={() =>
                setProduct((prevState) => ({
                  ...prevState,
                  ...(color.isChecked = !color.isChecked),
                }))
              }
            />
            <input
              type="number"
              pattern="\\d*"
              step={0.1}
              value={color.price}
              onChange={(e) =>
                setProduct((prevState) => ({
                  ...prevState,
                  ...(color["price"] = e.target.value),
                }))
              }
            />
            <span style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}>€</span>
          </div>
        </div>
      ))}
    </CheckBoxContainer>
  );
};

export default WinePartProductModal;
