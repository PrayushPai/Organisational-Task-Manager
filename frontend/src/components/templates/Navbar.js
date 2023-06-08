import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbar = () => {
  const navigate = useNavigate();

  let user = sessionStorage.getItem("usertype");
  console.log(user);

  if (user === "I") {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Task Allocation System
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit" onClick={() => navigate("/institute/profile")}>
              Profile
            </Button>
            <Button color="inherit" onClick={() => {
              sessionStorage.clear();
              window.location.href = "/";
            }}>
              LOGOUT
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
  if (user === "U") {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Task Allocation System
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit" onClick={() => navigate("/user/profile")}>
              Profile
            </Button>
            <Button color="inherit" onClick={() => navigate("/user/tasks")}>
              Task Manager
            </Button>
            <Button color="inherit" onClick={() => {
              sessionStorage.clear();
              window.location.href = "/";
            }}>
              LOGOUT
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
  else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Task Allocation System
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit" onClick={() => navigate("/register")}>
              Register
            </Button>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

};

export default Navbar;