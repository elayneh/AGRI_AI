/* eslint-disable @typescript-eslint/no-explicit-any */
export type Theme = {
  breakpoints: string[];
  sizes: string[];
  space: string[];
  colors: {
    white: string[] | any;
    black: string[] | any;
    primary: string[] | any;
    secondary: string[] | any;
    teritary: string[] | any;
    success: string[] | any;
    alert: string[] | any;
    warning: string[] | any;
    gradient: string[] | any;
    sidebar: string[] | any;
    highlight: string[] | any;
    background: string[] | any;
    border: {
      default: string;
      focus: string;
    };
    grey: string[] | any;
    gray: string[] | any;
  };
  fontSizes: string[];
  fontWeights: number[];
  lineHeights: string[];
  letterSpacings: object;
  borders: Array<string | number>;
  radii: string[];
  zIndices: number[];
  shadows: string[];
};
