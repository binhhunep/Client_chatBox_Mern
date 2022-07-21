import React from "react";
import styles from "../../../scss/components/brand.module.scss";
import { Image, Typography } from "antd";
import logo from "../../../assets/images/logo.jpg";

const { Title } = Typography;
function Brand({ title }) {
  return (
    <div className={styles.container}>
      <Image width={60} src={logo} alt="logo" />
      <Title style={{ margin: "auto 0", color: "white" }} level={4}>
        ChatApp
      </Title>
    </div>
  );
}

export default Brand;
