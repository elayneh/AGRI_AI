/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex } from "../../../BasicStyles/Flex";
import { Typography, TextField } from "@mui/material";
import styled from "styled-components";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FooterLists } from "./constants";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
const FooterComponent = () => {
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const onSubmit = (values: any, { setSubmitting }: any) => {
    console.log("Submitted values:", values);
    setSubmitting(false);
  };
  return (
    <Flex
      style={{ backgroundColor: "#FFFEFE", paddingLeft: "18px" }}
      flexDirection={"column"}
      pt={30}
      overflowX={"hidden"}
      alignItems={"flex-start"}
    >
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent={"space-between"}
        width={"100%"}
      >
        <Flex
          flexDirection={"row"}
          justifyContent={"space-between"}
          width={"100%"}
          pr={40}
        >
          {FooterLists.map((lists, index) => (
            <StyledList>
              <Link key={index} to={"/home"}>
                <Typography variant="subtitle1">{lists.title}</Typography>
              </Link>
              {lists.lists.map((linkedList, index) => (
                <StyledSubList key={index}>
                  <Link to={linkedList.link}>
                    <Typography variant="body2">{linkedList.list}</Typography>
                  </Link>
                </StyledSubList>
              ))}
            </StyledList>
          ))}
        </Flex>
      </Flex>
      <Flex flexDirection={"column"} style={{ gap: 7 }} mt={"30px"}>
        <Typography>Subscribe to our system</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isValid, handleChange, handleBlur }) => (
            <Form
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <StyledTextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="Enter your email"
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "black" } }}
                style={{
                  backgroundColor: "#e5e4e2",
                  borderRadius: 10,
                }}
              />
              <StyledButton
                type="submit"
                disabled={!isValid}
                style={{ zIndex: 5 }}
                color="green"
              >
                Subscribe
              </StyledButton>
            </Form>
          )}
        </Formik>
      </Flex>

      <Flex
        paddingBottom={50}
        alignItems={"center"}
        justifyContent={"center"}
        pt={50}
      >
        <Typography>Copyright @2024</Typography>
        <StyledIcons>
          <StyledIconButton>
            <FaFacebook size={30} color="#919EA4" />
          </StyledIconButton>
          <StyledIconButton>
            <FaInstagramSquare size={30} color="#919EA4" />
          </StyledIconButton>
          <StyledIconButton>
            <FaLinkedin size={30} color="#919EA4" />
          </StyledIconButton>
          <StyledIconButton>
            <AiFillTwitterCircle size={30} color="#919EA4" />
          </StyledIconButton>
        </StyledIcons>
      </Flex>
    </Flex>
  );
};

const StyledTextField = styled(TextField)`
  margin-bottom: 18px;
`;

const StyledButton = styled.button`
  margin-top: 10px;
  z-index: 5;
  margin-left: -20px;
  background-color: green;
  color: #fff;
  cursor: pointer;
  height: 45px;
  width: 170px;
  border: none;
  border-radius: 10px;
`;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;

  & > a {
    text-decoration: none;
    color: inherit;
    margin-bottom: 10px;
  }
`;

const StyledSubList = styled.div`
  & > a {
    text-decoration: none;
    color: inherit;
    margin-bottom: 5px;
  }
`;
const StyledIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;w
  margin-left: 190px;
`;
const StyledIconButton = styled.button`
  cursor: pointer;
  background-color: #fff;
  border: none;
`;
export default FooterComponent;
