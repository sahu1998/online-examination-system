import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, Link } from "react-router-dom";

const pages = [
  { name: "Home", path: "/" },
  { name: "Practice Exam", path: "/practices" },
  { name: "LMS", path: "/lms" },
  { name: "Courses", path: "/courses" },
  { name: "Pattern", path: "/pattern" },
  { name: "Pricing", path: "/pricing" },
  { name: "Syllabus", path: "/syllabus" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "currentColor" }}>
        <Container maxWidth="xl" sx={{ backgroundColor: "currentColor" }}>
          {/* /////......logo......///// */}
          <Toolbar disableGutters>
            <img
              src="https://cdn0.iconfinder.com/data/icons/education-15/500/examination-512.png"
              height={50}
              width={60}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "cursive",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              Online Exam..
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="black"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((tabs) => {
                  return(
                  <MenuItem  onClick={handleCloseNavMenu}>
                    <NavLink to={tabs.path} style={{ textDecoration: "none" }}>
                      <Typography textAlign="center" sx={{ color: "black" }}>
                        {tabs.name}
                      </Typography>
                    </NavLink>
                  </MenuItem>
)})}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "cursive",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              Online Exam..
            </Typography>
            {/* ////////.......All tabes.......///////// */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                marginLeft: "14rem",
              }}
            >
              {pages.map((tab) => {
                return(
                <NavLink  to={tab.path} style={{ textDecoration: "none" }}>
                  <Button
                   
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "black",
                      display: "block",
                      fontSize: "13px",
                      fontFamily: "inherit",
                    }}
                  >
                    {tab.name}
                  </Button>
                </NavLink>
)})}
            </Box>
            {/* /////////.....Buttons.....///////// */}

            <Link to="/createaccount" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  fontSize: "13px",
                  backgroundColor: "ghostwhite",
                  color: "black",
                  fontFamily: "inherit",
                  border: "ridge",
                  marginRight: "6px",
                }}
                variant=""
              >
                Create Account
              </Button>
            </Link>
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  textDecoration: "none",
                  fontSize: "13px",
                  backgroundColor: "ghostwhite",
                  color: "black",
                  fontFamily: "inherit",
                  border: "solid",
                }}
                variant=""
              >
                Sign In
              </Button>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Navbar;
