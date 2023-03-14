import { Container } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import OwnerSideBar from "../../components/structure/owner-struct/sidenav";

export default function OwnerLayout({ children }) {
  const token = localStorage.getItem("token");
  const history = useNavigate();

  useEffect(() => {
    if (!token) {
      history("/logIn");
    }
  }, []);
  return (
    <Container maxWidth="xl">
      <OwnerSideBar>{children}</OwnerSideBar>
    </Container>
  );
}
