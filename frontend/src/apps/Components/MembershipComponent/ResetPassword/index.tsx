import {
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { Formik, Field, ErrorMessage } from "formik";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { Form, useLocation, useNavigate } from "react-router-dom";
import { Flex } from "../../../BasicStyles/Flex";
import * as Yup from "yup";
import { useState } from "react";
import { resetPasswordComponentTypes } from "./types";
import { Text } from "../../../BasicStyles/Text";

const initialValues = {
  password: "",
  confirmPassword: "",
  resetToken: "",
};
const validationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Confirm password is required"),
});
const ResetPasswordComponent = (props: resetPasswordComponentTypes) => {
  const location = useLocation();
  const pathname = location.pathname;
  const reset_token = pathname.split("/password_reset/")[1];
  initialValues.resetToken = reset_token;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/landingPage/signIn");
  };
  const handlEnterKeyPressed = (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (event.key === "Enter") {
      document.getElementById("confirmPassword")?.focus();
      event.preventDefault();
    }
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      padding={30}
      style={{ overflowY: "hidden" }}
    >
      <Paper style={{ width: "600px", paddingTop: 20 }}>
        <Flex flexDirection={"column"} justifyContent={"center"} width={"100%"}>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
          >
            <Flex
              justifyContent={"center"}
              m={20}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Text fontWeight={"bold"} fontSize={30}>
                Reset your account password{" "}
              </Text>
              <Typography>Enter a new password for your account</Typography>
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
                <Form style={{ width: "450px" }}>
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    variant="filled"
                    color="success"
                    fullWidth
                    margin="normal"
                    placeholder="Enter new password"
                    type={showPassword ? "text" : "password"}
                    onKeyPress={handlEnterKeyPressed}
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
                  <Field
                    as={TextField}
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    variant="filled"
                    color="success"
                    fullWidth
                    margin="normal"
                    placeholder="Confirm password"
                    type={showConfirmPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
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
                    <ErrorMessage name="confirmPassword" component="div" />
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
                      <Typography textTransform={"none"}>
                        Change password
                      </Typography>
                    </Button>
                  </Flex>
                  <Flex style={{ margin: "30px 0px 50px 70px" }}>
                    Don't want to reset account passowrd?{" "}
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
                      <Text fontSize={20}>Go back</Text>
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

export default ResetPasswordComponent;
