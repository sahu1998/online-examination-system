import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Divider,
  Stack,
  ButtonGroup,
  Heading,
  color,
  CardFooter,
  ChakraProvider,
  Button,
} from "@chakra-ui/react";
import "./lms.css";
import Grid from "@mui/material/Grid";
import { getApiHandler, serverURL } from "../../../apiHandler";
import { Result } from "antd";
import { CardMedia } from "@mui/material";

const Cards = ({ data, setViewId }) => {
  console.log("data===============", data);
  // console.log(`${serverUrl}/lms-image/${data[0].image?.split("\\")[2]}`)

  return (
    // data.length ? (
    data.map((row, index) => {
      return (
        <Grid item xs={12} md={3} sm={4} className="shadow-sm" key={index}>
          <Card maxW="sm" className="card1">
            <CardBody>
              <img
                src={`${serverURL}/lms-sub/${row.image?.split("\\")[2]}`}
                width={"100%"}
                className=""
                style={{ height: "200px", objectFit: "fill" }}
              />
              <Stack mt="6" spacing="3"></Stack>
              <Grid item xs={12} className="d-flex">
                <Grid item xs={6}>
                  <h4>{row.subjectName}</h4>
                </Grid>
              </Grid>
            </CardBody>
            <Divider />
            <CardFooter>
              <div className="text-end w-100 text-end">
                <ChakraProvider>
                  <Button
                    colorScheme="green"
                    onClick={() => setViewId(row._id)}
                  >
                    View
                  </Button>
                </ChakraProvider>
              </div>
            </CardFooter>
          </Card>

        

        </Grid>
      );
    })
    //   )
    //  : (
    //   <Grid item xs={12} md={12} sm={12}>
    //     <Result status="404" title="404" subTitle="Sorry, No Data Found..." />
    //   </Grid>
    // )
  );
};
export default Cards;
