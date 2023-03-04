import { Container } from "@mui/material";

import OwnerSideBar from "../../components/structure/owner-struct/sidenav";

export default function OwnerLayout({ children }) {
  return (
    <Container maxWidth="xl">
      <OwnerSideBar>{children}</OwnerSideBar>
    </Container>
  );
}
