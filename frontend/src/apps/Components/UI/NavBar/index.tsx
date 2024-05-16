import { AppBar, Toolbar, Typography } from "@mui/material";

const NavigationBar = () => {
  return (
    <AppBar
      component="nav"
      sx={{
        background: "transparent",
        boxShadow: "none",
        width: "100%",
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
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
