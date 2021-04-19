import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  fontColor: "#2c2c2c",
  bgColor: "lightgray",
};

export const darkTheme = {
  fontColor: "lightgray",
  bgColor: "#2c2c2c",
};

export const GlobalStyles = createGlobalStyle`
${"" /* 전체 배경 색갈 적용 */}
    ${reset}
    body {
        background-color: ${(props) => props.theme.bgColor};
    }
`;
