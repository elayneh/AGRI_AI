import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AccountCircleSharp } from "@mui/icons-material";
import { useLoginPageSlice } from "../../../Pages/MembershipPage/LoginPage/slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AuthNavigationBar = () => {
  const [open, setOpen] = useState(false);
  const { actions } = useLoginPageSlice();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleLogout = () => {
    dispatch(actions.logout());
    setOpen(false);
    navigate("/landingPage");
  };
  return (
    <AppBar
      component="nav"
      sx={{
        background: "transparent",
        boxShadow: "none",
        width: "100%",
        position: "fixed",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: "green",
            fontSize: "25px",
            paddingTop: "-5px",
          }}
        >
          AgriAI
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton style={{ color: "#004024", marginRight: "10px" }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton
            style={{ color: "#004024" }}
            onClick={() => {
              handleClickOpen();
            }}
          >
            <AccountCircleSharp />
          </IconButton>
        </div>
      </Toolbar>
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
    </AppBar>
  );
};

export default AuthNavigationBar;
