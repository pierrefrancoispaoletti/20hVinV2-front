import axios from "axios";
import { serverURI } from "../../../_const";
import { setUserMessage } from "../User/actions";
import {
  setPushPermission,
  setPushSubscription,
  setPushLoading,
} from "./actions";
import {
  isPushSupported,
  getNotificationPermission,
  getExistingSubscription,
  subscribeToPush,
  unsubscribeFromPush,
} from "../../../utils/pushManager";

export const checkExistingSubscription = async (dispatch) => {
  if (!isPushSupported()) return;
  try {
    dispatch(setPushLoading(false));
    dispatch(setPushPermission(getNotificationPermission()));
    const subscription = await getExistingSubscription();
    dispatch(setPushSubscription(subscription ? subscription.toJSON() : null));
  } catch (error) {
    console.log("Push check error", error);
  }
};

export const subscribeUserToPush = async (dispatch) => {
  try {
    dispatch(setPushLoading(true));
    const subscription = await subscribeToPush();
    const subJSON = subscription.toJSON();
    await axios.post(`${serverURI}/api/push/subscribe`, subJSON);
    dispatch(setPushSubscription(subJSON));
    dispatch(setPushPermission(getNotificationPermission()));
    dispatch(setUserMessage("Notifications activées !"));
  } catch (error) {
    console.log("Push subscribe error", error);
    dispatch(setPushPermission(getNotificationPermission()));
    dispatch(setUserMessage("Impossible d'activer les notifications"));
  } finally {
    dispatch(setPushLoading(false));
  }
};

export const unsubscribeUserFromPush = async (dispatch) => {
  try {
    dispatch(setPushLoading(true));
    const subscription = await getExistingSubscription();
    if (subscription) {
      await unsubscribeFromPush(subscription);
      await axios({
        method: "DELETE",
        url: `${serverURI}/api/push/unsubscribe`,
        data: { endpoint: subscription.endpoint },
      });
    }
    dispatch(setPushSubscription(null));
    dispatch(setUserMessage("Notifications désactivées"));
  } catch (error) {
    dispatch(setUserMessage("Erreur lors de la désinscription"));
  } finally {
    dispatch(setPushLoading(false));
  }
};

export const sendPushNotification = async (
  { title, body, url },
  dispatch,
  token
) => {
  try {
    dispatch(setPushLoading(true));
    const response = await axios({
      method: "POST",
      url: `${serverURI}/api/push/send`,
      data: { title, body, url },
      headers: { Authorization: "Bearer " + token },
    });
    dispatch(setUserMessage(response.data.message || "Notification envoyée !"));
  } catch (error) {
    dispatch(setUserMessage("Erreur lors de l'envoi"));
  } finally {
    dispatch(setPushLoading(false));
  }
};
