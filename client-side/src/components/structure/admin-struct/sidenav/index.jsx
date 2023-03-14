import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ComputerIcon from "@mui/icons-material/Computer";
import SellIcon from "@mui/icons-material/Sell";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import PaymentIcon from "@mui/icons-material/Payment";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import MailIcon from "@mui/icons-material/Mail";
import SmsIcon from "@mui/icons-material/Sms";
import FeedbackIcon from "@mui/icons-material/Feedback";
import SettingsIcon from "@mui/icons-material/Settings";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;
const ProfileArray = [
  { name: "My Profile", path: "/myprofileAdmin" },
  { name: "Theams", path: "/admintheam" },
  { name: "Language", path: "/adminlanguage" },
  { name: "Send Push Notification", path: "/adminnotification" },
  { name: "Change Password", path: "/adminPassword" },
  { name: "Logout", path: "/adminlogout" },
];
const Array = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { name: "Language", path: "/adminlanguage", icon: <GTranslateIcon /> },
  { name: "User", path: "/adminuser", icon: <AccountCircleIcon /> },
  { name: "Exam", path: "/adminexam", icon: <ComputerIcon /> },
  { name: "LMS", path: "/adminlms", icon: <DesktopWindowsIcon /> },
  {
    name: "Notification",
    path: "/adminnotification",
    icon: <NotificationsActiveIcon />,
  },
  { name: "Feedback", path: "/adminfeedback", icon: <FeedbackIcon /> },
];

function AdminSideBar({ children }) {
  const history = useNavigate();

  if (!localStorage.getItem("token")) {
    history("/logIn");
  }
  React.useEffect(() => {
    if (localStorage.getItem("role") !== "admin") {
      history("/logIn");
    }
  }, [localStorage.getItem("token")]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {Array.map((text) => (
          <NavLink to={text.path} style={{ textDecoration: "none" }}>
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText
                  sx={{
                    color: "black",
                    fontFamily: "initial",
                    fontSize: "20px",
                  }}
                  primary={text.name}
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(162deg, #ffc107, #e8d1058c)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src="https://cdn0.iconfinder.com/data/icons/education-15/500/examination-512.png"
            height={50}
            width={60}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mr: 2,
                fontFamily: "cursive",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "white",
                textShadow: "1px 2px black",
              }}
            >
              Online Exam..
            </Typography>

            <Typography sx={{ color: "black" }}>
              Admin
              <Button onClick={handleClick}>
                <Avatar src="/broken-image.jpg" />
                <ArrowDropDownIcon sx={{ fontSize: "2rem", color: "black" }} />
              </Button>
            </Typography>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              {ProfileArray.map((info) => (
                <NavLink
                  to={info.path}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Typography sx={{ padding: "5px", fontSize: "inherit" }}>
                    {info.name}
                  </Typography>
                </NavLink>
              ))}
            </Popover>
          </div>
          <LogoutIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              localStorage.removeItem("token");
              history("/logIn");
            }}
          />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
export default AdminSideBar;
