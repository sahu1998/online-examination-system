import React from "react";
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
import { serverURL } from "../../../apiHandler";
import { Result } from "antd";
import { CardMedia } from "@mui/material";
const Cards = ({ data }) => {
  console.log("data===============", data);
  // console.log(`${serverUrl}/lms-image/${data[0].image?.split("\\")[2]}`)
  return (
    // data.length ? (
    data.map((row, index) => {
      return (
        <Grid item xs={12} md={3} sm={6} className="" key={index}>
          <Card className="rounded shadow p-2 bg-white">
            <CardBody>
              <img
                src={`${serverURL}/lms-sub/${row.image?.split("\\")[2]}`}
                // width={"95%"}
                alt={row.subjectName}
                className="rounded"
                style={{ height: "200px", objectFit: "fill" }}
              />
              <Stack mt="6" spacing="3">
                <div className="fw-bold fs-5">{row.subjectName}</div>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <div className="text-end w-100 text-end">
                <ChakraProvider>
                  <Button colorScheme="green">View</Button>
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
