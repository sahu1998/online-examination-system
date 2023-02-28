import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OwnerSideBar from "../../components/structure/owner-struct/sidenav";

export default function OwnerLayout({ children }) {
  const history = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      history("/logIn");
    }
  }, []);
  return (
    <Container maxWidth="xl">
      <OwnerSideBar>{children}</OwnerSideBar>
    </Container>
  );
}
