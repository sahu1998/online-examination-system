import React from "react";
import {
  Card,

  CardBody,

  Divider,

  Stack,
  ButtonGroup,
  Heading,
  color,
} from "@chakra-ui/react";
import "./lms.css";
import Grid from "@mui/material/Grid";
import { serverURL } from "../../../apiHandler";
import { Result } from "antd";
const Cards = ({ data, setHed }) => {
  console.log("data===============", data);
  // console.log(`${serverUrl}/lms-image/${data[0].image?.split("\\")[2]}`)





  return (<>
    {data.length ? (data.map((row, index) => {
      return (

        <Grid item xs={12} md={4} sm={4} className="shadow-sm" key={index}>

          <Card maxW="sm" className="card1" >
            <CardBody >
              <img
                src={`${serverURL}/lms-image/${row.image?.split("\\")[2]}`}
                width={"95%"}
                className="p-2"
              />
              <Stack mt="6" spacing="3"></Stack>
              <Grid item xs={12} className="d-flex" >
                <Grid item xs={6}>
                  <h4>{row.subjectName}</h4>
                  <p>total-item :{row.totalItem}</p>
                  <p>{setHed(row.category[0].examName)} </p>
                </Grid>
                <Grid item xs={6}  >
                  <button type="button" className="btn btn-warning btn1 mt-4">
                    {" "}
                    view
                  </button>
                </Grid>
              </Grid>
            </CardBody>
            <Divider />
          </Card>

        </Grid>

      );
    })) : (<Grid item xs={12} md={12} sm={12}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, No Data Found..."
      />
    </Grid>)}


  </>);
};
export default Cards;
