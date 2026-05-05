import React, { useRef } from "react";
import { useCloudinaryUpload } from "../../hooks/useCloudinaryUpload";
import ImageElement from "../ImageElement/ImageElement";

const ImageUploadField = ({ image, onChange, token }) => {
  const inputRef = useRef(null);
  const { upload, uploading, progress, error } = useCloudinaryUpload(token);

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

  return (
    <div style={{ margin: "16px 0" }}>
      <label style={{ display: "block", marginBottom: 8 }}>Image (optionnelle)</label>
      {image?.url && (
        <div style={{ marginBottom: 8 }}>
          <ImageElement
            image={image.url}
            width={160}
            height={160}
            alt="Aperçu"
            style={{ borderRadius: 8, objectFit: "cover" }}
          />
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFile}
        disabled={uploading}
      />
      {uploading && (
        <div style={{ marginTop: 8 }}>
          <div
            style={{
              height: 6,
              borderRadius: 3,
              background: "rgba(255,255,255,0.1)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "#f4ba9a",
                transition: "width 150ms linear",
              }}
            />
          </div>
          <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>
            {progress > 0 ? `Upload ${progress}%` : "Compression…"}
          </span>
        </div>
      )}
      {error && (
        <div style={{ color: "#ff6b6b", marginTop: 6, fontSize: "0.85rem" }}>
          {error}
        </div>
      )}
      {image?.url && !uploading && (
        <button
          type="button"
          onClick={handleRemove}
          style={{
            marginTop: 8,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#e8e3dc",
            padding: "6px 12px",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Supprimer l'image
        </button>
      )}
    </div>
  );
};

export default ImageUploadField;
