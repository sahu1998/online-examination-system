import React from "react";
import Typography from "@mui/material/Typography";
import "./index.css";
import { Box, Grid, TextField } from "@mui/material";
// import { Box } from "@mui/system";
import LocationIcon from "@mui/icons-material/AddLocation";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Button from "@mui/material/Button";
import LandingLayout from "../../../layouts/landing-layout";

export default function ContactUs() {
  return (
    <LandingLayout>
      <div className="div-contact">
        <Typography className="typooo">Contact Our Experts Now</Typography>
      </div>
      <div
        style={{
          display: "flex",
          position: "realtive",
          right: "7rem",
          margin: "3rem",
        }}
      >
        <div>
          <Box component="form">
            <Typography className="typing">Feel Free To Contact</Typography>

            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <TextField
                  name="name*"
                  required
                  id="name"
                  placeholder="NAME*"
                  autoFocus
                  style={{ width: "23rem", marginLeft: "10rem" }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  id="email"
                  placeholder="EMAIL*"
                  name="email"
                  style={{ width: "23rem" }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  id="phone"
                  placeholder="PHONE"
                  name="email"
                  style={{ width: "23rem", marginLeft: "10rem" }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  name="subject"
                  placeholder="SUBJECT"
                  id="subject"
                  style={{ width: "23rem" }}
                />
              </Grid>
              <Grid item xs={6} style={{ height: "10rem" }}>
                <textarea
                  rows="6"
                  cols="100"
                  required
                  name="your message"
                  placeholder="YOUR MESSAGE*"
                  id="your message"
                  style={{ marginLeft: "10rem" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" class="button">
                  send Message
                </Button>
              </Grid>
            </Grid>
          </Box>
        </div>

        <div>
          <Typography className="our-contact">Our Contact Details</Typography>
          <div style={{ display: "flex" }}>
            <div>
              <LocationIcon />
            </div>
            <div>
              <p
                style={{
                  color: " #949494",
                  fontSize: " 22px",
                  fontWeight: "400",
                  lineHeight: "28px",
                  marginBottom: "0",
                  marginLeft: "1rem",
                }}
              >
                8929 Fremont Court Mchenry, IL
              </p>
              <p
                style={{
                  color: " #949494",
                  fontSize: " 22px",
                  fontWeight: "400",
                  lineHeight: "28px",
                  marginBottom: "0",
                  marginRight: "15rem",
                }}
              >
                60050
              </p>
              <p
                style={{
                  color: " #949494",
                  fontSize: " 22px",
                  fontWeight: "400",
                  lineHeight: "28px",
                  marginBottom: "0",
                  marginRight: "13rem",
                }}
              >
                {" "}
                Indonesia
              </p>
              <p
                style={{
                  color: " #949494",
                  fontSize: " 22px",
                  fontWeight: "400",
                  lineHeight: "28px",
                  marginBottom: "0",
                  marginRight: "13rem",
                }}
              >
                {" "}
                Telangana
              </p>
              <p
                style={{
                  color: " #949494",
                  fontSize: " 22px",
                  fontWeight: "400",
                  lineHeight: "28px",
                  marginBottom: "0",
                  marginRight: "16rem",
                }}
              >
                Riau
              </p>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "3rem" }}>
            <div>
              <LocalPhoneIcon />
            </div>
            <div>
              <p
                style={{
                  color: "#949494",
                  fontSize: "18px",
                  fontWeight: "400",
                  lineHeight: "28px",
                  marginBottom: 0,
                  marginLeft: "1rem",
                }}
              >
                1234567891
              </p>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
