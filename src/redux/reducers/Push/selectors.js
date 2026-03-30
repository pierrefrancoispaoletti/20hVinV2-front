import { createSelector } from "reselect";

const selectPush = (state) => state.push;

export const selectPushPermission = createSelector(
  [selectPush],
  (push) => push.permission
);

export const selectPushSubscription = createSelector(
  [selectPush],
  (push) => push.subscription
);

export const selectPushLoading = createSelector(
  [selectPush],
  (push) => push.loading
);

export const selectPushPromptDismissed = createSelector(
  [selectPush],
  (push) => push.promptDismissed
);
