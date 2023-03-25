import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import "./Layout.css";
export default function Layout() {
  return (
    <div className="layout-div">
      <NavBar />
      <Outlet />
    </div>
  );
}
