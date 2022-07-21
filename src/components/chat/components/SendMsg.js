import React from "react";

function SendMsg({ msg }) {
  return (
    <div
      style={{
        display: `${msg === "" ? "none" : "flex"}`,
        border: "solid red 1px",
        maxWidth: "fit-content",
        borderRadius: "5px",
        backgroundColor: "white",
        margin: "2px 0",
        padding: "2px",
      }}
    >
      {msg}
    </div>
  );
}

export default SendMsg;
