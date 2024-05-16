import { Paper, Typography, TextField, Button } from "@mui/material";
import { Formik, Field, ErrorMessage } from "formik";
import { Form, useNavigate } from "react-router-dom";
import { Flex } from "../../../BasicStyles/Flex";
import * as Yup from "yup";
import { forgotPasswordComponentTypes } from "./types";
import { Text } from "../../../BasicStyles/Text";

const initialValues = {
  email: "",
};
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});
const ForgotPasswordComponent = (props: forgotPasswordComponentTypes) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/landingPage/signIn");
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      padding={30}
      style={{ overflowY: "hidden" }}
    >
      <Paper style={{ width: "100vw", paddingTop: 20 }}>
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
              <Text fontWeight={"bold"} fontSize={25}>
                Forgot your password?
              </Text>
              <Typography>
                Please enter the email you use to sign to the system{" "}
              </Typography>
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
                <Form style={{ width: "100vw", paddingLeft: "30px" }}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    type="email"
                    variant="filled"
                    color="success"
                    fullWidth
                    placeholder="Enter your email"
                    style={{
                      marginBottom: "18px",
                      marginTop: "40px",
                    }}
                  />
                  <Flex style={{ color: "red" }}>
                    <ErrorMessage name="email" component="div" />
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
                        height: "50px",
                      }}
                      type="submit"
                    >
                      <Typography textTransform={"none"}>
                        Request password reset
                      </Typography>
                    </Button>
                  </Flex>
                  <Flex style={{ margin: "30px 0px 50px 350px" }}>
                    <button
                      style={{
                        color: "#56a0d3",
                        marginLeft: 7,
                        backgroundColor: "#fff",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleNavigate()}
                    >
                      Back to login
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

export default ForgotPasswordComponent;
