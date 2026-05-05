import React, { useEffect } from "react";
import { Overlay, FullImage, CloseBtn } from "./lightbox.style";

const Lightbox = ({ image, alt, onClose }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!image) return null;
  const fullSrc = image.replace("/upload/", "/upload/c_limit,w_1200,f_auto,q_auto:eco/");

  return (
    <Overlay onClick={onClose}>
      <CloseBtn type="button" aria-label="Fermer" onClick={onClose}>
        ×
      </CloseBtn>
      <FullImage src={fullSrc} alt={alt || ""} onClick={(e) => e.stopPropagation()} />
    </Overlay>
  );
};

export default Lightbox;
