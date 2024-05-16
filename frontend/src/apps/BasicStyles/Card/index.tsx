import styled from "styled-components";
import { CardProps, CardStyleProps } from "./types";
import {
  compose,
  color,
  space,
  typography,
  background,
  border,
  flexbox,
  shadow,
  layout,
  position,
  grid,
} from "styled-system";
import { H3 } from "../Text";

const Card = ({ body, title, header, action, image }: CardProps) => {
  return (
    <CardStyleContainer>
      {header && <CardHeader>{header}</CardHeader>}
      {image && <CardImage src={image?.src} alt={image?.alt} />}

      <CardTitle>{title && <H3>{title}</H3>}</CardTitle>
      <CardBody>
        <CardContent>{body}</CardContent>
        {action && <CardAction>{action}</CardAction>}
      </CardBody>
    </CardStyleContainer>
  );
};

const CardStyleContainer = styled("div")<CardStyleProps>`
  border-radius: 16px;
  // width: 350px;
  // height: 440px;
  padding: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
  ${compose(
    color,
    space,
    typography,
    background,
    border,
    flexbox,
    shadow,
    layout,
    position,
    grid
  )}
`;

const CardBody = styled("div")`
  width: 100%;
  bottom: 0;
  // padding: 1.7rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
const CardTitle = styled("div")``;
const CardHeader = styled("div")``;
const CardAction = styled("div")`
  display: flex;
  width: 100%;
`;
const CardContent = styled.div``;

const CardImage = styled("img")`
  position: relative;
  height: 30%;
  width: 100%;
`;
export default Card;
