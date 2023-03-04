import { Input, Table, Text, Dropdown } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  deleteApiHandler,
  getApiHandler,
  postApiHandler,
  putApiHandler,
} from "../../../apiHandler";

import OwnerLayout from "../../../layouts/owner-layout";
import { Box, Button, Grid, TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import * as React from "react";
import { Typography } from "antd";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function NotificationOwner() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { register, handleSubmit, watch, reset, setValue } = useForm();
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const token = localStorage.getItem("token");
  const history = useNavigate();

  const onSubmit = async (value) => {
    console.log("VALUE", value);
    const response = id
      ? await putApiHandler(`/put-notification/${token}/${id}`, value)
      : await postApiHandler(`/post-notification/${token}`, value);
    console.log("RES", response);

    if (response.auth === "false") {
      localStorage.removeItem("token");
      history("/logIn");
    }
    getData();
    setId("");
    reset();
  };

  const getData = async () => {
    const res = await getApiHandler(`/get-notification/${token}`);
    console.log("aaaaaaaaa=?", res);
    if (res.auth === "false") {
      localStorage.removeItem("token");
      history("/logIn");
    }
    setData(res.data);
  };
  useEffect(() => {
    if (id) {
      getDataById();
    }
    getData();
  }, [id]);

  const deleteData = async (id) => {
    const response = await deleteApiHandler(
      `/delete-notification/${token}/${id}`
    );
    console.log("DELETE", response);
    if (response.status === 200 && response.auth === "true") {
      swal("delete  successfully!", "You clicked the button!", "success");
    } else {
      localStorage.removeItem("token");
      history("/logIn");
    }

    getData();
  };

  const getDataById = async () => {
    const response = await getApiHandler(
      `/get-notificationById/${token}/${id}`
    );
    console.log("RESS", response.data);
    const { title, url, validFrom, validTo, desc } = response.data;
    setValue("title", title);
    setValue(" url", url);
    setValue("validFrom", validFrom);
    setValue("validTo", validTo);
    setValue(" desc", desc);
  };

  return (
    <OwnerLayout>
      <div className="my-5">
        <Button
          onClick={handleOpen}
          auto
          as="a"
          rel="noopener noreferrer"
          target="_blank"
          css={{
            maxWidth: "$12", // space[12]
            borderRadius: "$xs", // radii.xs
            border: "$space$1 solid transparent",
            background: "$gray400", // colors.gray800
            color: "$gray800",
            height: "$12", // space[12]
            boxShadow: "$md", // shadows.md
            "&:hover": {
              background: "$gray100",
              color: "$gray800",
            },
            "&:active": {
              background: "$gray200",
            },
            "&:focus": {
              borderColor: "$gray400",
            },
          }}
        >
          CREATE
        </Button>
        <br />

        <Table
          bordered
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header>
            <Table.Column>TITLE</Table.Column>
            <Table.Column>START DATE</Table.Column>

            <Table.Column>END DATE</Table.Column>
            <Table.Column>URL</Table.Column>

            <Table.Column>POSTEDON</Table.Column>

            <Table.Column></Table.Column>
          </Table.Header>

          <Table.Body>
            {data.map((row) => (
              <Table.Row>
                <Table.Cell>{row.title}</Table.Cell>
                <Table.Cell>{row.validFrom}</Table.Cell>
                <Table.Cell>{row.validTo}</Table.Cell>
                {/* <NavLink to={row.url}> */}
                <Table.Cell>
                  <Link to={row.url} target="_blank">
                    {row.url}
                  </Link>
                </Table.Cell>
                {/* </NavLink> */}

                <Table.Cell>{row.postedOn}</Table.Cell>
                <Table.Cell>
                  <Dropdown>
                    <Dropdown.Button
                      flat
                      css={{
                        background: "$gray400",
                        color: "$gray800",
                      }}
                    >
                      Action
                    </Dropdown.Button>
                    <Dropdown.Menu aria-label="Static Actions">
                      <Dropdown.Item key="edit">
                        <Button
                          onClick={() => {
                            setId(row._id);
                            handleOpen();
                          }}
                          className="btn"
                        >
                          Edit
                        </Button>
                      </Dropdown.Item>
                      <Dropdown.Item key="delete">
                        <Button
                          onClick={() => {
                            deleteData(row._id);
                          }}
                          className="btn"
                        >
                          Delete
                        </Button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Pagination
            shadow
            noMargin
            align="center"
            color="neutral"
            rowsPerPage={5}
            onPageChange={(page) => console.log({ page })}
          />
        </Table>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <div style={{ width: "30rem" }}>
              <Box
                sx={style}
                style={{
                  width: "45rem",
                  height: "38rem",
                  margin: "3rem",
                }}
              >
                <Typography className="typography">Add Notification</Typography>
                <Box
                  component="form"
                  sx={{
                    width: "100%",
                    marginTop: "3rem",
                  }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Grid
                    container
                    rowSpacing={5}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6}>
                      <Typography variant="h1" className="type">
                        Title
                      </Typography>

                      <Input
                        clearable
                        bordered
                        fullWidth
                        color="gradient"
                        size="lg"
                        placeholder="Title"
                        {...register("title")}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      {" "}
                      <Typography variant="h1" className="type">
                        Url
                      </Typography>
                      <Input
                        clearable
                        bordered
                        fullWidth
                        color="gradient"
                        size="lg"
                        placeholder="www.sitename.com"
                        {...register("url")}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      {" "}
                      <Typography variant="h1" className="type">
                        Valid From
                      </Typography>
                      <Input
                        clearable
                        bordered
                        fullWidth
                        color="gradient"
                        size="lg"
                        placeholder="yy/mm/dd"
                        {...register("validFrom")}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      {" "}
                      <Typography variant="h1" className="type">
                        Valid To
                      </Typography>
                      <Input
                        clearable
                        bordered
                        fullWidth
                        color="gradient"
                        size="lg"
                        placeholder="yy/mm/dd"
                        {...register("validTo")}
                      />
                    </Grid>
                    <Grid item xs={12} style={{ height: "10rem" }}>
                      <Typography variant="h1" className="type">
                        Description
                      </Typography>

                      <textarea
                        rows="4"
                        cols="65"
                        required
                        name="desc"
                        placeholder="Description"
                        {...register("desc")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        className="button"
                        onClick={handleClose}
                      >
                        CREATE
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </div>
          </Fade>
        </Modal>
      </div>
    </OwnerLayout>
  );
}
