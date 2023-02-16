import React from "react";
import Container from "@mui/material/Container";
import { Button, TextField, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import "./index.css";

const pages = [
  { name: "Practice Exam", path: "/practices" },
  { name: "LMS", path: "/lms" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
  { name: "Terms And Condition", path: "/Condition" },
  { name: "Privacy And Policy", path: "/Policy" },
];
export default function Footer() {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ background: "linear-gradient(176deg, #f5eded, #4998d0)" }}
      >
        <div style={{ display: "flex", padding: "6rem" }}>
          <div style={{ width: "20rem", padding: "1rem" }}>
            <img
              src="https://cdn0.iconfinder.com/data/icons/education-15/500/examination-512.png"
              height={80}
              width={100}
            />
            <Typography
              variant="h4"
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
            {/* /////...................icons..............////////// */}
            <Typography sx={{ color: "whitesmoke", fontFamily: "inherit" }}>
              Follow Us On
            </Typography>
            <div style={{ display: "flex", gap: "8px" }}>
              <div>
                <NavLink>
                  <FacebookIcon className="footer-icon" />
                </NavLink>
              </div>
              <div>
                <NavLink>
                  <InstagramIcon className="footer-icon" />
                </NavLink>
              </div>
              <div>
                <NavLink>
                  <TwitterIcon className="footer-icon" />
                </NavLink>
              </div>
              <div>
                <NavLink>
                  <GoogleIcon className="footer-icon" />
                </NavLink>
              </div>
            </div>
          </div>
          {/* //////.....Tabes......////// */}
          <div style={{ padding: "1rem" }}>
            <Typography
              textAlign="start"
              variant="h6"
              sx={{ color: "whitesmoke", fontFamily: "inherit" }}
            >
              Need Help?
            </Typography>
            <br />
            {pages.map((pages) => {
              return(
               
              <NavLink  to={pages.path} style={{ textDecoration: "none" }}>
                <Typography textAlign="start" sx={{ color: "white" }}>
                  {pages.name}
                </Typography>
              </NavLink>
              
)})}
          </div>
          <div style={{ padding: "5rem" }}>
            <div style={{ display: "flex" }}>
              <TextField
                sx={{ border: "solid 3px whitesmoke", width: "22rem" }}
                placeholder="Email Address"
                variant="outlined"
              />
              <Button sx={{ background: "black" }} variant="contained">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
