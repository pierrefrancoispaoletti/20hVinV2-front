import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../redux/reducers/Products/actions";
import {
  selectModalType,
  selectProductToEdit,
} from "../../redux/reducers/Products/selectors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProductModalForm from "../ProductModalForm/ProductModalForm";
import WinePartProductModal from "../WinePartProductModal/WinePartProductModal";

import { placeLocation } from "../../_const";

import {
  AddProductModalContainer,
  AddProductTitle,
  CloseIconButton,
} from "./product-modal.style";
import { categories } from "../../data/categories/categories";
import SubCategoryPartProductModal from "../SubCategoryPartProductModal/SubCategoryPart.ProductModal";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ProductModal = ({ currentCategory }) => {
  const { type, open } = useSelector(selectModalType);
  const productToEdit = useSelector(selectProductToEdit);

  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    if (open) {
      setScrollPosition(window.scrollY);
    }
  }, [open]);

  const dispatch = useDispatch();
  const initialState = {
    _id: "",
    title: "",
    description: "",
    price: "",
    location: placeLocation,
    category: "",
    visible: true,
    couleur: [
      { value: "rouge", isChecked: false, price: "" },
      { value: "blanc", isChecked: false, price: "" },
      { value: "rosé", isChecked: false, price: "" },
    ],
    subCategory: "",
  };

  const [product, setProduct] = useState(initialState);

  useEffect(() => {
    if (type === "ajouter") {
      setProduct((prevState) => ({
        ...initialState,
        category: currentCategory,
        location: placeLocation,
      }));
    }
    if (type === "editer") {
      setProduct((prevState) => ({
        ...prevState,
        ...productToEdit,
      }));
    }
  }, [currentCategory, productToEdit, type, open]);

  const currentCategoryObject = categories.find(
    (category) => category.slug === currentCategory,
  );

  return (
    <AddProductModalContainer
      open={open}
      className='modal'
      scrollPosition={scrollPosition}
    >
      <AddProductTitle>
        <h3>{`${type?.toUpperCase()}`}</h3>
        <CloseIconButton
          type='button'
          onClick={() => dispatch(toggleModal(type))}
        >
          <FontAwesomeIcon
            icon={faTimes}
            size='1x'
          />
        </CloseIconButton>
      </AddProductTitle>
      <ProductModalForm
        type={type}
        setProduct={setProduct}
        initialState={initialState}
        dispatch={dispatch}
        {...product}
      >
        {currentCategory === "cave" && (
          <WinePartProductModal
            couleur={product.couleur}
            setProduct={setProduct}
          />
        )}
        {currentCategoryObject.subCategory && (
          <SubCategoryPartProductModal
            subCategories={currentCategoryObject.subCategory}
            setProduct={setProduct}
            subCategory={product.subCategory}
          />
        )}
      </ProductModalForm>
    </AddProductModalContainer>
  );
};

export default ProductModal;
