import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input } from "antd";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddModal({ state, setState, id }) {
  const handleOpen = () => setState(true);
  const handleClose = () => setState(false);

  const [name, setName] = useState();
  const [url, setUrl] = useState();

  const handleAdd = (e) => {
    e.preventDefault();
    const body = { cardName: name, url: url, bucketId: id };
    console.log("body->", body);
    fetch("http://localhost:8002/cards ", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    }).then(() => {
      alert("Card Added");
      setState(false);
      window.location.reload();
    });
  };

  return (
    <div>
      <Modal
        open={state}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ textAlign: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Add Card
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Input
              style={{ margin: "10px" }}
              value={name}
              placeholder="Card Name"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              style={{ margin: "10px" }}
              value={url}
              placeholder="Video Url"
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button onClick={(e) => handleAdd(e)}>Add</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
