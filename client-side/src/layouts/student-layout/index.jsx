import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentSideBar from "../../components/structure/student-struct/sidenav";

export default function StudentLayout({ children }) {
  const token = localStorage.getItem("token");
  const history = useNavigate();

  useEffect(() => {
    if (!token) {
      history("/logIn");
    }
  }, []);
  return (
    <>
      <StudentSideBar>{children}</StudentSideBar>
    </>
  );
}
