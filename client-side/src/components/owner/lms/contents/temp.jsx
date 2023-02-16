import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getApiHandler } from "../../../../apiHandler";
const Content = () => {
    const [content, setContent] = useState();
    const getData = async () => {
        const temp = await getApiHandler("/getLmsSub")
        console.log("contentdata", temp.data)
        setContent(temp.data)

    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <Container>
            Content
        </Container>

    )
}
export default Content;