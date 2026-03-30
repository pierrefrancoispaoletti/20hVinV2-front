import ConfigActionTypes from "./types";

export const getConfigAction = ({ config }) => ({
  type: ConfigActionTypes.GET_CONFIG,
  payload: config,
});

export const updateConfigAction = (config) => ({
  type: ConfigActionTypes.UPDATE_CONFIG,
  payload: config,
});
