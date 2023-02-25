import { Button, Divider, Grid, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system';
import React from 'react'
import { useForm } from 'react-hook-form';
const Recaptcha = () => {
    const { register, handleSubmit, setValue } = useForm();
    const onSubmit = (value) => {
        console.log("values", value);

    }
    return (
        <Box className='box-shadow p-5' sx={{ left: "28%", marginRight: "-50%", transform: 'translate("-50%", "-50%")' }}  >

            {/* <h1 className='p-5 m-5'>  <Divider /></h1> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>

                    <Grid item xs={6}>
                        <h6> RECAPTCHA SETTINGS</h6>
                    </Grid>
                    <Grid item xs={6}>
                        <h6> MANAGE YOUR RECAPTCHA API KEYS</h6>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            name="enable"
                            required
                            fullWidth
                            label='Enable Rechaptcha'
                            type="text"
                            {...register("enable")}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            name="secretkey"
                            required
                            fullWidth
                            label="Nocaptcha Secret"
                            type="text"
                            {...register("secretkey")}
                        />

                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="sitekey"
                            required
                            fullWidth
                            label="Nocaptcha Sitekey"
                            type="text"
                            {...register("sitekey")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" type='submit'>UPDATE</Button>
                    </Grid>



                </Grid>
            </form>
        </Box>
    )
}
export default Recaptcha;