import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Button, Container, TextField, Typography } from "@mui/material";
import Cards from "./card";
import SearchIcon from "@mui/icons-material/Search";
import "./lms.css";
import { getApiHandler } from "../../../apiHandler";
import { Result } from "antd";
import SearchLms from "./SearchLms";

export default function IconMenu() {
  const [category, setCategory] = React.useState([]);

  const [getIdData, setGetIdData] = React.useState([]);
  const [id, setId] = React.useState();
  const [hed, setHed] = React.useState();

  const getByData = async () => {
    const getApi = await getApiHandler("/getLmsCat");
    console.log("getApi====", getApi.data);
    setCategory(getApi.data);
    console.log("category   ==========7777777=====", getApi.data);
    console.log("category====", category);

    await getById(getApi.data[0]._id);
  };
  const getById = async (catg) => {
    console.log("id=====", catg);
    const getById = await getApiHandler(`/getLmsSub?id=${catg}`);
    console.log("getById=====", getById.data);
    setGetIdData(getById.data);
  };

  React.useEffect(() => {
    getByData();
  }, []);
  React.useEffect(() => {
    if (id) {
      getById(id);
    }
  }, [id]);
  return (
    <Container className="my-5">
      <Grid container spacing={3}>
        <Grid item xs={12} md={2} sm={12}>
          <Paper>
            <MenuList>
              {category.length ? (
                category.map((row, index) => {
                  return (
                    <div key={index}>
                      <MenuItem>
                        <ListItemText
                          onClick={() => {
                            setId(row._id);
                          }}
                        >
                          {row.examName}
                        </ListItemText>
                      </MenuItem>
                      <Divider />
                    </div>
                  );
                })
              ) : (
                <Grid item xs={12} md={12} sm={12}>
                  <p>!no data found</p>
                </Grid>
              )}
            </MenuList>
          </Paper>
        </Grid>

        <Grid item container xs={12} md={10} sm={12}>
          <Grid item xs={12} md={12} sm={12}>
            <SearchLms />
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <div className="bg-white p-3 fw-bold rounded border text-black-50">
              {hed}
            </div>
          </Grid>
          <Cards data={getIdData} setHed={setHed} />
        </Grid>
      </Grid>
    </Container>
  );
}
