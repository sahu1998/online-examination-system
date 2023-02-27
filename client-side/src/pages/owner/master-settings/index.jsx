import { Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MasterSettings() {
    const array =[
        {name:"vikas",path:"/vikas"},
        {name:"rajni",path:"/rajni"},

    ]
  return (
    <div>{array.map((text)=>{
        return(
            <NavLink to={text.path}>
                <Typography>{text.name}</Typography>
            </NavLink>
        )
    })}</div>
  )
}
