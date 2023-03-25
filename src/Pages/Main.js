import React from "react";
import SideBar from "../Components/SideBar/SideBar";
import Layout from "./Layout";
import "./Main.css";
export default function Main() {
  return (
    <div className="main-div">
      <SideBar />
      <Layout />
    </div>
  );
}
