import { Typography } from '@mui/material'
import React from 'react'
import OwnerLayout from '../../../layouts/owner-layout'
import HomeIcon from '@mui/icons-material/Home';


export default function OwnerDasboad() {
  return (
    <OwnerLayout>
      <div  style={{display:"flex"}}><HomeIcon sx={{height:"30px",width:"30px"}}/>
      <Typography variant='h6'>Dashboard</Typography></div>
    </OwnerLayout>
  )
}
