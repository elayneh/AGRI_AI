import styled from "styled-components";
import {
  space,
  color,
  layout,
  grid,
  background,
  border,
  borderRadius,
  position,
  shadow,
  compose,
} from "styled-system";
import { BoxProps } from "./types";

export const Container = styled.div<BoxProps>`
  ${compose(
    space,
    color,
    layout,
    grid,
    background,
    border,
    borderRadius,
    position,
    shadow
  )}
`;
