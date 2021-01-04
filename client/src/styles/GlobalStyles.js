import { createGlobalStyle } from 'styled-components';
import media from '@utils/media';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }
  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.background};
  }
  html {
    font-size: 18px;
    ${media.medium`
      font-size: 15px;
    `}
    ${media.small`
    font-size: 13px;
    `}
  }
`;

export default GlobalStyle;
