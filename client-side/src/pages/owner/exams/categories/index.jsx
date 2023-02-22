import {
  Modal,
  Input,
  Table,
  Button,
  Text,
  Dropdown,
  Textarea,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  deleteApiHandler,
  getApiHandler,
  postApiHandler,
} from "../../../../apiHandler";

import "./category.m.css";

export default function CategoryTable() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  const onSubmit = async (values) => {
    console.log("values=>", values);
    const data = await postApiHandler("/post-exam-catg", values);
    console.log("data=>", data.data);
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

  const updateData = async (value) => {
    console.log(value);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="my-5">
      {/* <Button color="neutral" auto onPress={handler}>
        CREATE
      </Button> */}
      <Button
        onPress={handler}
        auto
        as="a"
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
                        onClick={() => {
                          updateData(a);
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
        closeButton
        blur
        open={visible}
        onClose={closeHandler}
        width={500}
        height={500}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            <Text b size={18}>
              Add Category
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              clearable
              bordered
              fullWidth
              color="gradient"
              size="lg"
              placeholder="Title"
              {...register("examName")}
            />
            <Textarea
              clearable
              bordered
              fullWidth
              color="gradient"
              size="lg"
              placeholder="Description"
              {...register("examDesc")}
            />
            {/* <Input
              clearable
              bordered
              fullWidth
              color="gradient"
              size="lg"
              placeholder="Description"
              {...register("examDesc")}
            /> */}
            <Button type="submit" color="neutral" onPress={closeHandler}>
              Add
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
