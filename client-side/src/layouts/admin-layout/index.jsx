import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "../../components/structure/admin-struct/sidenav";

export default function AdminLayout({ children }) {
  const token = localStorage.getItem("token");
  const history = useNavigate();

  useEffect(() => {
    if (!token) {
      history("/logIn");
    }
  }, []);
  return (
    <>
      <AdminSideBar>{children}</AdminSideBar>
    </>
  );
}
