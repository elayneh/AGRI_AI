import { Paper, Typography, TextField, Button } from "@mui/material";
import { Formik, Field, ErrorMessage } from "formik";
import { BsPersonCircle } from "react-icons/bs";
import { Form, useNavigate } from "react-router-dom";
import { Flex } from "../../../BasicStyles/Flex";
import { updateUserProfileComponentTypes } from "./types";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  gender: "",
  experience: "",
  profilePicture: "",
  physicalLocation: "",
};

const UpdateUserProfileComponent = (props: updateUserProfileComponentTypes) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
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
              <BsPersonCircle size={100} />
              <Typography>Welcome Back </Typography>
            </Flex>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }) => {
                props.handleCredentials(values);
                setSubmitting(false);
              }}
            >
              {({ handleSubmit }) => (
                <Form style={{ width: "450px" }}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    type="email"
                    variant="filled"
                    color="success"
                    fullWidth
                    margin="normal"
                    placeholder="Enter your email"
                    style={{
                      marginBottom: "18px",
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
                        backgroundColor: "#0D2063",
                        width: "100%",
                        height: "60px",
                      }}
                      type="submit"
                    >
                      <Typography textTransform={"none"}>
                        Update Profile
                      </Typography>
                    </Button>
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
                      Cancel
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

export default UpdateUserProfileComponent;
