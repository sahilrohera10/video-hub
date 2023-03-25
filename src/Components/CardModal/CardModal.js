import React, { useState } from "react";
import "./Card.css";
import vdImg from "../../assets/vd-img.png";
import ReactPlayer from "react-player/youtube";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import BasicModal from "../Modals/EditModal";
import { MdDriveFileMove } from "react-icons/md";
import MoveModal from "../Modals/MoveModal";

export default function CardModal({ dataC }) {
  console.log("dataC=>", dataC);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 640,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [openMove, setOpenMove] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8002/cards/${dataC.id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    }).then(() => {
      alert("Card Deleted");
      window.location.reload();
    });
  };
  return (
    <>
      {/* CARD */}
      <div className="card-div">
        <div class="container">
          <div onClick={handleOpen} class="wrapper">
            <div
              style={{
                width: "180px",
                height: "180px",
                margin: "auto",
                backgroundImage: `url(${vdImg})`,
              }}
              class="banner-image"
            >
              {" "}
            </div>
            <p style={{ fontSize: "20px", fontWeight: "600" }}>
              {" "}
              {dataC.cardName}{" "}
            </p>
          </div>
          <div class="button-wrapper">
            <button class="btn outline" onClick={() => setIsOpen(true)}>
              Edit
            </button>
            <button onClick={(e) => handleDelete(e)} class="btn fill">
              Delete
            </button>
            <MdDriveFileMove
              onClick={() => setOpenMove(true)}
              size={25}
              style={{
                marginTop: "10px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>

      {openMove ? (
        <MoveModal state={openMove} setState={setOpenMove} dataM={dataC} />
      ) : (
        ""
      )}

      {isOpen ? (
        <BasicModal state={isOpen} setState={setIsOpen} dataM={dataC} />
      ) : (
        ""
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ReactPlayer url={dataC.url} controls={true} playing={true} />
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
