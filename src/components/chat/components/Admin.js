import React from "react";
import styles from "../../../scss/components/admin.module.scss";
import { Avatar, Typography } from "antd";

const { Text } = Typography;
function Admin({ avatar, admin }) {
  return (
    <div className={styles.container}>
      <Avatar
        size={64}
        style={{
          backgroundImage: `url(${avatar})`,
          marginRight: "10px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Text style={{ color: "white", fontWeight: "bold" }}>{admin}</Text>
    </div>
  );
}

export default Admin;
