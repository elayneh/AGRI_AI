import {
  boxShadow,
  flexbox,
  compose,
  flex,
  layout,
  space,
  typography,
  border,
  position,
  borderRadius,
  flexDirection,
} from "styled-system";
import { FlexProps } from "./types";
import styled from "styled-components";
import { Box } from "./Box";

export const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${compose(
    flexbox,
    flex,
    space,
    layout,
    typography,
    border,
    position,
    borderRadius,
    boxShadow,
    flexDirection
  )};
`;
