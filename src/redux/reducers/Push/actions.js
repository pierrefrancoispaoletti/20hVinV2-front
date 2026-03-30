import PushActionTypes from "./types";

export const setPushPermission = (permission) => ({
  type: PushActionTypes.SET_PUSH_PERMISSION,
  payload: permission,
});

export const setPushSubscription = (subscription) => ({
  type: PushActionTypes.SET_PUSH_SUBSCRIPTION,
  payload: subscription,
});

export const setPushLoading = (loading) => ({
  type: PushActionTypes.SET_PUSH_LOADING,
  payload: loading,
});

export const setPushPromptDismissed = (dismissed) => ({
  type: PushActionTypes.SET_PUSH_PROMPT_DISMISSED,
  payload: dismissed,
});
