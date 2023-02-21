import React from 'react';
import AdminSideBar from '../../components/structure/admin-struct/sidenav';

export default function AdminLayout({children}) {
  return (
    <>
    <AdminSideBar>{children}</AdminSideBar>
    </>
  )
}