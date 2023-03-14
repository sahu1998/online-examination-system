import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Divider, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  getApiHandler,
  postApiHandler,
  putApiHandler,
} from "../../../../apiHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Select } from "antd";
import { SelectField } from "@chakra-ui/react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const schema = yup
  .object()
  .shape({
    siteTitle: yup
      .string()
      .required()
      .matches(/^[a-z]/),
    siteState: yup
      .string()
      .required()
      .matches(/^[aA-zZ\s]+$/),
    siteZipcode: yup
      .string()
      .required()
      .matches(/^[0-9a-zA-Z]*[0-9][0-9a-zA-Z]*$/),
    fbLogin: yup
      .string()
      .required()
      .matches(/^[a-z]/),
    siteAddress: yup
      .string()
      .required('required is address'),
     

    siteCity: yup
      .string()
      .required()
      .matches(/^[aA-zZ\s]+$/),
    siteContry: yup
      .string()
      .required()
      .matches(/^[a-z]/),
    sitePhone: yup
      .string()
      .required()
      .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
    currencyCode: yup
      .string()
      .required()
      .matches(/^[0-9]/),
    twitterLogin: yup
      .string()
      .required()
      .matches(/^[a-z]/),
    // enableOtpLogin: yup.string().required(),
    // validityType: yup.string().required(),
    contryCode: yup
      .string()
      .required()
       .matches(/^[0-9]/),
  })
  

export default function SiteSetting() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm(
    {
    resolver: yupResolver(schema),
    default: {
      siteTitle: "",
      siteState: "",
      siteZipcode: "",
      fbLogin: "",
      siteAddress: "",
      siteLogo: "",
      siteCity: "",
      siteContry: "",
      sitePhone: "",
      currencyCode: "",
      twitterLogin: "",
      
      contryCode: "",
    },
  }
  );
  // { resolver: yupResolver(schema) }
  const [update, setUpdate] = React.useState();
  const file = watch("siteLogo");
  const onSubmit = async (value) => {
    console.log("value======", value);
    console.log("file====", file[0]);
    const {
      siteTitle,
      siteState,
      siteZipcode,
      fbLogin,
      siteAddress,
     
      siteCity,
      siteContry,
      sitePhone,
      currencyCode,
      twitterLogin,
     
      contryCode,
    } = value;
    const formData = new FormData();
    formData.append("siteTitle", siteTitle);
    formData.append("siteState", siteState);
    formData.append("siteZipcode", siteZipcode);
    formData.append("fbLogin", fbLogin);
    formData.append("siteAddress", siteAddress);
    formData.append("siteLogo", file[0]);
    formData.append("siteCity", siteCity);
    formData.append("siteContry", siteContry);
    formData.append("sitePhone", sitePhone);
    formData.append("currencyCode", currencyCode);
    formData.append("twitterLogin", twitterLogin);
   
    formData.append("contryCode", contryCode);
     const data = await putApiHandler(`/put-site-setting/${update}`, formData);
    // const data1 = await postApiHandler("/site-setting", formData);
    // console.log("data1====>", data1);

      console.log("data==", data);
  };
  const getByData = async () => {
    const getData = await getApiHandler("/get-Site-setting");
    console.log("getByData==67778777776===", getData.data[0]._id);
    setUpdate(getData.data[0]._id);
  };

   React.useEffect(() => {
   getByData();
   }, []);
  return (
    <Box
      sx={{ flexGrow: 1 }}
      className="m-5 p-5 shadow p-3 mb-5 bg-white rounded w-95 justify-content-center"
    >
      <p className="m-2 p-3">SITE SETTINGS</p>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} className="pt-4 ">
          <Grid item xs={6} className="my-3">
            <Typography>Site Title</Typography>
            <input
              className="form-control rounded w-75 h-75 p-1"
              {...register("siteTitle")}
              error={!!errors?.siteTitle}
              helperText={errors?.siteTitle?.message}
            />
          </Grid>

          <Grid item xs={6} className="my-3">
          <Typography>Site State</Typography>

            <input
              className="form-control rounded w-75 h-75 p-1"
             
              {...register("siteState")}
              error={!!errors?.siteState}
              helperText={errors?.siteState?.message}
            />
          </Grid>
          <Grid item xs={6}  className="my-3">
          <Typography>Site ZipCode</Typography>

            <input
              className="form-control rounded w-75 h-75 p-1"
              
              {...register("siteZipcode")}
              error={!!errors?.siteZipcode}
              helperText={errors?.siteZipcode?.message}
            />
          </Grid>
          <Grid item xs={6}  className="my-3">
            <Typography>FaceBook LogIn</Typography>
            <input
              className="form-control rounded w-75 h-75 p-1"
              {...register("fbLogin")}
              error={!!errors?.fbLogin}
              helperText={errors?.fbLogin?.message}
            />
          </Grid>
         
          <Grid item xs={6}  className="my-3">
          <Typography>Site City</Typography>

            <input
              className="form-control rounded w-75 h-75 p-1"
              
              {...register("siteCity")}
              error={!!errors?.siteCity}
              helperText={errors?.siteCity?.message}
            />
          </Grid>
          <Grid item xs={6}  className="my-3">
          <Typography>Site Contry</Typography>

            <input
              className="form-control rounded w-75 h-75 p-1"
              type="text"
        
              {...register("siteContry")}
              error={!!errors?.siteContry}
              helperText={errors?.siteContry?.message}
            />
          </Grid>
          <Grid item xs={6}  className="my-3">
          <Typography>Site Phone</Typography>

            <input
              className="form-control rounded w-75 h-75 p-1"
              type={"text"}
            
              {...register("sitePhone")}
              error={!!errors?.sitePhone}
              helperText={errors?.sitePhone?.message}
            />
          </Grid>
          <Grid item xs={6}  className="my-3">
          <Typography>Site contryCode</Typography>

            <input
              className="form-control rounded w-75 h-75 p-1"
              
              {...register("currencyCode")}
              error={!!errors?.currencyCode}
              helperText={errors?.currencyCode?.message}
            />
          </Grid>
          <Grid item xs={6}  className="my-3">
          <Typography>Twitter LogIn</Typography>

            <input
              className="form-control rounded w-75 h-75 p-1"
            
              {...register("twitterLogin")}
              error={!!errors?.twitterLogin}
              helperText={errors?.twitterLogin?.message}
            />
          </Grid>
          
          <Grid item xs={6}  className="my-3">
          <Typography> contry Code</Typography>

            <input
              className="form-control rounded w-75 h-75 p-1"
            type={"number"}
              
              {...register("contryCode")}
              error={!!errors?.contryCode}
              helperText={errors?.contryCode?.message}
            />
          </Grid>
          <Grid item xs={6}  className="my-3">
          <Typography>Address</Typography>

            <textarea
              type={"textarea"}
              placeholder="Address"
              {...register("siteAddress")}
              error={!!errors?.siteAddress}
              helperText={errors?.siteAddress?.message}
            />
          </Grid>
          <Grid item xs={4}>
          <Typography>Site Logo</Typography>

            <input
              className="form-control rounded w-75 h-75 p-1"
              type={"file"}
              label="Site Logo"
              {...register("siteLogo")}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit">Update</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
