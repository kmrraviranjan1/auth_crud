import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
const AppLayout = ({ title, children }) => {
  const { user, isAuthenticated, logoutUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleAuth = () => {
    if (isAuthenticated) {
      logoutUser();
    }
    navigate("/auth");
  };
  const handleProfileClick = () => {
    navigate("/profile");
  };
  // const avatarInitial = user?.name[0]?.toUpperCase() ?? "R";
  const avatarInitial ="R";
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={handleProfileClick}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Avatar>{avatarInitial} </Avatar>
          </IconButton>
          <Typography variant="h6" component="p" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button color="inherit" onClick={handleAuth}>
            {isAuthenticated ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};

export default AppLayout;
