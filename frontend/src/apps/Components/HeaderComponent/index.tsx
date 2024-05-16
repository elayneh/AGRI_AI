import styled from "styled-components";
import { theme } from "../../Styles/theme";
import { RxHamburgerMenu } from "react-icons/rx";
import { Flex } from "../../BasicStyles/Flex";
import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import MultiSelector from "../UI/MultiSelector";
import { CiSearch } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import { SideBarProps } from "../SidebarComponent/types";
import { SetStateAction, useState } from "react";
import { IoMdClose } from "react-icons/io";
import "./style.css";
import { useLoginPageSlice } from "../../Pages/MembershipPage/LoginPage/slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const HeaderComponent = ({ setShowSideBar, showSideBar }: SideBarProps) => {
  const { actions } = useLoginPageSlice();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState(false);
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleClickClear = () => {
    setSearchValue("");
  };

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchValue(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickShowSearch = () => {
    console.log("search button is clicked");
    setSearchValue("");
  };
  const toggleSideBarShow = (showSideBar: boolean) => {
    setShowSideBar(!showSideBar);
  };
  const toggleDrawer = (value: boolean) => {
    setAnchor(value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleLogout = () => {
    dispatch(actions.logout());
    setOpen(false);
    navigate("/landingPage");
  };
  const handleSetting = () => {};
  const handleProfile = () => {};
  return (
    <HeaderContainer>
      <Flex padding={20} color={theme.colors.black[4]}>
        <Flex marginTop={9} style={{ cursor: "pointer" }}>
          {
            <RxHamburgerMenu
              size={30}
              onClick={() => toggleSideBarShow(showSideBar)}
            />
          }
        </Flex>
        <Flex alignItems={"center"} justifyContent={"space-between"} ml={20}>
          <Avatar
            alt="Remy Sharp"
            sx={{ width: 40, height: 40 }}
            src="https://www.w3schools.com/howto/img_avatar.png"
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              color: "green",
              textTransform: "uppercase",
            }}
          >
            AgriAI
          </Typography>{" "}
        </Flex>
        <Vr />
      </Flex>
      <Flex
        color={theme.colors.black[4]}
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        pl={120}
      >
        <FormControl sx={{ width: "50%" }}>
          <OutlinedInput
            type={"text"}
            placeholder="Search"
            value={searchValue}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                {searchValue && (
                  <IconButton onClick={handleClickClear} edge="end">
                    <IoMdClose />
                  </IconButton>
                )}
              </InputAdornment>
            }
            sx={{
              borderRadius: "50px 0 0 50px",
              background: `${theme.colors.background[8]}`,
              height: "40px",
            }}
          />
        </FormControl>
        <Button
          variant="outlined"
          color="info"
          style={{
            borderRadius: "0px 50px 50px 0px",
            justifyContent: "center",
            marginLeft: -42,
            height: 40,
          }}
        >
          <IconButton
            onClick={() => handleClickShowSearch()}
            className="search-icon"
          >
            {<CiSearch />}
          </IconButton>
        </Button>
        <Flex>
          <MultiSelector />
        </Flex>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Badge badgeContent={"99+"} color="error">
            <GoBell color="action" size={20} />
          </Badge>
          <IconButton
            onClick={() => toggleDrawer(true)}
            className="avatar-icon"
          >
            <Avatar
              alt="Remy Sharp"
              sx={{ width: 40, height: 40, marginLeft: 2 }}
              src="https://www.w3schools.com/howto/img_avatar.png"
            />
          </IconButton>
        </Flex>
      </Flex>
      <Flex>
        <SwipeableDrawer
          anchor={"right"}
          open={anchor}
          onClose={() => toggleDrawer(false)}
          onOpen={() => toggleDrawer(true)}
          PaperProps={{
            style: {
              width: "280px",
              background: "#FFF",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              padding: "10px",
            },
          }}
        >
          {/* header : email,avatar, name, closing icon */}

          <Flex flexDirection={"column"} style={{ gap: 10 }}>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              style={{ paddingTop: 10 }}
            >
              <Flex>
                <Avatar
                  alt="Remy Sharp"
                  sx={{ width: 30, height: 30 }}
                  src="https://www.w3schools.com/howto/img_avatar.png"
                />
                <Flex flexDirection={"column"} ml={10}>
                  <Typography style={{ fontSize: 10 }}>{name}</Typography>
                  <Typography style={{ fontSize: 10 }}>{email}</Typography>
                </Flex>
              </Flex>
              <Flex>
                <IconButton
                  className="iconButton"
                  onClick={() => toggleDrawer(false)}
                >
                  <IoMdClose size={20} className="IoMdClose" />
                </IconButton>
              </Flex>
            </Flex>
            <ProfileButton
              onClick={() => {
                handleProfile();
                toggleDrawer(false);
              }}
              style={{ fontSize: 10 }}
            >
              Profile
            </ProfileButton>
            <Divider />
            <ProfileButton
              onClick={() => {
                handleSetting();
                toggleDrawer(false);
              }}
              style={{ fontSize: 10 }}
            >
              Settings
            </ProfileButton>
            <Divider />
            <ProfileButton
              onClick={() => {
                handleClickOpen();
                toggleDrawer(false);
              }}
              style={{ fontSize: 10 }}
            >
              Logout
            </ProfileButton>
          </Flex>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
              style: {
                width: "500px",
                height: "90px",
                padding: "50px",
                display: "flex",
                flexDirection: "column",
                paddingRight: "0px",
              },
            }}
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are You Sure to Leave this system ?
              </DialogContentText>
            </DialogContent>
            <DialogActions
              style={{ marginTop: "auto", marginBottom: "-50px", gap: 30 }}
            >
              <Button
                onClick={handleClose}
                variant="outlined"
                color="error"
                style={{
                  width: "130px",
                  height: "45px",
                }}
              >
                No
              </Button>
              <Button
                onClick={handleLogout}
                variant="outlined"
                color="success"
                style={{
                  width: "130px",
                  height: "40px",
                }}
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          {/* profile */}
          {/* setting */}
          {/* logout */}

          {/* if role === seeker, skills */}
          {/* experience */}
          {/* education */}
          {/* if role === recruiter */}
        </SwipeableDrawer>
      </Flex>
    </HeaderContainer>
  );
};

const HeaderContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  background: ${theme.colors.white[8]};
  color: ${theme.colors.black[4]};
  width: 100%;
  left: 0;
  top: 0;
  height: 70px;
  z-index: 5;
`;

const Vr = styled("div")`
  border: 1px solid ${theme.colors.black[2]};
  height: 50px;
  margin-left: 70px;
`;
const Divider = styled("hr")`
  border: none;
  border-top: 1px solid #e1e4e8;
  margin: 5px 0;
`;

const ProfileButton = styled(Button)`
  && {
    display: flex;
    width: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: white;
    color: black;
    text-transform: none;
    padding: 16px;
    font-weight: 400;
    font-size: 16px;
    transition: background-color 0.3s;
    border-radius: 0;
  }
  &&:hover {
    background-color: #f6f8fa;
  }
`;

export default HeaderComponent;
