import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Input } from "antd";
import useFetch from "../../CustomHooks/useFetch";

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

export default function MoveModal({ state, setState, dataM }) {
  const handleOpen = () => setState(true);
  const handleClose = () => setState(false);

  const [bId, setBId] = React.useState();
  const { data, isPending, Error } = useFetch("http://localhost:8002/buckets");

  const handleMove = (e) => {
    e.preventDefault();
    const body = { cardName: dataM.cardName, url: dataM.url, bucketId: bId };

    fetch(`http://localhost:8002/cards/${dataM.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    }).then(() => {
      alert("Card Moved");
      handleClose();
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
            Move this Video to other Bucket
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Bucket
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bId}
                label=" Select Bucket"
                onChange={(e) => setBId(e.target.value)}
              >
                {data &&
                  data.map((d) => <MenuItem value={d.id}> {d.name} </MenuItem>)}
              </Select>
            </FormControl>
            <Button onClick={(e) => handleMove(e)}>Move</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
