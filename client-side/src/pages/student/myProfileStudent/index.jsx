import { Input, Button, Text } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import StudentLayout from "../../../layouts/student-layout";
import { Typography } from "antd";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { getApiHandler, putApiHandler } from "../../../apiHandler";

export default function MyProfileStudent() {
  const { register, handleSubmit, watch, reset, setValue } = useForm();
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const history = useNavigate();

  const file = watch("file");

  const onSubmit = async (values) => {
    console.log("values=>", values);
    const { name, userName, email, password, role, status, phone } = values;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("userName", userName);

    formData.append("email", email);
    formData.append("password", password);

    formData.append("image", file[0]);
    formData.append("role", role);
    formData.append("status", status);
    formData.append("phone", phone);

    console.log("id==>", id);
    const res = await putApiHandler(`/put-users/${token}/${id}`, formData);

    console.log("RESSSSS=>", res.data);
    if (res.status === 200) {
      swal("updated  successfully!", "You clicked the button!", "success");
      history("/student");
    }
    // setId("");

    // reset();
  };

  const getDataById = async () => {
    const response = await getApiHandler(`/getByUserId/${token}/${id}`);
    console.log("RESS", response.data);
    const { name, userName, email, password, image, role, status, phone } =
      response.data;
    setValue("name", name);
    setValue("userName", userName);
    setValue("email", email);
    setValue("password", password);
    setValue("image", image);
    setValue("role", role);
    setValue("status", status);
    setValue("phone", phone);
  };

  useEffect(() => {
    if (data) {
      getDataById();
    }
  }, [data]);
  return (
    <StudentLayout>
      <Box
        style={{
          width: "50%",
          boxShadow: "4px 6px 34px -6px grey",
          padding: "4rem",
          margin: "3rem",
          marginLeft: "18rem",
        }}
      >
        <Typography
          style={{ fontSize: "23px", color: " grey", marginBottom: " 2rem" }}
        >
          Edit User
        </Typography>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography>Name</Typography>
          <Input
            clearable
            bordered
            fullWidth
            color="gradient"
            size="lg"
            placeholder="Name"
            {...register("name")}
          />
          <Typography>Username</Typography>

          <Input
            clearable
            bordered
            fullWidth
            color="gradient"
            size="lg"
            placeholder="Username"
            {...register("userName")}
          />
          <Typography>Email</Typography>

          <Input
            clearable
            bordered
            fullWidth
            color="gradient"
            size="lg"
            placeholder="Email"
            {...register("email")}
          />
          <Typography>File </Typography>

          <Input
            clearable
            bordered
            fullWidth
            color="gradient"
            size="lg"
            type="file"
            {...register("file")}
          />
          <Typography>Role</Typography>

          <Input
            clearable
            bordered
            fullWidth
            color="gradient"
            size="lg"
            placeholder="Role"
            {...register("role")}
          />
          <Typography>Status</Typography>

          <Input
            clearable
            bordered
            fullWidth
            color="gradient"
            size="lg"
            placeholder="Status"
            {...register("status")}
          />
          <Typography>Phone</Typography>

          <Input
            clearable
            bordered
            fullWidth
            color="gradient"
            size="lg"
            placeholder="Please Enter 10 Digit Mobile Number"
            {...register("phone")}
          />
          <Button type="submit" color="neutral">
            UPDATE
          </Button>
        </form>
      </Box>
    </StudentLayout>
  );
}
