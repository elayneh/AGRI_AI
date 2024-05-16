/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProp } from "styled-components";
import { ReactNode } from "react";
import {
  FlexboxProps,
  SpaceProps,
  ColorProps,
  LayoutProps,
  BackgroundProps,
  BorderProps,
  PositionProps,
  ShadowProps,
  GridProps,
  BoxShadowProps,
  FontWeightProps,
  FontSizeProps,
  FontFamilyProps,
  SizeProps,
  TextAlignProps,
  LineHeightProps,
} from "styled-system";
export interface FlexProps extends FlexboxProps {}
export interface BoxProps
  extends SpaceProps,
    ColorProps,
    FlexboxProps,
    LayoutProps,
    GridProps,
    BackgroundProps,
    BorderProps,
    PositionProps,
    BoxShadowProps,
    ShadowProps {
  hover?: CSSProp;
}
// Text Props
export interface TextProps
  extends FontFamilyProps,
    ShadowProps,
    FontSizeProps,
    FontWeightProps,
    ColorProps,
    BackgroundProps,
    LayoutProps,
    SizeProps,
    TextAlignProps,
    SpaceProps,
    LineHeightProps {
  children: ReactNode | any;
  capitalize?: boolean;
}
