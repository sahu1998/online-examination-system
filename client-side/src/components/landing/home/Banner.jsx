import { Grid } from "@mui/material";
import React from "react";

function Banner() {
  return (
    <div className="banner">
      <div className="py-5 fw-bold fs-1 text-center">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sm={12}>
            <img
              src={"assets/images/landing/banner3.png"}
              alt="banner"
              className="w-75 m-auto"
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} className="m-auto text-white">
            Online Learning and Examination System
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Banner;
