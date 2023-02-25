import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { getApiHandler } from "../../../../apiHandler";
import { useState } from "react";

import { Divider } from "@mui/material";
import CategoryCard from "./categoryCard";
import Cards from "../../../landing/lms/card";
import View from "../../../landing/lms/view";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Categories() {
  const [category, setCategory] = useState([]);
  const [content, setContent] = useState([]);
  const [id, setId] = useState();
const [viewId,setViewId]=useState();
const [viewData,setViewData]=useState([]);
const getByIdView = async (catg) => {
    const getByIdData = await getApiHandler(`/getLmsView?id=${catg}`);
    console.log("getByIdData ===", getByIdData.data);
    setViewData(getByIdData.data);
    console.log("viewData------------",viewData);
  };
  React.useEffect(() => {
    if (viewId) {
      getByIdView(viewId);
    }
  }, [viewId]);
  const getData = async () => {
    const categoryData = await getApiHandler("/getLmsCat");
    console.log("categoryData==", categoryData.data);
    setCategory(categoryData.data);
  };

  const getByIdData = async () => {
    const contentData = await getApiHandler(`/getLmsSub?id=${id}`);
    console.log("contentData==", contentData.data);
    setContent(contentData.data);
  };
  React.useEffect(() => {
    if (id) {
      getByIdData();
    }
  }, [id]);

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Box sx={{ flexGrow: 1 }} className="m-5 p-5 shadow-lg p-3 mb-5 bg-white rounded" >
        <h5 className="m-2">Lms Categories</h5>
        <Divider />
        <Grid container spacing={4} className="mt-2">
          <Grid
            item
            container
            xs={12}
            md={12}
            sm={12}
            className="row gx-5"
            style={{ columnGap: "20px", rowGap: "20px" }}
          >
                       {viewId?<View viewData={viewData}/>:  id ? (
              <Cards data={content} setViewId={setViewId}/>
            ) : (
              <CategoryCard data={category} setId={setId} />
            )}
            
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
