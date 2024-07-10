import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";
import { allowedCategories, colors } from "../../_const";

const isStyle2 = (props) => {
  if (props.style2) {
    return css`
      div:not(.modal) {
        background: ${hexToRGB(colors.background)};
        position: relative;
        color: ${colors.ecriture};
        font-family: "Lora";
        .subcategory {
          color: ${colors.ecriture};
          font-family: "Lora";
        }
        .chevron {
          color: ${colors.secondary};
          border: 1px solid ${colors.secondary};
          animation: scalingChevronJosephine 1.5s infinite linear alternate;
          @keyframes scalingChevronJosephine {
            0% {
              background: inherit;
              transform: scale(1);
            }
            100% {
              background: ${colors.secondary};
              color: ${colors.main};
              transform: scale(1.2);
            }
          }
        }
        & > .loader > span {
          color: ${colors.secondary};
        }
        & > .title {
          color: ${colors.ecriture};
          font-family: "Lora";
          font-weight: "bold";
          font-size: 1.2rem;
          margin: 12px auto;
          & > .price {
            color: ${colors.ecriture};
            font-family: "Lora";
            font-weight: "bold";
            ${"" /* border-bottom: 1px solid ${colors.secondary}; */}
            font-size: 1rem;
          }
        }
        & > .description {
          text-align: center;
          font-weight: 300;
          text-transform: "Lora";
          @media (min-width: 420px) {
            text-align: left;
          }
          margin-bottom: 36px;
        }
        & > .menu {
          color: ${colors.ecriture};
          border: 1px solid ${colors.secondary};
          :not(:first-child) span {
            margin-right: 3px;
          }
        }
        & > .selected {
          background: ${colors.secondary};
          color: ${colors.main};
        }
        & > .wine-color {
          font-size: 1.5em;
          ${getWineColor}
        }
      }
      h2 {
        color: ${colors.ecriture};
        font-family: unset;
        font-weight: 200;
      }
    `;
  }
};

// const isFirstInHome = (props) => {
//   if (!props.first) {
//     return css`
//       .description {
//         margin-bottom: 12px !important;
//         padding-bottom: 12px;
//         border-bottom: 5px solid ${colors.main};
//         width: 100%;
//       }
//     `;
//   }
// };
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
        border-bottom: 5px solid ${colors.secondary};
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
  //blur pour une transition blur,
  //scale pour un zoom
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
        color: #742f37;
      `;
    case "blanc":
      return css`
        color: #f1f285;
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
        16,
      )}, 0.6)`
    : null;
};

export const TableauContainer = styled.div`
  border: ${(props) =>
    props.style2 ? `14px solid ${colors.secondary}` : "14px solid #deb887"};
  margin: 0px 8px;
  box-shadow: 0px 9px 23px -5px rgba(0, 0, 0, 0.58);
  perspective: 1500px;
  background: transparent;
  .subcategory {
    margin: 12px auto 0 auto;
    text-align: center;
    display: block;
    font-size: 2.2em;
    color: ${colors.main};
    font-family: "Lora";
    text-transform: uppercase;
    font-weight: 200;
    border-top: 1px solid ${colors.primary};
    padding: 12px 0 0 0;
    width: 80%;
    vertical-align: middle;
    .subcategory-legend {
      border-top: 1px solid ${colors.primary};
      display: block;
      text-transform: none;
      font-size: 1.2rem;
      margin-top: 8px;
      line-height: 1.5;
      padding-top: 8px;
    }
  }
  ${isStyle2}
`;

export const TableauWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${hexToRGB("#484b56")};
  min-height: 80vh;
  ${getTransitionType}
`;

export const TableauTitle = styled.h2`
  position: relative;
  font-family: "Aestethe";
  font-size: 3.5em;
  margin-bottom: 12px;
  color: ${colors.main};
  text-align: center;
  letter-spacing: 1px;
  font-weight: 200;
  overflow-wrap: anywhere;
  @media (max-width: 379px) {
    font-size: 1.9em;
  }
`;

export const TableauLegend = styled.p`
  font-size: 1.5em;
  margin: 8px 12px;
  text-align: center;
  line-height: 1.6;
  color: ${colors.ecriture};
`;

export const TableauContent = styled.div`
  position: relative;
  font-family: "poppins";
  display: flex;
  width: 95%;
  flex-direction: column;
  align-items: flex-start;
  line-height: 22px;
  color: ${colors.main};
  margin: auto;
  text-align: left;
  font-size: 1.8rem;
  ${contentVisible}
  ${isLastInHome}

  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: ${colors.main};
    letter-spacing: 2px;
    text-transform: uppercase;
    font-size: 0.9rem;
    font-family: "poppins-bold";
    font-weight: bold;
    & > span {
      width: 100%;
      white-space: pre-wrap;
    }
  }

  .price {
    display: flex;
    justify-content: flex-end;
    font-family: "poppins";
    font-size: 0.9rem;
    text-align: right;
  }

  .description {
    font-family: "poppins";
    text-align: left;
    margin: 0;
    font-size: 0.9rem;
    white-space: pre-wrap;
  }

  .wine-color {
    font-size: 0.8em;
    ${getWineColor}
  }
`;

export const WineColorContainer = styled.div``;

export const WinePriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  font-size: 0.8rem;
  font-family: "poppins";
  ${getWineColor};
`;

export const WinePriceElement = styled.span`
  display: flex;
  font-family: "poppins";
  vertical-align: middle;
  font-size: 0.9rem;
  text-align: right;
  ${getWineColor};
`;

export const WineItemElement = styled.span`
  padding: 6px 8px;
  border: 3px solid ${colors.main};
  border-radius: 50px;
  display: inline-block;
  margin-right: 1em;
  font-size: 0.7em;
  :active {
    background: ${colors.main};
    border: 3px solid black;
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
  flex-flow: row;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: ${colors.main};
  font-family: "poppins";
  font-size: 0.8rem;
  transition: all 0.5s ease;
  margin: 5px auto;

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
    text-decoration: underline 2px;
    background: ${colors.main};
    color: #484b56;
    transition: all 0.5s ease-in-out;
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
    // animation: moveAndScale 0.2s ease-in-out;
    @keyframes moveAndScale {
      0% {
        transform: translateY(0px) scale(1);
      }
      50% {
        transform: translateY(-10px) scale(1.1);
      }
      75% {
        transform: translateY(10px) scale(1.2);
      }
      100% {
        transform: translateY(0px) scale(1.1);
      }
    }
    @-webkit-keyframes moveAndScale {
      0% {
        -webkit-transform: translateY(0px) scale(1);
      }
      50% {
        -webkit-transform: translateY(-10px) scale(1.1);
      }
      75% {
        -webkit-transform: translateY(10px) scale(1.2);
      }
      100% {
        -webkit-transform: translateY(0px) scale(1.1);
      }
    }
  }
  .menu {
    width: calc(100% - 30%);
    margin: 3px 3px;
    cursor: pointer;
    align-self: center;
    vertical-align: bottom;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${colors.main};
    border-radius: 50px;
    padding: 5px;
  }
`;

export const OpenSubMenuChevron = styled(FontAwesomeIcon)`
  margin-top: 6px;
  color: ${colors.main};
  border: 1px solid ${colors.main};
  padding: 5px 7px;
  border-radius: 50px;
  animation: scalingChevron 1.5s infinite linear alternate;
  @keyframes scalingChevron {
    0% {
      background: inherit
      transform: scale(1);
    }
    100% {
      background: ${colors.main};
      color: #484b56;

      transform: scale(1.2);
    }
  }
`;
