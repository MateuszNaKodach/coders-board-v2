import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      light: string;
      dark: string;
      slight: string;
      info: string;
      success: string;
      processing: string;
      error: string;
      highlight: string;
      warning: string;
      normal: string;
      white: string;
      black: string;
      border: string;
      divider: string;
      background: string;
      componentBackground: string;
      tableHeader: string;
      text: { title: string; primary: string; secondary: string; placeholder: string; disabled: string };
    };
    fonts: { fontFamily: string; codeFamily: string };
    shadows: { card: string };
    breakpoints: { xs: string; sm: string; md: string; lg: string; xl: string; xxl: string };
  }
}
