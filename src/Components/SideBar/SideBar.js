import React, { useState } from "react";
import "./SideBar.css";
import logo from "../../assets/logo-img.png";
import useFetch from "../../CustomHooks/useFetch";
import { MdCategory } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { Button } from "antd";
import { Input } from "antd";

export default function SideBar() {
  const { data, isPending, Error } = useFetch("http://localhost:8002/buckets");
  const [show, setShow] = useState(false);
  const [bucketName, setBucketName] = useState();
  console.log("data=>", data);

  const params = useParams();
  const name = params.name;

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { name: bucketName };
    fetch("http://localhost:8002/buckets", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    }).then(() => {
      alert("Bucket Added");
      setShow(false);
      window.location.reload();
    });
  };

  return (
    <div className="sidebar-main">
      <div style={{ position: "sticky", top: "0", background: "#5969C3" }}>
        <Link to="/">
          <img className="logoImg" src={logo} alt="" />
        </Link>
        <Button
          onClick={() => setShow(!show)}
          type="dashed"
          style={{
            marginRight: "22px",
            marginTop: "28px",
            marginBottom: "20px",
          }}
          ghost
        >
          Add Bucket +
        </Button>
      </div>

      <div
        style={{
          display: show ? "block" : "none",
          position: "sticky",
          top: "0",
          background: "#5969C3",
        }}
      >
        <Input
          value={bucketName}
          onChange={(e) => setBucketName(e.target.value)}
          style={{ background: "none", width: "200px", color: "white" }}
          placeholder="BUCKET NAME"
        />{" "}
        <br />
        <Button
          onClick={(e) => handleSubmit(e)}
          style={{ marginTop: "10px" }}
          type="primary"
        >
          ADD
        </Button>
      </div>

      {data &&
        data.map((d) => (
          <Link
            to={"/" + d.id + "/" + d.name}
            style={{ textDecoration: "none" }}
          >
            {/* {console.log("id=>", d.id)} */}
            <div
              className="bucket-card"
              style={{ background: name === d.name ? "#4242428a" : "" }}
            >
              <MdCategory
                size={25}
                style={{ marginTop: "15px", marginLeft: "10px" }}
              />
              <p className="b-card-text">{d.name}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
