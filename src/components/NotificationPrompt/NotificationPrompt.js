import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBell } from "@fortawesome/free-solid-svg-icons";
import {
  selectPushPermission,
  selectPushPromptDismissed,
  selectPushLoading,
} from "../../redux/reducers/Push/selectors";
import { setPushPromptDismissed } from "../../redux/reducers/Push/actions";
import {
  checkExistingSubscription,
  subscribeUserToPush,
} from "../../redux/reducers/Push/querries";
import { isPushSupported } from "../../utils/pushManager";
import {
  PromptContainer,
  PromptText,
  PromptActivateBtn,
  PromptDismissBtn,
} from "./notification-prompt.style";

const VISIT_KEY = "20hvin_visit_count";

const NotificationPrompt = () => {
  const dispatch = useDispatch();
  const permission = useSelector(selectPushPermission);
  const dismissed = useSelector(selectPushPromptDismissed);
  const loading = useSelector(selectPushLoading);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    checkExistingSubscription(dispatch);
    const count = parseInt(localStorage.getItem(VISIT_KEY) || "0", 10) + 1;
    localStorage.setItem(VISIT_KEY, String(count));
    if (count >= 1) setVisible(true);
  }, [dispatch]);

  const supported = isPushSupported();
  const shouldShow =
    visible && supported && permission === "default" && !dismissed;

  if (!shouldShow) return null;

  const handleActivate = () => {
    subscribeUserToPush(dispatch);
  };

  const handleDismiss = () => {
    dispatch(setPushPromptDismissed(true));
  };

  return (
    <PromptContainer>
      <FontAwesomeIcon
        icon={faBell}
        style={{ color: "#f4ba9a", fontSize: "1.2rem", flexShrink: 0 }}
      />
      <PromptText>
        Recevez nos invitations aux soirées et événements !
      </PromptText>
      <PromptActivateBtn onClick={handleActivate} disabled={loading}>
        {loading ? "..." : "Activer"}
      </PromptActivateBtn>
      <PromptDismissBtn onClick={handleDismiss}>
        <FontAwesomeIcon icon={faTimes} />
      </PromptDismissBtn>
    </PromptContainer>
  );
};

export default NotificationPrompt;
