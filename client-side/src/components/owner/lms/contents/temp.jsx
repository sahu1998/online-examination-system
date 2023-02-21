import { Modal, Input, Table, Button, Text, Dropdown } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  deleteApiHandler,
  getApiHandler,
  postApiHandler,
  putApiHandler,
  serverURL,
} from "../../../../apiHandler";
import { Divider } from "@mui/material";

export default function LmsContent() {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [selected, setSelected] = useState();
  const [content, setContent] = useState([]);
  const [category, setCategory] = useState([]);
  const [did, setDid] = useState();
  const [id, setId] = useState();
  console.log("id--0000",id);
  const file = watch("image");
  const getData = async () => {
    const temp = await getApiHandler("/getLmsSub");
    const temp1 = await getApiHandler("/getLmsCat");

    console.log("contentdata", temp.data);
    console.log("categorydata", temp1.data);

    setContent(temp.data);
    setCategory(temp1.data);
  };
  useEffect(() => {
    getData();
  }, []);
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  const onSubmit = async (values) => {
    console.log("values=>", file[0]);
    const { title, subjectName, type, categoryId } = values;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file[0]);
    formData.append("subjectName", subjectName);
    formData.append("type", type);
    formData.append("categoryId", id);
console.log(" post id==",id);
    const data1 = did
      ? await putApiHandler(`/putLmsSub/${did}`, formData)
      : await postApiHandler("/postLmsSub", formData)

    console.log("data1=>", data1);
    reset();
  };

  const deleteData = async (delete1) => {
    console.log("did====", Divider);
    const deleteId = await deleteApiHandler(`/deleteLmsSub/${delete1}`);
    console.log("deleteId=====================", deleteId);
  };
  // const selectedValue = React.useMemo(
  //   () => Array.from(selected).join(", ").replaceAll("_", " "),
  //   [selected]
  // );

  const getById = async () => {
    const idData = await getApiHandler(`/getLmsSub/${did}`);
    console.log("idData====================", idData.data);

    const { subjectName, title, type } = idData.data;
    setValue("subjectName", subjectName);
    console.log("subjectName=========", subjectName);
    setValue("title", title);
    console.log("title===============", title);
    setValue("type ", type);
    console.log("type ===============", type);
  };
  useEffect(() => {
    if (did) {
     
      getById(did);
    }
  }, [did]);
  useEffect(() => {
    if (selected) {
      console.log("selected.currentKey",selected.currentKey);
      setId(category[selected.currentKey]?._id);
    }
    // category
  }, [selected]);
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
          <Table.Column>S.no</Table.Column>
          <Table.Column>Title</Table.Column>
          <Table.Column>image</Table.Column>
          <Table.Column>Name</Table.Column>
          <Table.Column>Type</Table.Column>
          {/* <Table.Column>description</Table.Column> */}
          <Table.Column>Action</Table.Column>
        </Table.Header>

        <Table.Body>
          {content.map((a, index) => (
            <Table.Row>
              <Table.Cell key={index}>{index + 1}</Table.Cell>
              <Table.Cell>{a.title}</Table.Cell>
              <Table.Cell>
                {" "}
                <img
                  src={`${serverURL}/lms-sub/${a.image?.split("\\")[2]}`}
                  width={"95%"}
                  className="p-2"
                  style={{ height: "100px", objectFit: "fill", width: "100px" }}
                />
              </Table.Cell>
              <Table.Cell>{a.subjectName}</Table.Cell>

              <Table.Cell>{a.type}</Table.Cell>

              {/* <Table.Cell>{a.description}</Table.Cell> */}

              <Table.Cell>
                <Dropdown>
                  <Dropdown.Button
                    flat
                    css={{ background: "$gray400", color: "$gray800" }}
                  >
                    Action
                  </Dropdown.Button>
                  <Dropdown.Menu aria-label="Static Actions">
                    <Dropdown.Item key="new">
                      <button
                        onClick={async() => {
                          deleteData(a._id);
                           await getApiHandler("/getLmsSub");

                        }}
                      >
                        delete
                      </button>
                    </Dropdown.Item>
                    <Dropdown.Item key="new">
                      <button
                        onClick={ async() => {
                          setDid(a._id);
                          handler()
                           

                        }}
                      >
                        {" "}
                        update
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
          onPageChange={() => console.log({})}
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
              Add Content
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
              placeholder="Language"
              {...register("title")}
            />
            <Input
              clearable
              bordered
              fullWidth
              color="gradient"
              size="lg"
              type={"file"}
              placeholder="file"
              {...register("image")}
            />
            <Input
              clearable
              bordered
              fullWidth
              color="gradient"
              size="lg"
              placeholder="Name"
              {...register("subjectName")}
            />
            <Input
              clearable
              bordered
              fullWidth
              color="gradient"
              size="lg"
              placeholder="type"
              {...register("type")}
            />
            <Dropdown>
              <Dropdown.Button
                flat
                color="secondary"
                css={{ tt: "capitalize" }}
              >
               category {selected}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Single selection actions"
                color="secondary"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={setSelected}
              >
                {category.map((row, index) => {
                  return (
                    <Dropdown.Item key={index}>{row.examName}</Dropdown.Item>
                  );
                })}
                {/* <Dropdown.Item key="text">Text</Dropdown.Item>
        <Dropdown.Item key="number">Number</Dropdown.Item>
        <Dropdown.Item key="date">Date</Dropdown.Item>
        <Dropdown.Item key="single_date">Single Date</Dropdown.Item>
        <Dropdown.Item key="iteration">Iteration</Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
            <Button type="submit" color="neutral" onPress={closeHandler}>
              CREATE
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
