import PushActionTypes from "./types";
import { REHYDRATE } from "redux-persist";

const INITIAL_STATE = {
  permission: "default",
  subscription: null,
  loading: false,
  promptDismissed: false,
};

export const pushReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PushActionTypes.SET_PUSH_PERMISSION:
      return { ...state, permission: action.payload };
    case PushActionTypes.SET_PUSH_SUBSCRIPTION:
      return { ...state, subscription: action.payload };
    case PushActionTypes.SET_PUSH_LOADING:
      return { ...state, loading: action.payload };
    case PushActionTypes.SET_PUSH_PROMPT_DISMISSED:
      return { ...state, promptDismissed: action.payload };
    case REHYDRATE: {
      const incoming = action.payload?.push;
      if (!incoming) return state;
      return {
        ...state,
        permission: incoming.permission ?? state.permission,
        subscription: incoming.subscription ?? state.subscription,
        loading: false,
        promptDismissed: false,
      };
    }
    default:
      return state;
  }
};
