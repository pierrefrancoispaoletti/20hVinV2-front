import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AdminButton,
  AdminButtonBarContainer,
  AdminButtonContainer,
} from "./admin-button-bar.style";
import {
  deleteProduct,
  updateProdut,
} from "../../redux/reducers/Products/querries";
import {
  setProductToEdit,
  toggleModal,
} from "../../redux/reducers/Products/actions";
import { selectCurrentUser } from "../../redux/reducers/User/selector";
import {
  faCamera,
  faEdit,
  faEye,
  faEyeSlash,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useCloudinaryUpload } from "../../hooks/useCloudinaryUpload";
import { colors } from "../../_const";

const AdminButtonBar = ({ _id, product }) => {
  const { token } = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { upload, uploading, progress } = useCloudinaryUpload(token);
  const canUploadImage = product?.category && product.category !== "cave";

  const handleImageFile = async (e) => {
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await upload(file);
      await updateProdut({ _id, image: result }, dispatch, token);
    } catch (_) {
      // erreur capturée dans le hook
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const triggerPicker = (e) => {
    e.stopPropagation();
    if (!uploading) inputRef.current?.click();
  };

  return (
    <AdminButtonBarContainer>
      <AdminButtonContainer>
        <AdminButton
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleModal("editer"));
            dispatch(setProductToEdit(product));
          }}
        >
          <FontAwesomeIcon icon={faEdit} size="2x" color="purple" />
        </AdminButton>
      </AdminButtonContainer>
      {canUploadImage && (
        <AdminButtonContainer>
          <AdminButton
            type="button"
            onClick={triggerPicker}
            disabled={uploading}
            title={
              product?.image?.url ? "Changer l'image" : "Ajouter une image"
            }
          >
            <FontAwesomeIcon
              icon={uploading ? faSpinner : faCamera}
              size="2x"
              color={colors.accent}
              spin={uploading}
            />
            {uploading && progress > 0 && (
              <span
                style={{
                  position: "absolute",
                  bottom: -2,
                  left: 4,
                  right: 4,
                  fontSize: "0.6rem",
                  textAlign: "center",
                  color: colors.accent,
                }}
              >
                {progress}%
              </span>
            )}
          </AdminButton>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageFile}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clip: "rect(0,0,0,0)",
              border: 0,
            }}
          />
        </AdminButtonContainer>
      )}
      <AdminButtonContainer>
        <AdminButton
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            updateProdut({ _id, visible: !product?.visible }, dispatch, token);
          }}
        >
          <FontAwesomeIcon
            icon={product?.visible ? faEye : faEyeSlash}
            size="2x"
            color="grey"
          />
        </AdminButton>
      </AdminButtonContainer>
      <AdminButtonContainer>
        <AdminButton
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            deleteProduct(_id, dispatch, token);
          }}
        >
          <FontAwesomeIcon icon={faTrash} size="2x" color="red" />
        </AdminButton>
      </AdminButtonContainer>
    </AdminButtonBarContainer>
  );
};

export default AdminButtonBar;
