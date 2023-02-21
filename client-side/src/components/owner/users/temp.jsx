import { Modal, Input, Table, Button, Text, Dropdown } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import "./index.css";
import {
  deleteApiHandler,
  getApiHandler,
  postApiHandler,
  putApiHandler,
  serverURL,
} from "../../../apiHandler";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

export default function UsersTable() {
  const { register, handleSubmit, watch, reset, setValue } = useForm();
  const [data, setData] = useState([]);
  const [id, setId] = useState();

  // console.log("dataviikas=>", data);
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

  const file = watch("file");

  const onSubmit = async (values) => {
    console.log("values=>", values);
    const { name, userName, email, password, role, status } = values;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("userName", userName);

    formData.append("email", email);
    formData.append("password", password);

    formData.append("image", file[0]);
    formData.append("role", role);
    formData.append("status", status);
    console.log("id==>", id);
    const data = id
      ? await putApiHandler(`/put-users/${id}`, formData)
      : await postApiHandler("/post-users", formData);

    console.log("data=>", data.data);
    getData();
    setId("");

    reset();
  };
  const getData = async () => {
    const res = await getApiHandler("/get-users");
    console.log("aaaaaaaaa=?", res);
    setData(res.data);
  };
  useEffect(() => {
    if (id) {
      getDataById();
    }
    getData();
  }, [id]);

  const deleteData = async (id) => {
    const response = await deleteApiHandler(`/delete-users/${id}`);
    console.log("DELETE", response);

    getData();
  };

  const getDataById = async () => {
    const response = await getApiHandler(`/getByUserId/${id}`);
    console.log("RESS", response.data);
    const { name, userName, email, password, image, role, status } =
      response.data;
    setValue("name", name);
    setValue("userName", userName);
    setValue("email", email);
    setValue("password", password);
    setValue("image", image);
    setValue("role", role);
    setValue("status", status);

    setValue("password", password);
  };

  return (
    <>
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
          <Table.Column>Name</Table.Column>

          <Table.Column>Email</Table.Column>

          <Table.Column>Image</Table.Column>
          <Table.Column>Role</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column></Table.Column>
        </Table.Header>

        <Table.Body>
          {data.map((row) => (
            <Table.Row>
              <Table.Cell>{row.name}</Table.Cell>

              <Table.Cell>{row.email}</Table.Cell>

              <Table.Cell>
                {row.image ? (
                  <img
                    src={`${serverURL}/${row.image}`}
                    width="80"
                    height="80"
                  />
                ) : (
                  <img
                    src={`https://www.theschoolrun.com/sites/theschoolrun.com/files/article_images/child_taking_exam_0.jpg`}
                    width="80"
                    height="80"
                  />
                )}
              </Table.Cell>
              <Table.Cell>{row.role}</Table.Cell>
              <Table.Cell>
                {row.status ? (
                  <CheckIcon style={{ background: "darkgray" }} />
                ) : (
                  <ClearIcon style={{ background: "darkgray" }} />
                )}
              </Table.Cell>

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
                        onPress={handler}
                        onClick={() => {
                          setId(row._id);
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
              Add Language
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
              placeholder="Name"
              {...register("name")}
            />

            <Input
              clearable
              bordered
              fullWidth
              color="gradient"
              size="lg"
              placeholder="Username"
              {...register("userName")}
            />
            <Input
              clearable
              bordered
              fullWidth
              color="gradient"
              size="lg"
              placeholder="Email"
              {...register("email")}
            />
            <Input
              clearable
              bordered
              fullWidth
              color="gradient"
              size="lg"
              placeholder="Password"
              {...register("password")}
            />
            <Input
              clearable
              bordered
              fullWidth
              color="gradient"
              size="lg"
              type="file"
              {...register("file")}
            />
            <Input
              clearable
              bordered
              fullWidth
              color="gradient"
              size="lg"
              placeholder="Role"
              {...register("role")}
            />
            <Input
              clearable
              bordered
              fullWidth
              color="gradient"
              size="lg"
              placeholder="Status"
              {...register("status")}
            />
            <Button type="submit" color="neutral" onPress={closeHandler}>
              CREATE
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
