import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";
import { allowedCategories, colors } from "../../_const";

const isStyle2 = (props) => {
  if (props.style2) {
    return css`
      div:not(.modal) {
        background: ${colors.surface};
        position: relative;
        color: ${colors.ecriture};
        font-family: 'Space Grotesk', sans-serif;
        .subcategory {
          color: ${colors.accent};
          font-family: 'Libre Baskerville', serif;
        }
        .chevron {
          color: ${colors.accent};
          border: 1px solid rgba(255,255,255,0.1);
          animation: scalingChevronJosephine 1.5s infinite linear alternate;
          @keyframes scalingChevronJosephine {
            0% {
              background: inherit;
              transform: scale(1);
            }
            100% {
              background: ${colors.wine};
              color: ${colors.main};
              transform: scale(1.2);
            }
          }
        }
        & > .loader > span {
          color: ${colors.accent};
        }
        & > .title {
          color: ${colors.ecriture};
          font-family: 'Libre Baskerville', serif;
          font-weight: 400;
          font-size: 1.05rem;
          margin: 12px auto;
          & > .price {
            color: ${colors.accent};
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 500;
            font-size: 0.9rem;
          }
        }
        & > .description {
          text-align: left;
          font-weight: 300;
          color: rgba(255,255,255,0.55);
          @media (min-width: 420px) {
            text-align: left;
          }
          margin-bottom: 36px;
        }
        & > .menu {
          color: ${colors.ecriture};
          border: 1px solid rgba(255,255,255,0.1);
          :not(:first-child) span {
            margin-right: 3px;
          }
        }
        & > .selected {
          background: ${colors.wine};
          color: ${colors.main};
        }
        & > .wine-color {
          font-size: 1.5em;
          ${getWineColor}
        }
      }
      h2 {
        color: ${colors.ecriture};
        font-family: 'Libre Baskerville', serif;
        font-weight: 400;
      }
    `;
  }
};

const isLastInHome = (props) => {
  if (props.last && props.category === "today") {
    return css`
      .description {
      }
    `;
  }
  if (!props.last && allowedCategories.includes(props.category)) {
    return css`
      .description {
        margin-bottom: 12px !important;
        padding-bottom: 12px;
        border-bottom: 1px solid ${colors.border};
        width: 100%;
      }
    `;
  }
};

const contentVisible = (props) => {
  if (!props.visible)
    return css`
      display: none;
    `;
};

const playAnimation = (props) => {
  if (props.transition) {
    return "runing";
  }
};

const getTransitionType = (props) => {
  switch (props.transitionType) {
    case "blur":
      return css`
        animation: blurArray 0.5s ease-in-out ${playAnimation};
        @keyframes blurArray {
          0% {
            filter: blur(10px);
          }
          100% {
            filter: blur(0);
          }
        }
      `;
    case "scale":
      return css`
        animation: scaleArray 0.2s ease ${playAnimation};
        @keyframes scaleArray {
          0% {
            transform: scale(100%);
          }
          100% {
            transform: scale(0%);
          }
        }
      `;
    case "scale reverse":
      return css`
        animation: scaleArray 1.5s linear ${playAnimation} reverse;
        @keyframes scaleArray {
          0% {
            transform: scale(100%);
          }
          50% {
            transform: scale(50%);
          }
          75% {
            transform: scale(25%);
          }
          100% {
            transform: scale(0%);
          }
        }
      `;

    default:
      break;
  }
};

const getWineColor = (props) => {
  switch (props.color) {
    case "rouge":
      return css`
        color: #a04050;
      `;
    case "blanc":
      return css`
        color: #d4c44a;
      `;
    case "rosé":
      return css`
        color: #ffb9b9;
      `;
    default:
      break;
  }
};

const hexToRGB = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}, 0.6)`
    : null;
};

export const TableauContainer = styled.div`
  border: none;
  margin: 0;
  box-shadow: none;
  perspective: 1500px;
  background: transparent;
  .subcategory {
    margin: 20px auto 0 auto;
    text-align: center;
    display: block;
    font-size: 1.8em;
    color: ${colors.accent};
    font-family: 'Libre Baskerville', serif;
    text-transform: none;
    font-weight: 400;
    font-style: italic;
    border-top: 1px solid ${colors.border};
    padding: 20px 0 0 0;
    width: 80%;
    vertical-align: middle;
    .subcategory-legend {
      border-top: 1px solid ${colors.border};
      display: block;
      text-transform: none;
      font-size: 0.85rem;
      margin-top: 8px;
      line-height: 1.5;
      padding-top: 8px;
      font-family: 'Space Grotesk', sans-serif;
      font-style: normal;
      color: rgba(255,255,255,0.55);
    }
  }
  ${isStyle2}
`;

export const TableauWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.background};
  min-height: 80vh;
  ${getTransitionType}
`;

export const TableauTitle = styled.h2`
  position: relative;
  font-family: 'Libre Baskerville', serif;
  font-size: 2.2em;
  margin-bottom: 8px;
  color: ${colors.ecriture};
  text-align: center;
  letter-spacing: 2px;
  font-weight: 400;
  overflow-wrap: anywhere;
  @media (max-width: 379px) {
    font-size: 1.6em;
  }
`;

export const TableauLegend = styled.p`
  font-size: 0.85rem;
  margin: 4px 12px 8px;
  text-align: center;
  line-height: 1.6;
  color: ${colors.secondary};
  font-weight: 400;
  letter-spacing: 1px;
`;

export const TableauContent = styled.div`
  position: relative;
  font-family: 'Space Grotesk', sans-serif;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.6;
  color: ${colors.ecriture};
  margin: 0;
  padding: 18px 24px;
  text-align: left;
  font-size: 1rem;
  border-bottom: 1px solid ${colors.border};
  transition: background 0.25s ease;

  &:hover {
    background: rgba(255,255,255,0.02);
  }

  @media (max-width: 420px) {
    padding: 16px 20px;
  }
  ${contentVisible}
  ${isLastInHome}

  .title {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    color: ${colors.ecriture};
    letter-spacing: 0;
    font-family: 'Libre Baskerville', serif;
    font-size: 1.05rem;
    font-weight: 400;
    margin: 0 0 6px 0;
    & > span {
      width: 100%;
      text-align: left;
    }
    @media (max-width: 420px) {
      & > span {
        text-align: left;
      }
      justify-content: space-between;
      align-items: baseline;
    }
  }

  .price {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 500;
    color: ${colors.accent};
    font-size: 0.9rem;
    white-space: nowrap;
    @media (max-width: 370px) {
      font-size: 0.85rem;
    }
  }

  .description {
    font-family: 'Space Grotesk', sans-serif;
    letter-spacing: 0;
    text-align: left;
    margin: 0 0 10px 0;
    font-size: 0.8rem;
    white-space: pre-wrap;
    color: rgba(255,255,255,0.55);
    font-weight: 300;
    line-height: 1.6;
    @media (min-width: 415px) {
      white-space: normal;
    }
  }

  .wine-color {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    ${getWineColor}
  }
`;

export const WineColorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const WinePriceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-left: auto;
  white-space: nowrap;
`;

export const WinePriceElement = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${colors.accent};
`;

export const WineItemElement = styled.span`
  padding: 6px 14px;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  display: inline-block;
  margin-right: 0.8em;
  background: transparent;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 1px;
  color: rgba(255,255,255,0.55);
  transition: all 0.2s;
  :active {
    background: ${colors.wine};
    border-color: ${colors.wine};
    color: #fff;
  }
  ${getWineColor}
  :last-child {
    margin-right: 0;
  }
  @media (max-width: 420px) {
    margin-right: 0;
  }
`;

export const SubCategoryFilterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0;
  color: ${colors.ecriture};
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  transition: all 0.3s ease;
  margin: 0;
  padding: 16px 24px;

  @keyframes appearSubCategory {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  &.isOpen {
    .menu:not(:first-child) {
      display: flex;
      animation: appearSubCategory 0.1s ease-in-out alternate;
    }
  }
  &.isClosed {
    .menu:not(:first-child) {
      display: none;
    }
  }

  .selected {
    z-index: 10;
    background: ${colors.wine} !important;
    color: #fff !important;
    border-color: ${colors.wine} !important;
    transition: all 0.2s ease;
    transform: none;
    -webkit-transform: none;
    text-decoration: none;
  }
  .menu {
    margin: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 50px;
    padding: 8px 18px;
    font-weight: 500;
    letter-spacing: 0.5px;
    color: rgba(255,255,255,0.55);
    background: transparent;
    transition: all 0.2s;
  }
`;

export const OpenSubMenuChevron = styled(FontAwesomeIcon)`
  margin-top: 6px;
  color: ${colors.accent};
  border: 1px solid rgba(255,255,255,0.1);
  padding: 5px 7px;
  border-radius: 50px;
  animation: scalingChevron 1.5s infinite linear alternate;
  @keyframes scalingChevron {
    0% {
      background: inherit;
      transform: scale(1);
    }
    100% {
      background: ${colors.wine};
      color: ${colors.main};
      transform: scale(1.2);
    }
  }
`;
