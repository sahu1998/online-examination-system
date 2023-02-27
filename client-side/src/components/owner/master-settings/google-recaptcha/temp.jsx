import { Button, Divider, Grid, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system';
import React from 'react'
import { useForm } from 'react-hook-form';
const Recaptcha = () => {
    const { register, handleSubmit, setValue } = useForm();
    const onSubmit = (value) => {
        console.log("values", value);
    }
    const data = [{
        name: "Yes"
    },
    { name: "No" }]


    return (
        <Box className='box-shadow p-5' sx={{ left: "28%", marginRight: "-50%", transform: 'translate("-50%", "-50%")', width: "65%" }}  >

            {/* <h1 className='p-5 m-5'>  <Divider /></h1> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>

                    <Grid item xs={6}>
                        <h6> RECAPTCHA SETTINGS</h6>
                    </Grid>
                    <Grid item xs={6}>
                        <div className='d-flex gap-3'>
                            <div ><img src='http://onlineexamsoftware.digisamaritan.com/public/images/rechaptcha.png'
                                height={'25px'} /></div>
                            <div style={{ backgroundColor: "#438afe" }} className='px-3 py-2'>
                                <a> MANAGE YOUR RECAPTCHA API KEYS</a></div>
                        </div>
                    </Grid>

                    <Grid item xs={6}>


                        <h6>Enable Recaptcha</h6>
                        <div className="w-100">
                            <select
                                {...register("enable")}
                                className="form-control rounded  w-100 p-1"
                            >
                                {data.map((catg, index) => {
                                    return (
                                        <option key={index}>
                                            {catg.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <h6>Nocaptcha Secret</h6>
                        <TextField
                            name="secretkey"
                            required
                            fullWidth

                            type="text"
                            {...register("secretkey")}
                        />

                    </Grid>
                    <Grid item xs={6}>
                        <h6>Nocaptcha Site</h6>
                        <TextField
                            name="sitekey"
                            required
                            fullWidth

                            type="text"
                            {...register("sitekey")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" type='submit' style={{ left: "350px", width: "15%" }}>UPDATE</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}
export default Recaptcha;