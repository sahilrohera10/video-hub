import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CardModal from "../../Components/CardModal/CardModal";
import useFetch from "../../CustomHooks/useFetch";
import { Button } from "antd";
import AddModal from "../../Components/Modals/AddModal";
export default function CardsPage() {
  const params = useParams();
  const id = params.id;
  const name = params.name;

  const { data, isPending, Error } = useFetch(
    `http://localhost:8002/cards?bucketId=${id}`
  );

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <p style={{ fontSize: "25px", fontWeight: "600", color: "black" }}>
        {name}{" "}
      </p>
      <Button
        onClick={() => setIsOpen(true)}
        style={{
          position: "absolute",
          right: "1%",
          top: "14%",
          backgroundColor: "#5969C3",
        }}
        type="primary"
      >
        Add Card
      </Button>
      {isOpen ? <AddModal state={isOpen} setState={setIsOpen} id={id} /> : ""}

      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {data && data.map((d) => <CardModal dataC={d} />)}
      </div>
    </div>
  );
}
