import { Modal, Input, Table, Button, Text, Dropdown } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  getApiHandler,
  postApiHandler,
  serverURL,
} from "../../../../apiHandler";

export default function LmsContent() {
  const { register, handleSubmit, reset, setValue,watch } = useForm();
  const [selected, setSelected] = useState();
  const [content, setContent] = useState([]);
  const [category,setCategory]=useState([]);
  const [id,setId]=useState();
  const file = watch("image");
  const getData = async () => {
    const temp = await getApiHandler("/getLmsSub");
    const temp1 = await getApiHandler("/getLmsCat");

    console.log("contentdata", temp.data);
    console.log("categorydata", temp1.data);

    setContent(temp.data);
    setCategory(temp1.data)
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
    const {title,subjectName,type,categoryId}=values;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file[0]);
    formData.append("subjectName", subjectName);
    formData.append("type",type);
    formData.append("categoryId",id);


    const data1 = await postApiHandler("/postLmsSub", formData);
    console.log("data=>", data1);
    reset();
  };
  const data = [
    { key: "new", name: "New File" },
    { key: "copy", name: "Copy Link" },
    { key: "edit", name: "Edit File" },
    { key: "delete", name: "Delete File" },
  ];
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
                    <Dropdown.Item key="new">New file</Dropdown.Item>
                  
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
          onPageChange={() => console.log({ })}
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
      <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
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
        {category.map((row,index)=>{
          return  <Dropdown.Item key={index} onClick={()=>setId(row._id)}> {row.examName}
          
          </Dropdown.Item>
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
