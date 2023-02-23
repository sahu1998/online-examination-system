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

// import "./category.m.css";

const schema = yup.object().shape({
  subjectName: yup.string().required("*Subject Name is required"),
  // .matches(/^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$/, "*Use only alphabats"),
  subjectDesc: yup.string().required("*Subject Description is required"),
  marks: yup
    .number()
    .typeError("*Marks must be a number")
    .required("*Mark is required"),
  timeLimit: yup
    .number()
    .typeError("*Time limit must be a number")
    .required("*Time limit is required"),
});

const CatgoryDropdown = ({ categories, setSelectedCatg, selectedCatg }) => {
  const [selected, setSelected] = useState("select");
  console.log("asdfdsfds: ", categories);

  console.log(selectedCatg);
  return (
    <Dropdown>
      <Dropdown.Button
        className="w-100 item-start"
        bordered
        color="primary"
        css={{ tt: "capitalize" }}
      >
        {selected}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Single selection actions"
        color="secondary"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        {categories.map((catg) => {
          return (
            <Dropdown.Item key={catg.examName}>
              <div
                className="w-100"
                onClick={() => {
                  setSelectedCatg(catg._id);
                }}
              >
                {catg.examName}
              </div>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default function PracticeSubjects() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [data, setData] = useState([]);
  const [subjectId, setSubjectId] = useState();
  const [visible, setVisible] = useState(false);
  const [catg_list, setCatg_list] = useState([]);

  const file = watch("image");

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("subjectName", values.subjectName);
    formData.append("subjectDesc", values.subjectDesc);
    formData.append("marks", values.marks);
    formData.append("timeLimit", values.timeLimit);
    formData.append("categoryId", values.categoryId);
    formData.append("image", file[0]);
    if (subjectId) {
      console.log("updating... ", values);
      const result = await putApiHandler(
        `/update-practice-catg/${subjectId}`,
        values
      );
      console.log("updated.....", result);
      setSubjectId(null);
    } else {
      const result = await postApiHandler("/postsubject", formData);
      console.log("data=>", result.data);
    }
    setVisible(false);

    await getData();
    reset();
  };

  const getCategories = async () => {
    const temp = await getApiHandler("/get-exam-catg");
    console.log("catg: ", temp.data);
    setCatg_list(temp.data);
  };

  const getData = async () => {
    const res = await getApiHandler("/getsubject");
    console.log("aaaaaaaaa=?", res.data);
    setData(res.data);
  };
  const deleteData = async (id) => {
    console.log("sdfkdsj: ", id);
    const res = await deleteApiHandler(`/delete-practice-subj/${id}`);
    await getData();
  };

  const prefilledForm = async (value) => {
    console.log(value);
    setValue("subjectName", value.subjectName);
    setValue("subjectDesc", value.subjectDesc);
    setValue("marks", value.marks);
    setValue("timeLimit", value.timeLimit);
    setValue("timeLimit", value.timeLimit);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="my-5">
      <Button
        onPress={async () => {
          await getCategories();
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
        ADD NEW SUBJECT
      </Button>

      <Table
        bordered
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>Image</Table.Column>
          <Table.Column>Subject Name</Table.Column>
          <Table.Column>Subject Category</Table.Column>
          <Table.Column>Marks</Table.Column>
          <Table.Column>Time Limit</Table.Column>
          <Table.Column>Action</Table.Column>
        </Table.Header>

        <Table.Body>
          {data.map((a) => (
            <Table.Row>
              <Table.Cell>{a.marks}</Table.Cell>
              <Table.Cell>{a.subjectName}</Table.Cell>
              <Table.Cell>{a.categoryName}</Table.Cell>
              <Table.Cell>{a.marks}</Table.Cell>
              <Table.Cell>{a.timeLimit}</Table.Cell>

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
                          setSubjectId(a._id);
                          await getCategories();
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
                        onClick={() => {
                          deleteData(a._id);
                        }}
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
        width={500}
        height={500}
      >
        <Modal.Header aria-labelledby="modal-header">
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              {subjectId ? "Update Practice Subject" : "Add Practice Subject"}
            </Text>
          </Text>
        </Modal.Header>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Modal.Body aria-labelledby="modal-body">
            <Grid.Container gap={2}>
              <Grid xs={12}>
                <Input
                  clearable
                  bordered
                  fullWidth
                  color={errors?.subjectName ? "error" : "primary"}
                  size="lg"
                  placeholder="Title"
                  error={!!errors?.subjectName}
                  helperText={errors?.subjectName?.message}
                  helperColor="error"
                  {...register("subjectName")}
                />
              </Grid>
              <Grid xs={12}>
                <Textarea
                  clearable
                  bordered
                  fullWidth
                  color={errors?.subjectDesc ? "error" : "primary"}
                  size="lg"
                  placeholder="Description"
                  error={!!errors?.subjectDesc}
                  helperText={errors?.subjectDesc?.message}
                  helperColor="error"
                  {...register("subjectDesc")}
                />
              </Grid>

              <Grid xs={6}>
                <Input
                  clearable
                  bordered
                  fullWidth
                  color={errors?.marks ? "error" : "primary"}
                  size="lg"
                  placeholder="Marks"
                  error={!!errors?.marks}
                  helperText={errors?.marks?.message}
                  helperColor="error"
                  {...register("marks")}
                />
              </Grid>
              <Grid xs={6}>
                <Input
                  clearable
                  bordered
                  fullWidth
                  color={errors?.timeLimit ? "error" : "primary"}
                  size="lg"
                  placeholder="Time Limit"
                  error={!!errors?.timeLimit}
                  helperText={errors?.timeLimit?.message}
                  helperColor="error"
                  {...register("timeLimit")}
                />
              </Grid>
              <Grid xs={12}>
                {/* <Dropdown>
                  <Dropdown.Button
                    className="w-100 item-start"
                    bordered
                    color="primary"
                    css={{ tt: "capitalize" }}
                  >
                    {selectedCatg
                      ? catg_list[selectedCatg.currentKey].examName
                      : "Select"}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Single selection actions"
                    color="secondary"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedCatg}
                    onSelectionChange={setSelectedCatg}
                  >
                    {catg_list.map((catg, index) => {
                      return (
                        <Dropdown.Item key={index}>
                          {catg.examName}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown> */}
                <div className="w-100">
                  <select
                    {...register("categoryId")}
                    className="form-control rounded  w-100 p-1"
                  >
                    {catg_list.map((catg, index) => {
                      return (
                        <option key={index} value={catg._id}>
                          {catg.examName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </Grid>
              <Grid xs={12}>
                <input
                  className="border  border-3 rounded border-primary w-100 p-1"
                  required
                  fullWidth
                  name="file"
                  type="file"
                  // inputProps={{
                  //   multiple: true,
                  // }}
                  {...register("image")}
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
                setSubjectId(null);
              }}
            >
              Close
            </Button>
            <Button type="submit" color="success">
              {subjectId ? "Update" : "Add"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
