import React from "react";
import { useNavigate } from "react-router-dom";

import "@react-pdf-viewer/core/lib/styles/index.css";
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { serverURL } from "../../../apiHandler";
import { Viewer ,Worker} from "@react-pdf-viewer/core";
import PDFViewer from "pdf-viewer-reactjs";
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Grid } from "@mui/material";

// Plugins

// Import styles

const View = ({ viewData }) => {
  
  console.log("viewData========", viewData);
  console.log("====", `${serverURL}/view/${viewData}`);
  

  return (
    <div>
      {viewData.map((row, index) => {
        console.log(`${serverURL}/view/${row.viewImage?.split("\\")[2]}`);
        return (
          <div>
            {/* <p>{row.viewName}</p> */}
            {/* "http://localhost:8080/oes/view/pk.pdf.docx" */}
            {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.js">
            <Viewer
              fileUrl={`${serverURL}/view/${row.viewImage?.split("\\")[2]}`}
              plugins={[newPlugin]}
            />
            </Worker> */}
            <Grid item xs={8}>
          
            <iframe src={`${serverURL}/view/${row.viewImage?.split("\\")[2]}`} height="700" width="1100" className="mt-2 "></iframe>
          
        </Grid>
            {/* {Viewer && "http://localhost:8080/oes/view/resum1.pdf" && (
              <Viewer fileUrl={`http://localhost:8080/oes/view/resum1.pdf`} />
            )} */}
            {/* <PDFViewer
              document={{
                url:`${serverURL}/view/${row.viewImage?.split("\\")[2]}`
                // url: "http://localhost:8080/oes/view/resum1.pdf",
              }}
            /> */}
          </div>
        );
      })}
      
    </div>
  );
};
export default View;
