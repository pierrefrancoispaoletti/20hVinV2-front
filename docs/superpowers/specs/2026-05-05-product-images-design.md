# Gestion des images produits — Design

**Date :** 2026-05-05
**Scope :** Frontend (`20hVinV2-front`) + Backend (`20v20V2Server`)
**Catégories concernées :** Plats + Événements (les vins gardent leur barre couleur, pas d'image)

## Objectif

Permettre à l'admin d'attacher une image à un produit (plat ou événement). Côté visiteur :
- Vignette dans la liste si image présente.
- Tap sur le produit ouvre un bottom sheet avec hero image + détail texte.
- Tap sur le hero image ouvre un lightbox plein écran.
- Si pas d'image : aucune section image (ni vignette, ni hero, ni placeholder).

## Architecture

Stockage : **Cloudinary**. Upload signé côté backend (option C) :

```
Admin (front)
  ─[1] POST /upload/signature  (Bearer token admin)──►  Backend
  ◄─[2] { signature, timestamp, apiKey, cloudName, folder }
  ─[3] POST FormData direct ──►  api.cloudinary.com/v1_1/{cloudName}/image/upload
  ◄─[4] { secure_url, public_id }
  ─[5] PATCH /products/:id { image: { url, publicId } } ──►  Backend ──► Mongo
```

Suppression / remplacement : le backend appelle `cloudinary.uploader.destroy(publicId)` lorsque le produit est supprimé ou que `image.publicId` change.

**Pourquoi signed via signature (pas via binaire backend) :**
- Heroku ne transite pas les fichiers (bande passante & temps).
- La signature exige un token admin valide → seul un admin authentifié peut uploader.
- Signature expire (timestamp Cloudinary, ~1h max).

## Modifications backend (`20v20V2Server`)

### Dépendances
- Ajouter `cloudinary` (Node SDK officiel) dans `package.json`.

### Variables d'environnement (`.env` local + Heroku config)
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### Modèle `database/models/Products.js`
Ajouter :
```js
image: {
  url:      { type: String },
  publicId: { type: String },
}
```
Optionnel, pas de `required`.

### Nouveau `controllers/upload.controller.js`
- `getUploadSignature(req, res)` :
  - Protégé par middleware `verifytoken` + vérification `role === "isAdmin"`.
  - Calcule `timestamp = Math.round(Date.now() / 1000)`.
  - `params_to_sign = { timestamp, folder: "20hvin/products" }`.
  - `signature = cloudinary.utils.api_sign_request(params_to_sign, API_SECRET)`.
  - Retourne `{ signature, timestamp, apiKey, cloudName, folder }`.
- `deleteImage(req, res)` :
  - Body : `{ publicId }`. Admin only.
  - Appelle `cloudinary.uploader.destroy(publicId)`. Best-effort (try/catch).

### Nouvelle route `routes/upload.routes.js`
- `POST /upload/signature` → `getUploadSignature`
- `POST /upload/delete` → `deleteImage`
- Montée dans `index.js` derrière `verifytoken`.

### Modification `controllers/products.controller.js`
- **Update** : si l'ancien `image.publicId` existe et est différent du nouveau (ou si la nouvelle image est `null`), appeler `cloudinary.uploader.destroy(oldPublicId)` en best-effort avant de sauvegarder.
- **Delete** : si `product.image?.publicId` existe, appeler `destroy` en best-effort avant `findByIdAndDelete`.

## Modifications frontend (`20hVinV2-front`)

### `src/_const.js`
```js
export const serverURI =
  process.env.NODE_ENV === "production"
    ? "https://a-20h20-server-v2-6f2c2d3816e2.herokuapp.com"
    : "http://localhost:4000";

export const CLOUDINARY_CLOUD_NAME = "<cloud-name>"; // public, OK en clair
```
Le backend local devra être démarré avec `PORT=4000 npm run server` (8080 occupé).

### Nouveau hook `src/hooks/useCloudinaryUpload.js`
Signature : `useCloudinaryUpload(token) → { upload, uploading, error }`
- `upload(file)` :
  1. `POST {serverURI}/upload/signature` avec Bearer token.
  2. Construit `FormData` (file, signature, timestamp, api_key, folder) et POST direct à `https://api.cloudinary.com/v1_1/{cloudName}/image/upload`.
  3. Renvoie `{ url: data.secure_url, publicId: data.public_id }`.
- Validation côté front : `file.type ∈ {image/jpeg, image/png, image/webp}`, `file.size ≤ 5 Mo`.

### `src/components/ProductModalForm/ProductModalForm.js`
- Étendre `initialState` côté `ProductModal` avec `image: null`.
- Afficher la section "Image" uniquement si `category !== "cave"` (les catégories sont dynamiques côté backend, on exclut la seule qui ne doit pas avoir d'image).
- UI :
  - Aperçu (image actuelle ou nouvelle uploadée).
  - `<input type="file" accept="image/jpeg,image/png,image/webp">`.
  - Bouton "Supprimer l'image" si `image` existe.
  - Indicateur d'upload (spinner pendant `uploading`).
- Sur upload réussi : `setProduct(prev => ({ ...prev, image: { url, publicId } }))`.
- Sur "Supprimer" : `setProduct(prev => ({ ...prev, image: null }))`.
- `handleSubmit` inclut `image` dans le payload envoyé à `addProduct` / `updateProdut`.

### `src/components/ImageElement/ImageElement.js`
Adapter pour accepter une URL Cloudinary brute et générer la transformation à la volée :
```js
const cloudinaryThumb = (url, w, h) =>
  url.replace("/upload/", `/upload/c_fill,g_auto,w_${w},h_${h},f_auto,q_auto/`);
```
Props : `image, alt, width, height`.

### `src/components/ProductElement/ProductElement.js`
- Si `product.image?.url`, afficher vignette ~56×56 (rounded) à gauche du titre via `ImageElement` + `loading="lazy"`.
- Rendre la `TableauContent` cliquable (sauf zone admin) → ouvre `ProductDetailSheet`.
- État local du sheet géré par un nouveau contexte ou state lifté dans `TableauHomePage` (préférable : éviter le couplage admin modal / detail sheet).

### Nouveau `src/components/ProductDetailSheet/`
- `ProductDetailSheet.js` + `product-detail-sheet.style.js`.
- Props : `product, open, onClose`.
- Animation : `translateY(100%)` → `translateY(0)` (300ms ease-out), backdrop `rgba(0,0,0,0.6)`.
- Fermeture : tap backdrop, bouton close, swipe-down (geste tactile basique sur mobile).
- Layout :
  - Si `image.url` : hero image largeur 100%, max-height 50vh, `c_fill,g_auto,w_800,f_auto,q_auto`. Tap → ouvre `Lightbox`.
  - Titre, description, prix OU (date + heure) selon `category`.
  - Pas de section vins (les vins n'ouvrent pas le sheet).
- Bloque le scroll body quand ouvert.

### Nouveau `src/components/Lightbox/`
- Overlay noir plein écran, image centrée en `c_limit,w_1600,f_auto,q_auto`.
- Ferme au tap (overlay ou image), bouton close en haut à droite.
- z-index supérieur au sheet.

## Flow d'erreur

| Cas | Comportement |
|-----|--------------|
| Upload Cloudinary échoue | Toast erreur, form reste éditable, produit non modifié. |
| Fichier > 5 Mo ou type invalide | Erreur affichée avant upload, file input réinitialisé. |
| `cloudinary.uploader.destroy` échoue | Logué côté serveur, n'échoue pas la requête principale (orphelin accepté). |
| Update Mongo échoue après upload | Image téléversée orpheline (acceptable, cleanup manuel possible). |
| Bottom sheet ouvert sans image | Pas de zone image, juste le contenu texte. |

## Vérification manuelle (pas de tests automatisés — le projet n'en a pas)

1. `cd 20v20V2Server && PORT=4000 npm run server`
2. `cd 20hVinV2-front && npm start`
3. Login admin, ajouter un plat avec image → vignette apparaît dans la liste.
4. Tap produit (visiteur) → bottom sheet monte, image hero visible.
5. Tap image hero → lightbox plein écran.
6. Édition admin : remplacer l'image → vérifier sur Cloudinary que l'ancienne est supprimée.
7. Supprimer le produit → vérifier suppression Cloudinary.
8. Ajouter un produit sans image → bottom sheet sans zone image, pas de vignette dans la liste.
9. Build prod (`npm run build`) sans erreur, `serverURI` pointe bien vers Heroku.

## Hors scope (volontaire)

- Pas de carousel multi-images (single image par produit).
- Pas de placeholder si image absente.
- Pas de drag-and-drop dans le file input (clic standard suffisant).
- Pas de cropping côté admin (Cloudinary `g_auto` gère le cadrage à la volée).
- Pas d'images sur les vins.
