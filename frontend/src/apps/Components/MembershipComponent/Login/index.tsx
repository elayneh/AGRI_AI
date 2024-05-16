import {
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import styled from "styled-components";
import { Formik, Field, ErrorMessage } from "formik";
import { BsPersonCircle } from "react-icons/bs";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { Form, useNavigate } from "react-router-dom";
import { Flex } from "../../../BasicStyles/Flex";
import * as Yup from "yup";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { loginComponentTypes } from "./types";

const initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const LoginComponent = (props: loginComponentTypes) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/landingPage/register");
  };
  const handlEnterKeyPressed = (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (event.key === "Enter") {
      document.getElementById("password")?.focus();
      event.preventDefault(); // Prevent default form submission behavior
    }
  };

  const StyledFlex = styled(Flex)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 999;
    overflow: hidden;

    @media (min-width: 450px) {
      height: 100%;
      position: relative;
    }
  `;
  return (
    <StyledFlex justifyContent={"center"} alignItems={"center"} paddingTop={45}>
      <Paper style={{ width: "100vw", overflow: "hidden" }}>
        <Flex flexDirection={"column"} justifyContent={"center"} width={"100%"}>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            overflow={"none"}
          >
            <Flex
              justifyContent={"center"}
              flexDirection={"column"}
              alignItems={"center"}
              color={"green"}
            >
              <BsPersonCircle size={100} />
              <Typography>Welcome Back </Typography>
            </Flex>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                props.handleCredentials(values);
                setSubmitting(false);
              }}
            >
              {({ handleSubmit }) => (
                <Form style={{ width: "350px" }}>
                  <Field
                    as={TextField}
                    name="email"
                    type="email"
                    variant="filled"
                    color="success"
                    fullWidth
                    placeholder="Email"
                    style={{
                      marginBottom: "8px",
                    }}
                    onKeyPress={handlEnterKeyPressed}
                  />
                  <Flex style={{ color: "red" }}>
                    <ErrorMessage name="email" component="div" />
                  </Flex>
                  <Field
                    as={TextField}
                    id="password"
                    name="password"
                    label="Password"
                    variant="filled"
                    color="success"
                    fullWidth
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <IoEyeOff /> : <IoEye />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    style={{
                      marginBottom: "18px",
                      borderWidth: "1px",
                    }}
                  />
                  <Flex style={{ color: "red" }}>
                    <ErrorMessage name="password" component="div" />
                  </Flex>
                  <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    pt={4}
                    pb={4}
                  >
                    <Button
                      variant="contained"
                      onClick={() => handleSubmit()}
                      style={{
                        backgroundColor: "#73d673",
                        width: "100%",
                        height: "60px",
                      }}
                      type="submit"
                    >
                      <Typography textTransform={"none"}>Login</Typography>
                    </Button>
                  </Flex>
                  <Flex
                    flexDirection={"column"}
                    alignItems={"center"}
                    style={{ gap: 20 }}
                  >
                    <button
                      style={{
                        color: "#1C79F2",
                        backgroundColor: "#fff",
                        border: "none",
                        cursor: "pointer",
                        marginTop: 23,
                        fontSize: 22,
                        marginBottom: 10,
                      }}
                      onClick={() => navigate("/landingPage/forgot-password")}
                    >
                      Forgot Password ?
                    </button>
                    <Flex style={{ gap: 20 }}>
                      <IconButton>
                        <FaFacebook color="#1C79F2" size={50} />
                      </IconButton>
                      <IconButton>
                        <FcGoogle size={50} />
                      </IconButton>
                      <IconButton>
                        <FaLinkedin color="#1C79F2" size={50} />
                      </IconButton>
                    </Flex>
                  </Flex>
                  <Flex style={{ margin: "30px 0px 50px 70px" }}>
                    Don't have an account ?{" "}
                    <button
                      style={{
                        color: "#1C79F2",
                        marginLeft: 7,
                        backgroundColor: "#fff",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleNavigate()}
                    >
                      Sign Up
                    </button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Flex>
        </Flex>
      </Paper>
    </StyledFlex>
  );
};

export default LoginComponent;
