import React from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import { selectCurrentUser } from "../../redux/reducers/User/selector";
import { setUserMessage, userSignOut } from "../../redux/reducers/User/actions";
import { selectConfig } from "../../redux/reducers/Config/selectors";
import { BarContainer, BarGroup, BarButton, BarAnchor } from "./bottom-app-bar.style";

const BottomAppBar = () => {
  const user = useSelector(selectCurrentUser);
  const config = useSelector(selectConfig);
  const dispatch = useDispatch();

  const { facebook, instagram, mail, phoneNumber } = config ?? {};

  return (
    <BarContainer>
      {/* Réseaux sociaux + contact — gauche */}
      <BarGroup>
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
      </BarGroup>

      {/* Admin + auth — droite */}
      <BarGroup>
        {user?.role === "isAdmin" && (
          <>
            <BarButton to="/admin/categories">
              <FontAwesomeIcon icon={faCog} size="lg" />
            </BarButton>
            <BarButton to="/admin/config">
              <FontAwesomeIcon icon={faSlidersH} size="lg" />
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
