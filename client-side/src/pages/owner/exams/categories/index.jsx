import React, { useEffect, useState } from "react";

import {
  Modal,
  Input,
  Table,
  Button,
  Text,
  Dropdown,
  Textarea,
  Grid,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  deleteApiHandler,
  getApiHandler,
  postApiHandler,
  putApiHandler,
} from "../../../../apiHandler";

import "./category.m.css";

const schema = yup.object().shape({
  examName: yup.string().required("*Category Name is required"),
  // .matches(/^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$/, "*Use only alphabats"),
  examDesc: yup.string().required("*Category Description is required"),
});

export default function PracticeCatg() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [data, setData] = useState([]);
  const [catgId, setCatgId] = useState();
  const [visible, setVisible] = useState(false);
  const onSubmit = async (values) => {
    console.log("values=>", values);
    if (catgId) {
      console.log("updating... ", values);
      const result = await putApiHandler(
        `/update-practice-catg/${catgId}`,
        values
      );
      console.log("updated.....", result);
      setCatgId(null);
    } else {
      const result = await postApiHandler("/post-exam-catg", values);
      console.log("data=>", result.data);
    }
    setVisible(false);
    await getData();
    reset();
  };
  const getData = async () => {
    const res = await getApiHandler("/get-exam-catg");
    console.log("aaaaaaaaa=?", res.data);
    setData(res.data);
  };
  const deleteData = async (id) => {
    const res = await deleteApiHandler(`/del-practice-catg/${id}`);
    await getData();
  };

  const prefilledForm = async (value) => {
    console.log(value);
    setValue("examName", value.examName);
    setValue("examDesc", value.examDesc);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="my-5">
      <Button
        onPress={() => {
          setVisible(true);
        }}
        auto
        rel="noopener noreferrer"
        target="_blank"
        css={{
          maxWidth: "$12", // space[12]
          borderRadius: "$xs", // radii.xs
          margin: "10px 0",
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
        ADD CATEGORY
      </Button>

      <Table
        bordered
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>Name</Table.Column>
          <Table.Column>Description</Table.Column>
          <Table.Column>Action</Table.Column>
        </Table.Header>

        <Table.Body>
          {data.map((a) => (
            <Table.Row>
              <Table.Cell>{a.examName}</Table.Cell>
              {/* <Table.Cell>{a.examDesc}</Table.Cell> */}
              <Table.Cell>sdfjkdsljfdsjkfjsk</Table.Cell>

              <Table.Cell>
                <Dropdown>
                  <Dropdown.Button
                    flat
                    css={{ background: "$gray400", color: "$gray800" }}
                  >
                    Action
                  </Dropdown.Button>
                  <Dropdown.Menu aria-label="Static Actions">
                    <Dropdown.Item aria-label="edit-action" key="edit">
                      <button
                        className="catg-btn-desing"
                        onClick={async () => {
                          setCatgId(a._id);
                          await prefilledForm(a);
                          setVisible(true);
                        }}
                      >
                        Edit
                      </button>
                    </Dropdown.Item>
                    <Dropdown.Item aria-label="delete-action" key="delete">
                      <button
                        className="catg-btn-desing"
                        // onPress={() => {
                        //   deleteData(a._id);
                        // }}
                      >
                        Delete
                      </button>
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
          //   onPageChange={(page) => console.log({ page })}
        />
      </Table>

      <Modal
        blur
        preventClose
        open={visible}
        onClose={() => {
          setVisible(false);
        }}
        aria-labelledby="modal-title"
        width={750}
        height={500}
      >
        <Modal.Header aria-labelledby="modal-header">
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              {catgId ? "Update Category" : "Add Category"}
            </Text>
          </Text>
        </Modal.Header>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Modal.Body aria-labelledby="modal-body">
            <Grid.Container gap={4}>
              <Grid xs={12}>
                <Input
                  clearable
                  bordered
                  fullWidth
                  color={errors?.examName ? "error" : "primary"}
                  size="lg"
                  placeholder="Title"
                  error={!!errors?.examName}
                  helperText={errors?.examName?.message}
                  helperColor="error"
                  {...register("examName")}
                  aria-labelledby="practiceCatgTitleName"
                />
              </Grid>
              <Grid xs={12}>
                <Textarea
                  clearable
                  bordered
                  fullWidth
                  color={errors?.examDesc ? "error" : "primary"}
                  size="lg"
                  placeholder="Description"
                  error={!!errors?.examDesc}
                  helperText={errors?.examDesc?.message}
                  helperColor="error"
                  {...register("examDesc")}
                  aria-labelledby="practiceCatgDisc"
                />
              </Grid>
            </Grid.Container>
          </Modal.Body>
          <Modal.Footer aria-labelledby="modal-footer">
            <Button
              auto
              flat
              color="warning"
              onPress={() => {
                setVisible(false);
                reset();
                setCatgId(null);
              }}
            >
              Close
            </Button>
            <Button type="submit" color="success">
              {catgId ? "Update" : "Add"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
