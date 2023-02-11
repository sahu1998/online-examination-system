import React from "react";
import SideNav from "../../components/structure/admin-struct/sidenav";

function MainLayout({ children }) {
  return <SideNav>{children}</SideNav>;
}

export default MainLayout;
