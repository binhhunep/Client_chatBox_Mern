import React from "react";

function ReceiveMsg({ msg }) {
  return (
    <div
      style={{
        display: `${msg === "" ? "none" : "flex"}`,
        border: "solid red 1px",
        maxWidth: "fit-content",
        borderRadius: "5px",
        backgroundColor: "white",
        margin: "2px",
        padding: "2px",
      }}
    >
      {msg}
    </div>
  );
}

export default ReceiveMsg;
