import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Divider, TextareaAutosize, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { getApiHandler, postApiHandler, putApiHandler } from "../../../../apiHandler";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function SiteSetting() {
  const { register, handleSubmit, reset, setValue,watch } = useForm();
  const [update,setUpdate]=React.useState();
  const file=watch('siteLogo')
  const onSubmit = async(value) => {
    console.log("value", value);
    console.log("file====",file[0]);
    const {
      siteTitle,
      siteState,
      siteZipcode,
      fbLogin,
      siteAddress,
      siteLogo,
      siteCity,
      siteContry,
      sitePhone,
      currencyCode,
      twitterLogin,
      enableOtpLogin,
      validityType,
      contryCode
    } = value;
    const formData=new FormData();
    formData.append("siteTitle",siteTitle)
    formData.append("siteState",siteState)
    formData.append("siteZipcode",siteZipcode)
    formData.append("fbLogin",fbLogin)
    formData.append("siteAddress",siteAddress)
    formData.append("siteLogo",file[0])    
    formData.append("siteCity",siteCity)
    formData.append("siteContry",siteContry)
    formData.append("sitePhone",sitePhone)
    formData.append("currencyCode",currencyCode)
    formData.append("twitterLogin",twitterLogin)
    formData.append("enableOtpLogin",enableOtpLogin)
    formData.append("validityType",validityType)
    formData.append("contryCode",contryCode)
   const data= await putApiHandler(`/put-site-setting/${update}`, formData)
  // const data1=await postApiHandler("/site-setting", formData);
  // console.log("data1====>",data1);

    console.log("data==",data);

  };
  const getByData=async()=>{
        const getData = await getApiHandler("/get-Site-setting");
console.log("getByData==67778777776===",getData.data[0]._id);
setUpdate(getData.data[0]._id);
     }
   
  
  React.useEffect(()=>{
    getByData();
  },[])
  return (
    <Box sx={{ flexGrow: 1 }} className="m-5 p-5">
      <p className="m-2 p-3">SITE SETTINGS</p>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} className="pt-4">
          <Grid item xs={6}>
            <TextField label="Site Title" {...register("siteTitle")} />
          </Grid>

          <Grid item xs={6}>
            <TextField label="Site State" {...register("siteState")} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Site ZipCode" {...register("siteZipcode")} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="facebook Login" {...register("fbLogin")} />
          </Grid>
          <Grid item xs={6}>
            {/* <TextField type={"text"} label="Site Address"/>  */}
            <textarea placeholder="Address" {...register("siteAddress")} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type={"file"}
              label="Site Logo"
              {...register("siteLogo")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Site City" {...register("siteCity")} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="text"
              label="Site Contry"
              {...register("siteContry")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type={"text"}
              label="Site Phone"
              {...register("sitePhone")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Currency Code" {...register("currencyCode")} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="twitter Login" {...register("twitterLogin")} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="validity Type" {...register("validityType")} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="enable Otp Login"
              {...register("enableOtpLogin")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Contry Code" {...register("contryCode")} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit">Update</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
