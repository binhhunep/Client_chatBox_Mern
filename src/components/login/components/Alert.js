import { Alert } from "antd";
import React from "react";
import Marquee from "react-fast-marquee";

const AlertLogin = ({ error }) => (
  <Alert
    style={{ borderRadius: "5px" }}
    banner
    message={
      <Marquee style={{ color: "red" }} pauseOnHover gradient={false}>
        {error}
      </Marquee>
    }
  />
);

export default AlertLogin;
