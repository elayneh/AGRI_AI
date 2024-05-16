import { ReactNode } from "react";
import {
  BackgroundProps,
  BorderProps,
  ColorProps,
  FlexboxProps,
  GridProps,
  LayoutProps,
  PositionProps,
  ShadowProps,
  SpaceProps,
  TypographyProps,
} from "styled-system";

export type CardProps = Omit<CardStyleProps, "color"> & {
  title?: string;
  image?: ImageTypes;
  body: ReactNode;
  header?: ReactNode;
  action?: ReactNode;
  hight?: string;
};

type ImageTypes = {
  src: string;
  alt?: string;
};

export interface CardStyleProps
  extends BackgroundProps,
    BorderProps,
    ColorProps,
    FlexboxProps,
    GridProps,
    LayoutProps,
    PositionProps,
    ShadowProps,
    SpaceProps,
    TypographyProps {}
