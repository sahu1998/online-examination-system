import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { deleteApiHandler, getApiHandler, postApiHandler, putApiHandler, serverURL } from "../../../../apiHandler";
import { Modal, Input, Table, Button, Text, Dropdown } from "@nextui-org/react";
import { useForm } from "react-hook-form";

const LmsCategory = () => {
    const { register, handleSubmit, reset, setValue, watch } = useForm();
    const [visible, setVisible] = useState(false);
    const [category, setCategory] = useState([]);
    const [updateId, SetUpdateId] = useState();
    const file = watch("image")
    const getData = async () => {
        const temp = await getApiHandler("/getLmsCat");
        // console.log("categorydata", temp.data)
        setCategory(temp.data);

    }
    const getDataById = async () => {
        if (updateId) {
            const data = await getApiHandler(`/getLmsCat/${updateId}`)
            const { data: { description,
                examName, image } } = data
            setValue("description", description)
            setValue("examName", examName)
            setValue("image", image)

            console.log(data);
        }
    }
    useEffect(() => { getDataById() }, [updateId])

    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
    };

    const onSubmit = async (values) => {
        // console.log("values=>", file[0]);
        const { examName, description } = values
        const formData = new FormData();
        formData.append("examName", examName)
        formData.append("description", description)
        formData.append("image", file[0])
        const result = updateId
            ? await putApiHandler(`/updateLmsCat/${updateId}`, formData)
            : await postApiHandler("/postLmsCat", formData);

        // console.log("result=>", result);
        reset();
    };

    const deleteContact = async (id) => {
        const result = await deleteApiHandler(`/deleteLmsCat/${id}`)
        // getContact();
        // console.log("result", result);

    }


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
                    {category.map((row) => (
                        <Table.Row>
                            <Table.Cell>{row.examName}</Table.Cell>
                            <Table.Cell>{row.image ? <img
                                src={`${serverURL}/lms-cat/${row.image?.split("\\")[2]}`}
                                width={"25%"}

                                className="p-2"
                                style={{ height: "100px", objectFit: "fill" }}
                            /> : <img
                                src={`https://cache.careers360.mobi/media/presets/900X600/article_images/2021/5/21/shutterstock_1664708983.jpg`}
                                width={"25%"}

                                className="p-2"
                                style={{ height: "100px", objectFit: "fill" }}
                            />}</Table.Cell>
                            <Table.Cell>
                                <Dropdown>
                                    <Dropdown.Button flat css={{ background: "$gray400", color: "$gray800" }}>Action</Dropdown.Button>
                                    <Dropdown.Menu aria-label="Static Actions">
                                        <Dropdown.Item key="new">New file</Dropdown.Item>
                                        <Dropdown.Item key="copy">Copy link</Dropdown.Item>
                                        <Dropdown.Item key="edit"><button onClick={() => {
                                            SetUpdateId(row._id)
                                            handler()
                                        }}
                                        >Edit file</button></Dropdown.Item>
                                        <Dropdown.Item key="delete" withDivider color="error"
                                        >
                                            <button onClick={() => {
                                                deleteContact(row._id)
                                            }}>delete file</button>
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