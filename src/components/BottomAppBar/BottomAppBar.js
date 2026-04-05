import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faCog,
  faDoorOpen,
  faUser,
  faEnvelope,
  faPhone,
  faSlidersH,
  faBell,
  faBellSlash,
} from "@fortawesome/free-solid-svg-icons";
import { selectCurrentUser } from "../../redux/reducers/User/selector";
import { setUserMessage, userSignOut } from "../../redux/reducers/User/actions";
import { selectConfig } from "../../redux/reducers/Config/selectors";
import { selectPushSubscription, selectPushLoading, selectPushPermission } from "../../redux/reducers/Push/selectors";
import { checkExistingSubscription, subscribeUserToPush, unsubscribeUserFromPush } from "../../redux/reducers/Push/querries";
import { isPushSupported } from "../../utils/pushManager";
import { BarContainer, BarGroup, BarButton, BarAnchor, BarAction } from "./bottom-app-bar.style";

const BottomAppBar = () => {
  const user = useSelector(selectCurrentUser);
  const config = useSelector(selectConfig);
  const subscription = useSelector(selectPushSubscription);
  const pushLoading = useSelector(selectPushLoading);
  const permission = useSelector(selectPushPermission);
  const dispatch = useDispatch();
  const isAdmin = user?.role === "isAdmin";

  useEffect(() => {
    if (isPushSupported()) {
      checkExistingSubscription(dispatch);
    }
  }, [dispatch]);

  const { facebook, instagram, mail, phoneNumber } = config ?? {};

  return (
    <BarContainer>
      {/* Réseaux sociaux + contact — gauche (masqué pour admin) */}
      <BarGroup>
        {!isAdmin && (
          <>
            {facebook && (
              <BarAnchor href={facebook} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </BarAnchor>
            )}
            {instagram && (
              <BarAnchor href={instagram} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </BarAnchor>
            )}
            {mail && (
              <BarAnchor href={`mailto:${mail}`}>
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
              </BarAnchor>
            )}
            {phoneNumber && (
              <BarAnchor href={`tel:${phoneNumber}`}>
                <FontAwesomeIcon icon={faPhone} size="lg" />
              </BarAnchor>
            )}
            {isPushSupported() && (
              <BarAction
                onClick={() => {
                  if (permission === "denied") {
                    dispatch(setUserMessage("Notifications bloquées — réactivez-les dans les réglages de votre navigateur"));
                    return;
                  }
                  subscription
                    ? unsubscribeUserFromPush(dispatch)
                    : subscribeUserToPush(dispatch);
                }}
                disabled={pushLoading}
              >
                <FontAwesomeIcon
                  icon={subscription ? faBell : faBellSlash}
                  size="lg"
                />
              </BarAction>
            )}
          </>
        )}
      </BarGroup>

      {/* Admin + auth — droite */}
      <BarGroup>
        {isAdmin && (
          <>
            <BarButton to="/admin/categories">
              <FontAwesomeIcon icon={faCog} size="lg" />
            </BarButton>
            <BarButton to="/admin/config">
              <FontAwesomeIcon icon={faSlidersH} size="lg" />
            </BarButton>
            <BarButton to="/admin/notifications">
              <FontAwesomeIcon icon={faBell} size="lg" />
            </BarButton>
          </>
        )}
        {user ? (
          <BarButton
            to="/"
            onClick={() => {
              dispatch(userSignOut());
              dispatch(setUserMessage("Déconnécté"));
            }}
          >
            <FontAwesomeIcon icon={faDoorOpen} size="lg" />
          </BarButton>
        ) : (
          <BarButton to="/connexion">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </BarButton>
        )}
      </BarGroup>
    </BarContainer>
  );
};

export default BottomAppBar;
