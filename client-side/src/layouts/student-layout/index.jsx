import React from 'react';
import StudentSideBar from '../../components/structure/student-struct/sidenav';

export default function StudentLayout({children}) {
  return (
    <>
    <StudentSideBar>{children}</StudentSideBar>
    </>
  )
}