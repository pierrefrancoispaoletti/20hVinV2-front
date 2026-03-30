import { createSelector } from "reselect";

const selectConfigRoot = (state) => state.appConfig;

export const selectConfig = createSelector(
  [selectConfigRoot],
  ({ config }) => config
);
