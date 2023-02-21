import React from "react";
import AdminLayout from "../../../layouts/admin-layout";
import HomeIcon from '@mui/icons-material/Home';
import { Typography } from '@mui/material'

export default function AdminDashboard() {
  return (
    <>
      <AdminLayout> 
        <div  style={{display:"flex"}}><HomeIcon sx={{height:"30px",width:"30px"}}/>
      <Typography variant='h6'>Dashboard</Typography></div>
      </AdminLayout>
    </>
  );
}
