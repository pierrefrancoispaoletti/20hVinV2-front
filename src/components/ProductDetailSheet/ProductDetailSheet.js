import React, { useEffect, useState } from "react";
import Lightbox from "../Lightbox/Lightbox";
import {
  Backdrop,
  SheetContainer,
  Handle,
  HeroImage,
  Body,
  Title,
  Meta,
  Description,
  CloseButton,
} from "./product-detail-sheet.style";

const ProductDetailSheet = ({ product, open, onClose }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) setLightboxOpen(false);
  }, [open]);

  if (!open || !product) return null;

  const { title, description, price, image, category, date, heure } = product;
  const isEvent = category === "evenements";
  const heroSrc = image?.url
    ? image.url.replace("/upload/", "/upload/c_fill,g_auto,w_800,f_auto,q_auto:eco/")
    : null;

  return (
    <>
      <Backdrop onClick={onClose} />
      <SheetContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton type="button" aria-label="Fermer" onClick={onClose}>
          ×
        </CloseButton>
        <Handle />
        {heroSrc && (
          <HeroImage
            src={heroSrc}
            alt={title}
            onClick={() => setLightboxOpen(true)}
          />
        )}
        <Body>
          <Title>{title}</Title>
          <Meta>
            {isEvent
              ? `${date ? `Le ${new Date(date).toLocaleDateString()}` : ""}${
                  heure ? ` à ${heure}` : ""
                }`
              : price != null
              ? `${Number(price).toFixed(2)} €`
              : ""}
          </Meta>
          {description && <Description>{description}</Description>}
        </Body>
      </SheetContainer>
      {lightboxOpen && image?.url && (
        <Lightbox image={image.url} alt={title} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  );
};

export default ProductDetailSheet;
