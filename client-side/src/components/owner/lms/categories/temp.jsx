import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getApiHandler } from "../../../../apiHandler";
const Category = () => {
    const [category, setCategory] = useState();
    const getData = async () => {
        const temp = await getApiHandler("/getLmsCat");
        console.log("categorydata", temp.data)
        setCategory(temp.data);

    }
    useEffect(() => {
        getData()
    }, [])


    return (
        <Container>

            hello
        </Container>
    )
}
export default Category;