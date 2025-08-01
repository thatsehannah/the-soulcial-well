"use client";

import React from "react";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

//don't want to convert the root layout to a client component (for static metadata), so this component is so i can use the "usePathname" hook to conditionally render the navbar
const NavbarWrapper = () => {
  const pathname = usePathname();
  const hideNavbarPaths = ["/"];

  if (hideNavbarPaths.includes(pathname)) return null;

  return <Navbar />;
};

export default NavbarWrapper;
