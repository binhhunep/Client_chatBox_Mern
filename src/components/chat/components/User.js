import React from "react";
import styles from "../../../scss/components/user.module.scss";
import { Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;
function User({ avatar, username, onClick, bgColor, color, size, _id }) {
  return (
    <div
      className={styles.container}
      onClick={() => {
        onClick({ avatar, username, _id });
      }}
      style={{ backgroundColor: bgColor }}
    >
      <Avatar
        size={size}
        style={{
          backgroundImage: `url(${avatar})`,
          marginRight: "10px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!avatar ? <UserOutlined /> : ""}
      </Avatar>
      <Text style={{ color: color }}>{username}</Text>
    </div>
  );
}

export default User;
