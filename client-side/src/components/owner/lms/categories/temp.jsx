import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getApiHandler, postApiHandler, serverURL } from "../../../../apiHandler";
import { Modal, Input, Table, Button, Text, Dropdown } from "@nextui-org/react";
import { useForm } from "react-hook-form";

const LmsCategory = () => {
    const { register, handleSubmit, reset, setValue, watch } = useForm();
    const [visible, setVisible] = useState(false);
    const [category, setCategory] = useState([]);
    const file = watch("image")
    const getData = async () => {
        const temp = await getApiHandler("/getLmsCat");
        console.log("categorydata", temp.data)
        setCategory(temp.data);

    }

    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
    };

    const onSubmit = async (values) => {
        console.log("values=>", file[0]);
        const { examName, description } = values
        const formData = new FormData();
        formData.append("examName", examName)
        formData.append("description", description)
        formData.append("image", file[0])
        const data = await postApiHandler("/postLmsCat", formData);
        console.log("data=>", data.data);
        reset();
    };

    useEffect(() => {
        getData()
    }, [])
    return (
        <>

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
                    <Table.Column>Category</Table.Column>
                    <Table.Column>Image</Table.Column>
                    <Table.Column>Action</Table.Column>
                </Table.Header>

                <Table.Body>
                    {category.map((a) => (
                        <Table.Row>
                            <Table.Cell>{a.examName}</Table.Cell>
                            <Table.Cell><img
                                src={`${serverURL}/lms-cat/${a.image?.split("\\")[2]}`}
                                width={"25%"}

                                className="p-2"
                                style={{ height: "100px", objectFit: "fill" }}
                            /></Table.Cell>
                            <Table.Cell>
                                <Dropdown>
                                    <Dropdown.Button flat css={{ background: "$gray400", color: "$gray800" }}>Action</Dropdown.Button>
                                    <Dropdown.Menu aria-label="Static Actions">
                                        <Dropdown.Item key="new">New file</Dropdown.Item>
                                        <Dropdown.Item key="copy">Copy link</Dropdown.Item>
                                        <Dropdown.Item key="edit">Edit file</Dropdown.Item>
                                        <Dropdown.Item key="delete" withDivider color="error">
                                            Delete file
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
                    onPageChange={() => console.log({ page })}
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
                            placeholder="CategoryName"
                            {...register("examName")}
                        />
                        <Input
                            clearable
                            bordered
                            fullWidth
                            color="gradient"
                            size="lg"

                            placeholder="Description"
                            {...register("description")}
                        />
                        <Input
                            clearable
                            bordered
                            fullWidth
                            color="gradient"
                            size="lg"
                            type="file"
                            placeholder="choose file"
                            {...register("image")}
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
export default LmsCategory;