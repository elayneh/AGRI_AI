import { Button, Paper, TextField, Typography } from "@mui/material";
import { Flex } from "../../../BasicStyles/Flex";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { IoLocationOutline } from "react-icons/io5";
import {
  FaPhoneAlt,
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";
import { AiOutlineMail, AiFillTwitterCircle } from "react-icons/ai";

const ContactUsComponent = () => {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format"),
    message: Yup.string().required("Message is required"),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    console.log("Submitted values:", values);
    setSubmitting(false);
    resetForm();
  };
  return (
    <Flex
      style={{ width: "100vw", paddingBottom: 20, marginRight: "25px" }}
      ml={-10}
    >
      <Paper
        elevation={3}
        style={{
          display: "flex",
          width: "100vw",
          height: "80vh",
        }}
      >
        <Flex flexDirection={"column"} style={{ marginLeft: 25 }}>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mb={10}
            pt={4}
          >
            <Typography style={{ color: "green", fontSize: 32 }}>
              Get in touch
            </Typography>
            <Typography>We are here for you! How can we help?</Typography>
          </Flex>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isValid, handleChange, handleBlur }) => (
              <Form style={{ width: "90vw" }}>
                <Field
                  as={TextField}
                  color="secondary"
                  name="name"
                  label="Name"
                  variant="filled"
                  fullWidth
                  margin="normal"
                  placeholder="Enter your name"
                  style={{
                    marginBottom: "18px",
                    borderWidth: "1px",
                  }}
                />
                <Field
                  as={TextField}
                  color="secondary"
                  name="email"
                  label="Email"
                  type="email"
                  variant="filled"
                  fullWidth
                  margin="normal"
                  placeholder="Enter your email"
                  style={{
                    marginBottom: "18px",
                  }}
                />
                <Field
                  as={TextField}
                  name="message"
                  label="Message"
                  variant="filled"
                  multiline
                  rows={4}
                  fullWidth
                  color="secondary"
                  margin="normal"
                  placeholder="Write your message here"
                  style={{
                    marginBottom: "18px",
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Button
                  type="submit"
                  disabled={!isValid}
                  variant="contained"
                  style={{
                    backgroundColor: "green",
                    width: "100%",
                    height: "50px",
                    color: "white",
                    marginTop: "20px",
                  }}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Flex>
        <Flex flexDirection={"column"} ml={300} style={{ width: "100%" }}>
          <Flex
            style={{ paddingTop: "50px" }}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
          >
            <StyledImage src="https://videoencryptor.com/assets/images/tinyImage/contact-top.png" />
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Flex flexDirection={"column"} style={{ gap: 10 }}>
              <Flex alignItems={"center"} style={{ gap: 10 }}>
                <IoLocationOutline color="#ba68c8" size={25} />
                <Typography>Addis Ababa Science and Technology</Typography>
              </Flex>
              <Flex alignItems={"center"} style={{ gap: 10 }}>
                <FaPhoneAlt color="#ba68c8" size={25} />
                <Typography>+251912345678</Typography>
              </Flex>
              <Flex alignItems={"center"} style={{ gap: 10 }}>
                {" "}
                <AiOutlineMail color="#ba68c8" size={25} />
                <Typography>Agriai@gmail.com</Typography>
              </Flex>
            </Flex>
            <Flex paddingBottom={50}>
              <StyledIcons>
                <StyledButton>
                  <FaFacebook size={30} color="#ba68c8" />
                </StyledButton>
                <StyledButton>
                  <FaInstagramSquare size={30} color="#ba68c8" />
                </StyledButton>
                <StyledButton>
                  <FaLinkedin size={30} color="#ba68c8" />
                </StyledButton>
                <StyledButton>
                  <AiFillTwitterCircle size={30} color="#ba68c8" />
                </StyledButton>
              </StyledIcons>
            </Flex>
          </Flex>
        </Flex>
      </Paper>
    </Flex>
  );
};

const StyledImage = styled.img`
  width: 500px;
  height: 500px;
  padding-bottom: 80px;
`;
const StyledIcons = styled.div`
  background-color: #e5cee9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 150px;
  margin-top: -48px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
const StyledButton = styled.button`
  cursor: pointer;
  background-color: #e5cee9;
  border: none;
`;
export default ContactUsComponent;
