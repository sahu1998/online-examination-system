import React from 'react';
import OwnerSideBar from '../../components/structure/owner-struct/sidenav';

export default function OwnerLayout({children}) {
  return (
    <>
    <OwnerSideBar>{children}</OwnerSideBar>
    </>
  )
}