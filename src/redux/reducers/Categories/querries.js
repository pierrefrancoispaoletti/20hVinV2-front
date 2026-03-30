import axios from "axios";
import { serverURI } from "../../../_const";
import { setUserMessage } from "../User/actions";
import {
  getCategoriesAction,
  addCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
  reorderCategoriesAction,
} from "./actions";

export const getCategories = async (dispatch) => {
  try {
    const response = await axios.get(`${serverURI}/api/categories`);
    if (response.status === 200) {
      dispatch(getCategoriesAction(response.data));
    }
  } catch (error) {
    console.log("Erreur chargement catégories", error);
  }
};

export const addCategory = async (category, dispatch, token) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${serverURI}/api/categories/addCategory`,
      data: { category },
      headers: { Authorization: "Bearer " + token },
    });
    if (response.status === 201) {
      dispatch(addCategoryAction(response.data.newCategory));
    }
    dispatch(setUserMessage(response.data.message));
  } catch (error) {
    dispatch(setUserMessage("Il y à eu un problème"));
  }
};

export const updateCategory = async (update, dispatch, token) => {
  try {
    const response = await axios({
      method: "PUT",
      url: `${serverURI}/api/categories/${update._id}`,
      data: { update },
      headers: { Authorization: "Bearer " + token },
    });
    if (response.status === 202) {
      dispatch(updateCategoryAction(response.data.updatedCategory));
    }
    dispatch(setUserMessage(response.data.message));
  } catch (error) {
    dispatch(setUserMessage("Il y à eu un problème"));
  }
};

export const deleteCategory = async (id, dispatch, token) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: `${serverURI}/api/categories/deleteCategory`,
      data: { _id: id },
      headers: { Authorization: "Bearer " + token },
    });
    if (response.status === 202) {
      dispatch(deleteCategoryAction(response.data.deletedCategory));
    }
    dispatch(setUserMessage(response.data.message));
  } catch (error) {
    dispatch(setUserMessage("Il y à eu un problème"));
  }
};

export const reorderCategories = async (items, dispatch, token) => {
  try {
    const response = await axios({
      method: "PUT",
      url: `${serverURI}/api/categories/reorder`,
      data: { items },
      headers: { Authorization: "Bearer " + token },
    });
    if (response.status === 202) {
      dispatch(reorderCategoriesAction(response.data));
    }
  } catch (error) {
    console.log("Erreur réordonnancement", error);
  }
};
