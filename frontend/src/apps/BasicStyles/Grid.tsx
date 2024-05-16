import styled from "styled-components";
import { Box } from "./Box";
import {
  boxShadow,
  compose,
  layout,
  space,
  typography,
  border,
  position,
  borderRadius,
  grid,
} from "styled-system";
import { FlexProps } from "./types";

export const Grid = styled(Box)<FlexProps>`
  display: grid;
  ${compose(
    grid,
    space,
    layout,
    typography,
    border,
    position,
    borderRadius,
    boxShadow
  )};
`;
