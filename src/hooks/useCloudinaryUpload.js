import { useCallback, useState } from "react";
import axios from "axios";
import { serverURI } from "../_const";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 15 * 1024 * 1024; // 15 Mo (avant compression)
const MAX_DIM = 1200;
const JPEG_QUALITY = 0.85;

const loadBitmap = async (file) => {
  if (typeof createImageBitmap === "function") {
    return createImageBitmap(file);
  }
  // Fallback navigateurs anciens
  const url = URL.createObjectURL(file);
  try {
    return await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  } finally {
    URL.revokeObjectURL(url);
  }
};

const compressImage = async (file) => {
  const bitmap = await loadBitmap(file);
  const { width, height } = bitmap;
  const scale = Math.min(1, MAX_DIM / Math.max(width, height));
  const targetW = Math.round(width * scale);
  const targetH = Math.round(height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(bitmap, 0, 0, targetW, targetH);
  if (typeof bitmap.close === "function") bitmap.close();

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("Compression échouée"));
        resolve(blob);
      },
      "image/jpeg",
      JPEG_QUALITY
    );
  });
};

export const useCloudinaryUpload = (token) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const upload = useCallback(
    async (file) => {
      setError(null);
      setProgress(0);

      if (!file) {
        const e = "Aucun fichier";
        setError(e);
        throw new Error(e);
      }
      if (!ACCEPTED.includes(file.type)) {
        const e = "Format non supporté (JPEG, PNG ou WebP)";
        setError(e);
        throw new Error(e);
      }
      if (file.size > MAX_BYTES) {
        const e = "Fichier trop lourd (max 15 Mo)";
        setError(e);
        throw new Error(e);
      }

      setUploading(true);
      try {
        const compressed = await compressImage(file);

        const sigResp = await axios.post(
          `${serverURI}/api/upload/signature`,
          {},
          { headers: { Authorization: "Bearer " + token } }
        );
        const { signature, timestamp, apiKey, cloudName, folder } = sigResp.data;

        const formData = new FormData();
        formData.append("file", compressed, "upload.jpg");
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("folder", folder);

        const cloudResp = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
          {
            onUploadProgress: (e) => {
              if (e.total) setProgress(Math.round((e.loaded / e.total) * 100));
            },
          }
        );

        setUploading(false);
        setProgress(100);
        return {
          url: cloudResp.data.secure_url,
          publicId: cloudResp.data.public_id,
        };
      } catch (err) {
        setUploading(false);
        setProgress(0);
        const msg = err.response?.data?.error?.message || err.message || "Upload échoué";
        setError(msg);
        throw err;
      }
    },
    [token]
  );

  return { upload, uploading, progress, error };
};
