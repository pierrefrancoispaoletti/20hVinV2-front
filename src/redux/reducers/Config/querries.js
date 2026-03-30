import axios from "axios";
import { serverURI } from "../../../_const";
import { setUserMessage } from "../User/actions";
import { getConfigAction, updateConfigAction } from "./actions";

export const getConfig = async (dispatch) => {
  try {
    const response = await axios.get(`${serverURI}/api/config`);
    if (response.status === 200) {
      dispatch(getConfigAction(response.data));
    }
  } catch (error) {
    console.log("Erreur chargement config", error);
  }
};

export const updateConfig = async (update, dispatch, token) => {
  try {
    const response = await axios({
      method: "PUT",
      url: `${serverURI}/api/config`,
      data: { update },
      headers: { Authorization: "Bearer " + token },
    });
    if (response.status === 202) {
      dispatch(updateConfigAction(response.data.config));
    }
    dispatch(setUserMessage(response.data.message));
  } catch (error) {
    dispatch(setUserMessage("Il y à eu un problème"));
  }
};
