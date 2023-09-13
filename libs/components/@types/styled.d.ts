import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    theme: {
      white: {
        shadows: {
          buttonShadow: string;
          inputShadow: string;
        };
        colors: {
          primary: string;
          secondary: string;
          success: string;
          error: string;
        };
        backgrounds: {
          primaryBackground: string;
          secondaryBackground: string;
        };
      };
    };
  }
}
