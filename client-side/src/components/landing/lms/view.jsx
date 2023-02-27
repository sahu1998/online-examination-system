import React from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { serverURL } from "../../../apiHandler";
import { Grid } from "@mui/material";
const View = ({ viewData }) => {
  console.log("viewData========", viewData);
  console.log("====", `${serverURL}/view/${viewData}`);
  return (
    <div>
      {viewData.map((row, index) => {
        console.log(`${serverURL}/view/${row.viewImage?.split("\\")[2]}`);
        return (
          <div>
            <Grid item xs={8}>
              <iframe
                src={`${serverURL}/view/${row.viewImage?.split("\\")[2]}`}
                height="700"
                width="1100"
                className="mt-2 "
              ></iframe>
            </Grid>
          </div>
        );
      })}
    </div>
  );
};
export default View;
