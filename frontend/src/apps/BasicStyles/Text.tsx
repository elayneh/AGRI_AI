import styled from "styled-components";
import {
  space,
  color,
  layout,
  background,
  fontFamily,
  fontSize,
  fontWeight,
  textAlign,
  lineHeight,
  shadow,
  compose,
  position,
} from "styled-system";
import { TextProps } from "./types";
import { capitalize } from "@mui/material";

export const H1 = styled.h1<TextProps>`
  ${compose(
    shadow,
    space,
    color,
    layout,
    background,
    fontFamily,
    fontSize,
    fontWeight,
    textAlign,
    lineHeight
  )}
`;
export const H2 = styled.h2<TextProps>`
  ${compose(
    shadow,
    space,
    color,
    layout,
    background,
    fontFamily,
    fontSize,
    fontWeight,
    textAlign,
    lineHeight
  )}
`;
export const H3 = styled.h3<TextProps>`
  ${compose(
    shadow,
    space,
    color,
    layout,
    background,
    fontFamily,
    fontSize,
    fontWeight,
    textAlign,
    lineHeight
  )}
`;
export const H4 = styled.h4<TextProps>`
  ${compose(
    shadow,
    space,
    color,
    layout,
    background,
    fontFamily,
    fontSize,
    fontWeight,
    textAlign,
    lineHeight
  )}
`;
export const H5 = styled.h5<TextProps>`
  ${compose(
    shadow,
    space,
    color,
    layout,
    background,
    fontFamily,
    fontSize,
    fontWeight,
    textAlign,
    lineHeight
  )}
`;
export const H6 = styled.h6<TextProps>`
  ${compose(
    shadow,
    space,
    color,
    layout,
    background,
    fontFamily,
    fontSize,
    fontWeight,
    textAlign,
    lineHeight
  )}
`;
export const P = styled.p<TextProps>`
  ${compose(
    shadow,
    space,
    color,
    layout,
    background,
    fontFamily,
    fontSize,
    fontWeight,
    textAlign,
    lineHeight
  )}
`;
export const Text = styled.span<TextProps>`
  ${compose(
    shadow,
    space,
    color,
    layout,
    background,
    fontFamily,
    fontSize,
    fontWeight,
    textAlign,
    lineHeight,
    capitalize,
  )}
`;

export const Label = styled.label<TextProps>`
  ${compose(
    shadow,
    position,
    space,
    color,
    layout,
    background,
    fontFamily,
    fontSize,
    fontWeight,
    textAlign,
    lineHeight
  )}
`;
