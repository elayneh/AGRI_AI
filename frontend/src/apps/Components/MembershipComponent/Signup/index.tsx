import {
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { Formik, Field, ErrorMessage } from "formik";
import { BsPersonCircle } from "react-icons/bs";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { Form, useNavigate } from "react-router-dom";
import { Flex } from "../../../BasicStyles/Flex";
import * as Yup from "yup";
import { useState } from "react";
import { SignUpComponentProps } from "./types";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
};
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match") // Compare with password field
    .required("Confirm password is required"),
  phoneNumber: Yup.string()
    .matches(/((^(2517|2519|07|09)\d{3})-?\d{5})/, "Invalid phone number") // Adjusted phone number regex
    .required("Phone number is required"),
});
const SignUpComponent = (props: SignUpComponentProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showcPassword, setShowcPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowcPassword = () => setShowcPassword(!showcPassword);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/landingPage/signIn");
  };
  const handlEnterKeyPressed = (
    event: {
      key: string;
      preventDefault: () => void;
    },
    id: string
  ) => {
    if (event.key === "Enter") {
      document.getElementById(id)?.focus();
      event.preventDefault();
    }
  };

  return (
    <Flex justifyContent={"center"} alignItems={"center"} paddingTop={45}>
      <Paper style={{ width: "100vw", overflow: "hidden" }}>
        <Flex flexDirection={"column"} justifyContent={"center"} width={"100%"}>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            overflow={"hidden"}
          >
            <Flex
              justifyContent={"center"}
              flexDirection={"column"}
              alignItems={"center"}
              color={"green"}
            >
              <BsPersonCircle size={100} />
              <Typography>Secure Your Full Access </Typography>
            </Flex>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                props.handleSubmit(values);
                setSubmitting(false);
              }}
            >
              {({ handleSubmit }) => (
                <Form style={{ width: "350px" }}>
                  <Field
                    as={TextField}
                    name="fullName"
                    type="text"
                    variant="filled"
                    color="success"
                    fullWidth
                    style={{
                      marginTop: "30px",
                      marginBottom: "8px",
                      borderWidth: "1px",
                      borderRadius: "5px",
                    }}
                    placeholder="Enter Your Full Name"
                    onKeyPress={(event: {
                      key: string;
                      preventDefault: () => void;
                    }) => handlEnterKeyPressed(event, "email")}
                  />
                  <Flex style={{ color: "red", paddingLeft: "10px" }}>
                    <ErrorMessage name="fullName" component="div" />
                  </Flex>
                  <Field
                    as={TextField}
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                    color="success"
                    fullWidth
                    placeholder="Enter Your Email Address"
                    style={{
                      marginBottom: "8px",
                      borderWidth: "1px",
                    }}
                    onKeyPress={(event: {
                      key: string;
                      preventDefault: () => void;
                    }) => handlEnterKeyPressed(event, "password")}
                  />
                  <Flex style={{ color: "red", paddingLeft: "10px" }}>
                    <ErrorMessage name="email" component="div" />
                  </Flex>
                  <Field
                    as={TextField}
                    id="password"
                    name="password"
                    variant="filled"
                    color="success"
                    fullWidth
                    style={{
                      marginBottom: "8px",
                      borderWidth: "1px",
                    }}
                    placeholder="Enter Your Password"
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
                    onKeyPress={(event: {
                      key: string;
                      preventDefault: () => void;
                    }) => handlEnterKeyPressed(event, "confirmPassword")}
                  />
                  <Flex style={{ color: "red", paddingLeft: "10px" }}>
                    <ErrorMessage name="password" component="div" />
                  </Flex>
                  <Field
                    as={TextField}
                    id="confirmPassword"
                    name="confirmPassword"
                    variant="filled"
                    color="success"
                    fullWidth
                    placeholder="Confirm password"
                    type={showcPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowcPassword}
                            edge="end"
                          >
                            {showcPassword ? <IoEyeOff /> : <IoEye />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    style={{
                      marginBottom: "8px",
                      borderWidth: "1px",
                    }}
                    onKeyPress={(event: {
                      key: string;
                      preventDefault: () => void;
                    }) => handlEnterKeyPressed(event, "phoneNumber")}
                  />
                  <Flex style={{ color: "red", paddingLeft: "10px" }}>
                    <ErrorMessage name="confirmPassword" component="div" />
                  </Flex>
                  <Field
                    as={TextField}
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    variant="filled"
                    color="success"
                    fullWidth
                    placeholder="Enter Your Phone Number"
                    style={{
                      marginBottom: "8px",
                      borderRadius: "5px",
                    }}
                  />
                  <Flex style={{ color: "red", paddingLeft: "10px" }}>
                    <ErrorMessage name="phoneNumber" component="div" />
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
                      <Typography textTransform={"none"}>Sign Up</Typography>
                    </Button>
                  </Flex>
                  <Flex
                    flexDirection={"column"}
                    alignItems={"center"}
                    style={{ gap: 20 }}
                  ></Flex>
                  <Flex style={{ margin: "30px 0px 50px 70px" }}>
                    Already have an account?
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
                      Login
                    </button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Flex>
        </Flex>
      </Paper>
    </Flex>
  );
};

export default SignUpComponent;
