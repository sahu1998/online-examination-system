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
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import FeedbackIcon from "@mui/icons-material/Feedback";
import SettingsIcon from "@mui/icons-material/Settings";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

const drawerWidth = 240;
const ProfileArray = [
  { name: "My Profile", path: "/myprofileOwner" },
  { name: "Theams", path: "/ownertheam" },
  { name: "Language", path: "/ownerlanguage" },
  { name: "Send Push Notification", path: "/ownernotification" },
  { name: "Change Password", path: "/ownerPassword" },
  { name: "Logout", path: "/ownerlogout" },
];
const Array = [
  { name: "Dashboard", path: "/owner", icon: <DashboardIcon /> },
  { name: "Language", path: "/ownerlanguage", icon: <GTranslateIcon /> },
  { name: "User", path: "/users", icon: <AccountCircleIcon /> },
  {
    name: "Exam",
    path: "",
    icon: <ComputerIcon />,
    subcatg: [
      { name: "Categories", url: "/ownercategories" },
      { name: "Question Bank", url: "/ownerquestion" },
      { name: "Exam Type", url: "/ownerexamtype" },
      { name: "Instructions", url: "/ownerinstruct" },
      { name: "Subject Type", url: "/ownersubject" },
    ],
  },
  { name: "LMS", path: "/ownerlms", icon: <DesktopWindowsIcon /> },
  {
    name: "Notification",
    path: "/ownernotification",
    icon: <NotificationsActiveIcon />,
  },
  { name: "Feedback", path: "/ownerfeedback", icon: <FeedbackIcon /> },
  { name: "Master Settings", path: "/ownersettings", icon: <SettingsIcon /> },
];
const settings = [{ name: "Settings", url: "/ownercategories" }];

function OwnerSideBar({ children }) {
  const [settingsdata, setSettingsdata] = React.useState(null);

  const handleClick4 = (event) => {
    setSettingsdata(event.currentTarget);
  };

  const handleClose4 = () => {
    setSettingsdata(null);
  };

  const open4 = Boolean(settingsdata);
  const id4 = open4 ? "simple-popover" : undefined;

  //.............................................................................................
  const [lmsdata, setLmsdata] = React.useState(null);

  const handleClick3 = (event) => {
    setLmsdata(event.currentTarget);
  };

  const handleClose3 = () => {
    setLmsdata(null);
  };

  const open3 = Boolean(lmsdata);
  const id3 = open3 ? "simple-popover" : undefined;

  //...........................................................................................
  const [examdata, setExamdata] = React.useState(null);

  const handleClick2 = (event) => {
    setExamdata(event.currentTarget);
  };

  const handleClose2 = () => {
    setExamdata(null);
  };

  const open2 = Boolean(examdata);
  const id2 = open2 ? "simple-popover" : undefined;
  // .......................................................................................
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
    <div style={{}}>
      <Toolbar />
      <Divider />
      <List>
        {Array.map((text) => (
          <>
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
          </>
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
          background: "linear-gradient(45deg, #7500d1, #b26ddc)",
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

            <Typography>
              Owner{" "}
              <Button onClick={handleClick}>
                <Avatar src="/broken-image.jpg" />
                <ArrowDropDownIcon sx={{ fontSize: "2rem", color: "white" }} />
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
              background: "#e8cef582",
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
        {children}
      </Box>
    </Box>
  );
}
export default OwnerSideBar;
