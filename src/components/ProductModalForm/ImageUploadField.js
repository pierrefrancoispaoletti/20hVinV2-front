import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useCloudinaryUpload } from "../../hooks/useCloudinaryUpload";
import ImageElement from "../ImageElement/ImageElement";
import { colors } from "../../_const";

const hiddenInputStyle = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  border: 0,
};

const buttonBase = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 16px",
  borderRadius: 8,
  fontSize: "0.85rem",
  fontWeight: 600,
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  cursor: "pointer",
  transition: "background 150ms ease, border-color 150ms ease",
  fontFamily: "inherit",
};

const ImageUploadField = ({ image, onChange, token }) => {
  const inputRef = useRef(null);
  const { upload, uploading, progress, error } = useCloudinaryUpload(token);

  const openPicker = () => {
    if (!uploading) inputRef.current?.click();
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await upload(file);
      onChange(result);
    } catch (_) {
      // erreur déjà capturée dans le hook
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = () => onChange(null);

  const hasImage = !!image?.url;

  return (
    <div style={{ margin: "16px 0" }}>
      <label
        style={{
          display: "block",
          marginBottom: 10,
          fontSize: "0.85rem",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          opacity: 0.75,
        }}
      >
        Image (optionnelle)
      </label>

      {hasImage && (
        <div style={{ marginBottom: 12 }}>
          <ImageElement
            image={image.url}
            width={160}
            height={160}
            alt="Aperçu"
            style={{
              borderRadius: 12,
              objectFit: "cover",
              border: `1px solid ${colors.border}`,
            }}
          />
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFile}
        disabled={uploading}
        style={hiddenInputStyle}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <button
          type="button"
          onClick={openPicker}
          disabled={uploading}
          style={{
            ...buttonBase,
            background: uploading ? "transparent" : colors.accent,
            color: uploading ? colors.ecriture : colors.background,
            border: `1px solid ${colors.accent}`,
            opacity: uploading ? 0.6 : 1,
          }}
        >
          <FontAwesomeIcon icon={faCamera} />
          {hasImage ? "Changer l'image" : "Choisir une image"}
        </button>

        {hasImage && !uploading && (
          <button
            type="button"
            onClick={handleRemove}
            style={{
              ...buttonBase,
              background: "transparent",
              color: colors.ecriture,
              border: `1px solid ${colors.border}`,
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
            Supprimer
          </button>
        )}
      </div>

      {uploading && (
        <div style={{ marginTop: 12 }}>
          <div
            style={{
              height: 4,
              borderRadius: 2,
              background: "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: colors.accent,
                transition: "width 150ms linear",
              }}
            />
          </div>
          <span
            style={{
              display: "block",
              marginTop: 6,
              fontSize: "0.75rem",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            {progress > 0 ? `Envoi ${progress}%` : "Compression…"}
          </span>
        </div>
      )}

      {error && (
        <div
          style={{
            color: "#ff6b6b",
            marginTop: 8,
            fontSize: "0.85rem",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;
