import { Paper } from "@mui/material";
import { Flex } from "../../../BasicStyles/Flex";
const UserProfileComponent = () => {
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
              Profile
            </Flex>
          </Flex>
        </Flex>
      </Paper>
    </Flex>
  );
};

export default UserProfileComponent;
