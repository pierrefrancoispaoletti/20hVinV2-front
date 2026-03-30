import ConfigActionTypes from "./types";

const INITIAL_STATE = {
  config: {
    facebook: "",
    instagram: "",
    mail: "",
    phoneNumber: "",
  },
};

export const configReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ConfigActionTypes.GET_CONFIG:
    case ConfigActionTypes.UPDATE_CONFIG:
      return { ...state, config: action.payload };
    default:
      return state;
  }
};
