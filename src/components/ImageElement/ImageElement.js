import React from "react";

// Insère une transformation Cloudinary dans une URL `secure_url`.
// Exemple : .../upload/v1234/foo.jpg → .../upload/c_fill,g_auto,w_120,h_120,f_auto,q_auto/v1234/foo.jpg
const withTransform = (url, transform) => {
  if (!url || !url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/${transform}/`);
};

const ImageElement = ({ image, alt, width, height, transform, ...rest }) => {
  if (!image) return null;
  const t =
    transform ||
    (width && height
      ? `c_fill,g_auto,w_${width},h_${height},f_auto,q_auto`
      : "f_auto,q_auto");
  return (
    <img
      src={withTransform(image, t)}
      alt={alt || ""}
      width={width}
      height={height}
      loading="lazy"
      {...rest}
    />
  );
};

export default ImageElement;
