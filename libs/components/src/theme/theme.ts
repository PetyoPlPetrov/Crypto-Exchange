// GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Font Family */
  body {
    font-family: 'Roboto', sans-serif;
  }

  /* Headers */
  h1, h2, h3 {
    font-weight: bold;
    color: #333333;
  }

  h1 {
    font-size: 24px;
  }

  /* Text */
  p {
    font-size: 16px;
    color: #666666;
  }


`;

export const theme = {
  white: {
    shadows: {
      buttonShadow: `rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset`,
      inputShadow: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px`,
    },
    colors: {
      primary: 'white',
      secondary: '#e6e8ea',
      success: '#28a745',
      error: '#dc3545',
    },
    backgrounds: {
      primaryBackground: '#4caf50',
      secondaryBackground: '#f0f0f0',
    },
  },
};
