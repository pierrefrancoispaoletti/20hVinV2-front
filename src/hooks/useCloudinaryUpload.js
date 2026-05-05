import { useCallback, useState } from "react";
import axios from "axios";
import { serverURI } from "../_const";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024; // 5 Mo

export const useCloudinaryUpload = (token) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const upload = useCallback(
    async (file) => {
      setError(null);

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
        const e = "Fichier trop lourd (max 5 Mo)";
        setError(e);
        throw new Error(e);
      }

      setUploading(true);
      try {
        const sigResp = await axios.post(
          `${serverURI}/api/upload/signature`,
          {},
          { headers: { Authorization: "Bearer " + token } }
        );
        const { signature, timestamp, apiKey, cloudName, folder } = sigResp.data;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("folder", folder);

        const cloudResp = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );

        setUploading(false);
        return {
          url: cloudResp.data.secure_url,
          publicId: cloudResp.data.public_id,
        };
      } catch (err) {
        setUploading(false);
        const msg = err.response?.data?.error?.message || err.message || "Upload échoué";
        setError(msg);
        throw err;
      }
    },
    [token]
  );

  return { upload, uploading, error };
};
