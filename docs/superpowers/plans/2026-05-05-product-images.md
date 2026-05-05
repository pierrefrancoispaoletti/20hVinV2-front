# Product Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Permettre à l'admin d'attacher une image (Cloudinary) aux produits non-vins, l'afficher en vignette dans la liste, et ouvrir un bottom sheet de détail au tap (avec lightbox sur l'image).

**Architecture:** Upload signé — backend (`20v20V2Server`) signe une requête Cloudinary, le front upload directement à Cloudinary, puis sauve `{url, publicId}` dans Mongo via les routes existantes. Le binaire ne transite pas par Heroku. Suppression Cloudinary best-effort à l'update / delete.

**Tech Stack:** Cloudinary Node SDK (backend), `fetch` natif (front upload direct), React 17 + styled-components + Redux existants. Pas de framework de tests dans le projet → vérification manuelle après chaque tâche.

**Spec source :** `docs/superpowers/specs/2026-05-05-product-images-design.md`

**Repos concernés :**
- Front : `/Users/pierrefrancoispaoletti/appdevelopment/20hVinV2-front` (branche `feat/product-images`)
- Back : `/Users/pierrefrancoispaoletti/appdevelopment/20v20V2Server` (créer une branche `feat/product-images` lors de Task 1)

---

## File Structure

**Backend (`20v20V2Server/`)**
- Modify : `package.json` — ajouter `cloudinary`
- Modify : `database/models/Products.js` — ajouter champ `image`
- Create : `controllers/upload.controller.js` — signature + delete
- Create : `routes/upload.routes.js` — routes admin
- Modify : `index.js` — monter `/api/upload`
- Modify : `controllers/products.controller.js` — cleanup Cloudinary à update/delete
- Modify : `.env` (local) — ajouter clés Cloudinary

**Frontend (`20hVinV2-front/`)**
- Modify : `src/_const.js` — `serverURI` dev → `localhost:4000`, ajouter `CLOUDINARY_CLOUD_NAME`
- Create : `src/hooks/useCloudinaryUpload.js` — hook upload signé
- Modify : `src/components/ImageElement/ImageElement.js` — transformation Cloudinary à la volée
- Modify : `src/components/ProductModal/ProductModal.js` — `image: null` dans `initialState`
- Modify : `src/components/ProductModalForm/ProductModalForm.js` — section Image (admin)
- Create : `src/components/ProductModalForm/ImageUploadField.js` — UI upload isolée
- Modify : `src/components/ProductElement/ProductElement.js` — vignette + click handler
- Create : `src/components/ProductDetailSheet/ProductDetailSheet.js`
- Create : `src/components/ProductDetailSheet/product-detail-sheet.style.js`
- Create : `src/components/Lightbox/Lightbox.js`
- Create : `src/components/Lightbox/lightbox.style.js`
- Modify : `src/components/TableauHomePage/TableauHomePage.js` — état du detail sheet

---

## Task 1: Backend — Setup branche, env, dépendance Cloudinary

**Files:**
- Modify: `20v20V2Server/package.json`
- Modify: `20v20V2Server/.env` (créer si absent en local)

- [ ] **Step 1: Créer branche backend**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/20v20V2Server
git checkout -b feat/product-images
```

- [ ] **Step 2: Installer le SDK Cloudinary**

```bash
npm install cloudinary
```

- [ ] **Step 3: Demander à l'utilisateur les clés Cloudinary**

Demander à l'utilisateur (interactivement) :
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

L'utilisateur doit créer un compte sur cloudinary.com (free tier) et récupérer ces valeurs depuis le dashboard. **Ne pas inventer ces valeurs.** Si l'utilisateur n'a pas encore de compte, s'arrêter ici et lui demander de créer le compte avant de continuer.

- [ ] **Step 4: Ajouter les clés au `.env` local**

Lire `.env` actuel (ne pas écraser) puis ajouter à la fin :

```
CLOUDINARY_CLOUD_NAME=<valeur fournie>
CLOUDINARY_API_KEY=<valeur fournie>
CLOUDINARY_API_SECRET=<valeur fournie>
```

- [ ] **Step 5: Vérifier que le serveur démarre toujours**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/20v20V2Server
PORT=4000 npm run server
```

Expected: log `Server running on port 4000`. Couper le process (Ctrl+C) une fois vérifié.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add cloudinary SDK dependency"
```

(Le `.env` est dans `.gitignore` — ne pas commit.)

---

## Task 2: Backend — Modèle Products avec champ `image`

**Files:**
- Modify: `20v20V2Server/database/models/Products.js`

- [ ] **Step 1: Ajouter le champ `image` au schéma**

Remplacer le contenu de `database/models/Products.js` par :

```js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductModel = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: true,
    required: true,
  },
  couleur: {
    type: Array,
  },
  subCategory: {
    type: String,
  },
  date: {
    type: Date,
    required: false,
  },
  heure: {
    type: String,
    required: false,
  },
  show: {
    type: String,
    required: false,
    default: "always",
  },
  image: {
    url: { type: String },
    publicId: { type: String },
  },
});

const Product = mongoose.model("products", ProductModel);
module.exports = Product;
```

- [ ] **Step 2: Vérifier que le serveur démarre toujours**

```bash
PORT=4000 npm run server
```

Expected: démarre sans erreur. Couper.

- [ ] **Step 3: Commit**

```bash
git add database/models/Products.js
git commit -m "feat: add image field to product schema"
```

---

## Task 3: Backend — Controller `upload` (signature + delete)

**Files:**
- Create: `20v20V2Server/controllers/upload.controller.js`

- [ ] **Step 1: Créer le controller**

Créer `controllers/upload.controller.js` avec :

```js
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const FOLDER = "20hvin/products";

exports.getUploadSignature = async (req, res) => {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const paramsToSign = { timestamp, folder: FOLDER };
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    return res.status(200).json({
      signature,
      timestamp,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      folder: FOLDER,
    });
  } catch (error) {
    console.log("[upload.signature]", error);
    return res.status(500).json({ message: "Signature impossible" });
  }
};

exports.deleteImage = async (req, res) => {
  const { publicId } = req.body;
  if (!publicId) {
    return res.status(400).json({ message: "publicId manquant" });
  }
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return res.status(200).json({ result });
  } catch (error) {
    console.log("[upload.delete]", error);
    return res.status(500).json({ message: "Suppression impossible" });
  }
};

exports.destroyCloudinaryAsset = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log("[cloudinary.destroy best-effort]", error);
  }
};
```

`destroyCloudinaryAsset` est exporté pour être réutilisé dans `products.controller.js` (Task 5).

- [ ] **Step 2: Commit**

```bash
git add controllers/upload.controller.js
git commit -m "feat: cloudinary upload signature + delete controller"
```

---

## Task 4: Backend — Routes upload (admin only) + branchement

**Files:**
- Create: `20v20V2Server/routes/upload.routes.js`
- Modify: `20v20V2Server/index.js`

- [ ] **Step 1: Créer la route**

Créer `routes/upload.routes.js` :

```js
const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getUploadSignature,
  deleteImage,
} = require("../controllers/upload.controller");

router.post(
  "/signature",
  passport.authenticate("jwt", { session: false }),
  getUploadSignature
);

router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  deleteImage
);

module.exports = router;
```

- [ ] **Step 2: Monter la route dans `index.js`**

Dans `20v20V2Server/index.js`, après la ligne `const push = require("./routes/push.routes");`, ajouter :

```js
const upload = require("./routes/upload.routes");
```

Et après `app.use("/api/push", push);`, ajouter :

```js
app.use("/api/upload", upload);
```

- [ ] **Step 3: Tester la route avec curl (sans token → 401)**

```bash
PORT=4000 npm run server &
sleep 2
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:4000/api/upload/signature
kill %1
```

Expected: `401` (Unauthorized — pas de token).

- [ ] **Step 4: Tester la route avec token admin (manuel)**

Demander à l'utilisateur de fournir un token admin valide (login via le front en dev, copier le token depuis Redux DevTools ou localStorage `persist:user`). Puis :

```bash
PORT=4000 npm run server &
sleep 2
curl -s -X POST http://localhost:4000/api/upload/signature \
  -H "Authorization: Bearer <TOKEN>"
kill %1
```

Expected: JSON `{ signature, timestamp, apiKey, cloudName, folder: "20hvin/products" }`.

- [ ] **Step 5: Commit**

```bash
git add routes/upload.routes.js index.js
git commit -m "feat: mount /api/upload routes (admin only)"
```

---

## Task 5: Backend — Cleanup Cloudinary à l'update/delete produit

**Files:**
- Modify: `20v20V2Server/controllers/products.controller.js`

- [ ] **Step 1: Importer `destroyCloudinaryAsset` et l'utiliser**

Remplacer le contenu de `controllers/products.controller.js` par :

```js
const Product = require("../database/models/Products");
const { destroyCloudinaryAsset } = require("./upload.controller");

exports.getAllProducts = async (req, res) => {
  let { location } = req.params;

  try {
    const products = await Product.find({ location }).sort({
      price: 1,
    });

    return res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Il y a eu un problème",
    });
  }
};

exports.getProductsByLocation = async (req, res) => {
  let { location, category } = req.params;

  if (!location || !category) {
    return res.status(500).json({
      message: "Il y a eu un problème",
    });
  }
  try {
    let products = await Product.find({
      location: location,
      category: category,
    });

    if (products.length > 0) {
      return res.status(200).json({
        products,
      });
    } else {
      return res.status(200).json({
        products: [],
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Il y a eu un problème",
    });
  }
};

exports.addProduct = async (req, res) => {
  const { product } = req.body;
  try {
    const newProduct = await new Product({ ...product }).save();
    if (newProduct) {
      return res.status(201).json({
        message: `Nouveau produit crée ${newProduct.title}`,
        newProduct,
      });
    } else {
      return res.status(400).json({
        message: "Il y à eu un probléme lors de la création du produit",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Il y a eu un problème",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { _id } = req.body;
  try {
    const existing = await Product.findById(_id);
    const deletedProduct = await Product.findByIdAndDelete({ _id });

    if (deletedProduct) {
      // Best-effort cleanup of Cloudinary asset
      if (existing?.image?.publicId) {
        await destroyCloudinaryAsset(existing.image.publicId);
      }
      return res.status(202).json({
        message: `Produit ${deletedProduct.title} supprimé avec succés`,
        deletedProduct,
      });
    } else {
      return res.status(400).json({
        message: "Il y à eu un probléme lors de la suppression du produit",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Il y à eu un problème",
    });
  }
};

exports.updateProduct = async (req, res) => {
  const { update } = req.body;
  const { _id, ...otherProps } = update;
  try {
    const previous = await Product.findById(_id);
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id },
      { ...otherProps },
      { upsert: true, new: true }
    );

    if (updatedProduct) {
      // Best-effort cleanup if image.publicId changed or was removed
      const oldId = previous?.image?.publicId;
      const newId = updatedProduct.image?.publicId;
      if (oldId && oldId !== newId) {
        await destroyCloudinaryAsset(oldId);
      }
      return res.status(202).json({
        message: `Produit ${updatedProduct.title} modifié avec succés`,
        updatedProduct,
      });
    } else {
      return res.status(400).json({
        message: "Il y à eu un probléme lors de la modification du produit",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Il y à eu un problème",
    });
  }
};
```

- [ ] **Step 2: Vérifier le démarrage**

```bash
PORT=4000 npm run server
```

Expected: démarre sans erreur. Couper.

- [ ] **Step 3: Commit**

```bash
git add controllers/products.controller.js
git commit -m "feat: best-effort cloudinary cleanup on product update/delete"
```

Backend terminé. Le reste du plan se passe dans `20hVinV2-front` (branche `feat/product-images` déjà créée).

---

## Task 6: Front — Config dev et constante Cloudinary

**Files:**
- Modify: `src/_const.js`

- [ ] **Step 1: Mettre à jour `_const.js`**

Remplacer les lignes 2-5 :

```js
export const serverURI =
  process.env.NODE_ENV === "production"
    ? "https://a-20h20-server-v2-6f2c2d3816e2.herokuapp.com"
    : "https://a-20h20-server-v2-6f2c2d3816e2.herokuapp.com";
```

par :

```js
export const serverURI =
  process.env.NODE_ENV === "production"
    ? "https://a-20h20-server-v2-6f2c2d3816e2.herokuapp.com"
    : "http://localhost:4000";
```

Puis ajouter, après la ligne `export const placeLocation = "20hvin";` :

```js
export const CLOUDINARY_CLOUD_NAME = "<même valeur que CLOUDINARY_CLOUD_NAME du backend>";
```

L'utilisateur doit fournir cette valeur (la même que celle utilisée à Task 1). C'est public, OK en clair.

- [ ] **Step 2: Vérifier**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/20hVinV2-front
npm start
```

Expected: app démarre, pas d'erreur de compilation. Si le backend local n'est pas démarré, les requêtes échoueront — c'est normal à ce stade. Couper.

- [ ] **Step 3: Commit**

```bash
git add src/_const.js
git commit -m "chore: dev serverURI to localhost:4000 + cloudinary cloud name"
```

---

## Task 7: Front — Hook `useCloudinaryUpload`

**Files:**
- Create: `src/hooks/useCloudinaryUpload.js`

- [ ] **Step 1: Créer le hook**

Créer le dossier puis le fichier :

```bash
mkdir -p src/hooks
```

`src/hooks/useCloudinaryUpload.js` :

```js
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
```

- [ ] **Step 2: Vérifier compilation**

```bash
npm start
```

Expected: build sans erreur. Couper.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useCloudinaryUpload.js
git commit -m "feat: useCloudinaryUpload hook (signed upload to cloudinary)"
```

---

## Task 8: Front — `ImageElement` adapté à Cloudinary

**Files:**
- Modify: `src/components/ImageElement/ImageElement.js`

- [ ] **Step 1: Remplacer le composant**

```js
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
```

- [ ] **Step 2: Vérifier compilation**

```bash
npm start
```

Expected: build sans erreur (le composant n'est pas encore consommé activement). Couper.

- [ ] **Step 3: Commit**

```bash
git add src/components/ImageElement/ImageElement.js
git commit -m "feat: ImageElement applies cloudinary transformations"
```

---

## Task 9: Front — Champ image dans le form admin

**Files:**
- Create: `src/components/ProductModalForm/ImageUploadField.js`
- Modify: `src/components/ProductModalForm/ProductModalForm.js`
- Modify: `src/components/ProductModal/ProductModal.js`

- [ ] **Step 1: Ajouter `image: null` au state initial**

Dans `src/components/ProductModal/ProductModal.js`, modifier `initialState` (lignes 31-47) en ajoutant `image: null` à la fin de l'objet, juste avant la `}` :

```js
  const initialState = {
    _id: "",
    title: "",
    description: "",
    price: "",
    location: placeLocation,
    category: "",
    visible: true,
    show: "always",
    couleur: [
      { value: "rouge", isChecked: false, price: "" },
      { value: "blanc", isChecked: false, price: "" },
      { value: "rosé", isChecked: false, price: "" },
      { value: "au verre", isChecked: false, price: "" },
    ],
    subCategory: "",
    image: null,
  };
```

- [ ] **Step 2: Créer `ImageUploadField`**

`src/components/ProductModalForm/ImageUploadField.js` :

```js
import React, { useRef } from "react";
import { useCloudinaryUpload } from "../../hooks/useCloudinaryUpload";
import ImageElement from "../ImageElement/ImageElement";

const ImageUploadField = ({ image, onChange, token }) => {
  const inputRef = useRef(null);
  const { upload, uploading, error } = useCloudinaryUpload(token);

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
      {uploading && <span style={{ marginLeft: 8 }}>Upload en cours…</span>}
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
```

- [ ] **Step 3: Brancher `ImageUploadField` dans `ProductModalForm`**

Dans `src/components/ProductModalForm/ProductModalForm.js` :

3a. Ajouter l'import en haut, après les autres imports :

```js
import ImageUploadField from "./ImageUploadField";
```

3b. Destructurer `image` parmi les props produit (ligne ~20) :

```js
  const {
    _id,
    title,
    description,
    price,
    category,
    location,
    visible,
    show,
    couleur,
    subCategory,
    date,
    heure,
    image,
  } = product;
```

3c. Ajouter `image` au payload `newProduct` dans `handleSubmit` :

```js
    let newProduct = {
      title,
      description,
      price,
      category,
      location,
      visible,
      show,
      couleur,
      subCategory,
      date,
      heure,
      image,
    };
```

3d. Insérer le champ Image dans le JSX, juste avant `{children}` (qui est ~ligne 142) :

```jsx
      {category && category !== "cave" && (
        <ImageUploadField
          image={image}
          token={token}
          onChange={(value) =>
            setProduct((prev) => ({ ...prev, image: value }))
          }
        />
      )}
      {children}
```

- [ ] **Step 4: Vérification manuelle**

1. Démarrer backend : `cd /Users/pierrefrancoispaoletti/appdevelopment/20v20V2Server && PORT=4000 npm run server`
2. Démarrer front : `npm start`
3. Login admin via `/connexion`.
4. Aller sur une catégorie de plats, cliquer "Ajouter un produit".
5. Section "Image (optionnelle)" doit apparaître dans le form.
6. Sélectionner une image JPEG < 5 Mo → upload spinner → aperçu apparaît.
7. Tenter un fichier > 5 Mo ou un .pdf → message d'erreur affiché, pas d'upload.
8. Cliquer "Supprimer l'image" → aperçu disparaît, file input réinitialisé.
9. Renseigner titre + prix + catégorie, soumettre → produit créé en base avec champ `image: { url, publicId }` (vérifier dans Mongo ou via réponse réseau).
10. Aller sur catégorie "cave" → pas de section Image (test du gating).

- [ ] **Step 5: Commit**

```bash
git add src/components/ProductModalForm/ImageUploadField.js src/components/ProductModalForm/ProductModalForm.js src/components/ProductModal/ProductModal.js
git commit -m "feat: image upload field in admin product form"
```

---

## Task 10: Front — Vignette dans `ProductElement` + state du detail sheet

**Files:**
- Modify: `src/components/ProductElement/ProductElement.js`
- Modify: `src/components/TableauHomePage/TableauHomePage.js`

- [ ] **Step 1: Ajouter le state du detail sheet dans `TableauHomePage`**

Lire d'abord `src/components/TableauHomePage/TableauHomePage.js` pour comprendre comment `ProductElement` est rendu (probablement dans une `.map`). Ajouter en haut du composant :

```js
  const [activeProduct, setActiveProduct] = useState(null);
```

Puis passer `onOpen={setActiveProduct}` au `ProductElement` rendu, et ajouter en bas du JSX (juste avant la fermeture du composant racine) :

```jsx
      <ProductDetailSheet
        product={activeProduct}
        open={!!activeProduct}
        onClose={() => setActiveProduct(null)}
      />
```

Ajouter les imports :

```js
import { useState } from "react";
import ProductDetailSheet from "../ProductDetailSheet/ProductDetailSheet";
```

(`useState` peut déjà être importé — ne pas dupliquer.)

> **Note d'exécution :** `ProductDetailSheet` n'existe pas encore — le build cassera après cette étape jusqu'à Task 11. C'est OK : on commit à la fin de Task 11. **Ne pas commit Task 10 isolément.**

- [ ] **Step 2: Modifier `ProductElement` pour vignette + click**

Dans `src/components/ProductElement/ProductElement.js`, modifier la signature et le JSX. Remplacer le composant actuel par cette version (qui ajoute `onOpen`, la vignette, et le click handler — sans casser la zone admin) :

```js
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
  const canOpenSheet = !isCave && typeof onOpen === "function";

  const handleClick = (e) => {
    // Ne pas ouvrir le sheet si le clic vient de la zone admin (boutons d'édition)
    if (e.target.closest("[data-admin-bar]")) return;
    if (canOpenSheet) onOpen(product);
  };

  return (
    <TableauContent
      visible={user?.role === "isAdmin" || visible}
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

      <div
        style={
          hasWineBar
            ? { flex: 1, padding: "0", display: "flex", gap: 12, alignItems: "center" }
            : { display: "flex", gap: 12, alignItems: "center" }
        }
      >
        {image?.url && !isCave && (
          <ImageElement
            image={image.url}
            width={56}
            height={56}
            alt={title}
            style={{ borderRadius: 8, objectFit: "cover", flexShrink: 0 }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          {user && user.role === "isAdmin" && (
            <div data-admin-bar>
              <AdminButtonBar _id={_id} product={product} />
            </div>
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
      </div>
    </TableauContent>
  );
};

export default ProductElement;
```

> Pas de commit ici — on enchaîne avec Task 11.

---

## Task 11: Front — `ProductDetailSheet` (bottom sheet)

**Files:**
- Create: `src/components/ProductDetailSheet/ProductDetailSheet.js`
- Create: `src/components/ProductDetailSheet/product-detail-sheet.style.js`

- [ ] **Step 1: Créer les styles**

```bash
mkdir -p src/components/ProductDetailSheet
```

`src/components/ProductDetailSheet/product-detail-sheet.style.js` :

```js
import styled, { keyframes } from "styled-components";
import { colors } from "../../_const";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  animation: ${fadeIn} 200ms ease-out;
`;

export const SheetContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  background: ${colors.surface};
  color: ${colors.ecriture};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideUp} 300ms ease-out;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.4);
`;

export const Handle = styled.div`
  width: 40px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  margin: 12px auto 0;
`;

export const HeroImage = styled.img`
  width: 100%;
  max-height: 50vh;
  object-fit: cover;
  display: block;
  cursor: zoom-in;
`;

export const Body = styled.div`
  padding: 20px 24px 32px;
`;

export const Title = styled.h2`
  margin: 0 0 8px;
  font-size: 1.5rem;
`;

export const Meta = styled.div`
  color: ${colors.accent};
  margin-bottom: 16px;
  font-weight: 600;
`;

export const Description = styled.p`
  line-height: 1.6;
  white-space: pre-wrap;
  margin: 0;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 18px;
  cursor: pointer;
  z-index: 2;
`;
```

- [ ] **Step 2: Créer le composant**

`src/components/ProductDetailSheet/ProductDetailSheet.js` :

```js
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
    ? image.url.replace("/upload/", "/upload/c_fill,g_auto,w_800,f_auto,q_auto/")
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
```

> Le build cassera tant que `Lightbox` n'existe pas. On enchaîne avec Task 12 avant tout commit.

---

## Task 12: Front — `Lightbox` plein écran

**Files:**
- Create: `src/components/Lightbox/Lightbox.js`
- Create: `src/components/Lightbox/lightbox.style.js`

- [ ] **Step 1: Créer les styles**

```bash
mkdir -p src/components/Lightbox
```

`src/components/Lightbox/lightbox.style.js` :

```js
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
  animation: ${fadeIn} 200ms ease-out;
`;

export const FullImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 22px;
  cursor: pointer;
`;
```

- [ ] **Step 2: Créer le composant**

`src/components/Lightbox/Lightbox.js` :

```js
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
  const fullSrc = image.replace("/upload/", "/upload/c_limit,w_1600,f_auto,q_auto/");

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
```

> **Note UX :** sur le clic image, on `stopPropagation` pour permettre une éventuelle interaction zoom future, mais l'overlay et le bouton close ferment. Au tap (mobile) sur l'image elle-même, l'utilisateur cible naturellement l'overlay autour — accepté.

- [ ] **Step 3: Vérification compilation**

```bash
npm start
```

Expected: build sans erreur.

- [ ] **Step 4: Vérification manuelle complète**

Backend toujours démarré sur 4000.

1. Ouvrir l'app, aller sur une catégorie de plats.
2. Le produit avec image (créé en Task 9) doit montrer une vignette 56×56 à gauche du titre.
3. Cliquer sur le produit → bottom sheet monte depuis le bas avec image hero + titre + description + prix.
4. Cliquer sur l'image hero → lightbox plein écran.
5. Cliquer sur l'overlay du lightbox / bouton × / touche Escape → ferme le lightbox, sheet toujours visible.
6. Cliquer sur le backdrop du sheet / × / pas de bouton swipe → sheet se ferme.
7. Sur un produit **sans** image : pas de vignette dans la liste. Cliquer le produit → sheet s'ouvre, **pas de zone image**, juste titre + meta + description.
8. Sur un produit de la catégorie **cave** : pas de cliquable, pas d'ouverture de sheet (gating respecté).
9. En tant qu'admin, cliquer sur un bouton d'édition (crayon) → ne déclenche **pas** l'ouverture du sheet (test du `data-admin-bar`).
10. Édition : modifier un produit existant, remplacer son image → vérifier dans Cloudinary (dashboard) que l'ancien asset est supprimé après un court délai.
11. Suppression : supprimer un produit avec image → asset Cloudinary supprimé.

- [ ] **Step 5: Commit final des composants visiteur**

```bash
git add src/components/TableauHomePage/TableauHomePage.js \
        src/components/ProductElement/ProductElement.js \
        src/components/ProductDetailSheet/ \
        src/components/Lightbox/
git commit -m "feat: product detail bottom sheet + image lightbox"
```

---

## Task 13: Vérification finale et préparation merge

**Files:** —

- [ ] **Step 1: Build prod sans erreur**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/20hVinV2-front
npm run build
```

Expected: build réussi (`Compiled successfully`). En prod, `serverURI` pointe bien vers Heroku — vérifier dans le bundle (`grep -r "localhost:4000" build/static/js` doit ne rien retourner).

- [ ] **Step 2: Vérifier les git status des deux repos**

```bash
cd /Users/pierrefrancoispaoletti/appdevelopment/20v20V2Server && git status && git log --oneline main..HEAD
cd /Users/pierrefrancoispaoletti/appdevelopment/20hVinV2-front && git status && git log --oneline main..HEAD
```

Expected: chaque repo sur sa branche `feat/product-images`, working tree propre, série de commits cohérente.

- [ ] **Step 3: Ne pas merger sans validation utilisateur**

S'arrêter ici. Présenter à l'utilisateur :
- Les commits ajoutés des deux côtés.
- Le rappel : avant de merger en `main`, il faut déployer le backend (variables d'env Heroku `CLOUDINARY_*` à configurer côté Heroku) sinon le front prod ne pourra pas signer les uploads.
- Demander si on merge maintenant ou si on garde la branche le temps de tester en conditions réelles.

---

## Notes pour l'exécutant

- **Ordre strict des tâches.** Backend (1→5) avant front (6→13). Le hook `useCloudinaryUpload` (Task 7) suppose que `/api/upload/signature` répond — démarrer le backend local pour tester.
- **Pas de tests unitaires** dans le projet — la vérification est manuelle. Ne pas inventer un framework de tests.
- **`.env` jamais commité.** Sur Heroku, configurer `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` via `heroku config:set` ou le dashboard.
- **Frequent commits.** Un commit par tâche logiquement complète. Tasks 10-12 partagent un commit final parce qu'elles sont mutuellement dépendantes (build cassé entre).
- **Tap mobile :** `onClick` sur les éléments React fonctionne sur mobile (synthèse du touch). Pas besoin de `onTouchEnd` séparé.
- **Pas de gestion swipe-down :** mentionnée dans la spec mais hors scope du plan (optionnel UX). Le close fonctionne via backdrop tap, bouton ×, et `Escape` (clavier). Si l'utilisateur le réclame plus tard, c'est une issue à part.
