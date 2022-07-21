import React from "react";
import { Avatar } from "antd";
import styles from "../../../scss/components/avatar.module.scss";

export default function AvatarUser({ size, url, onClick }) {
  return (
    <div onClick={() => onClick(url)} style={{ margin: "0 20px" }}>
      <Avatar
        className={styles.container}
        style={{
          backgroundImage: `url(${url})`,
        }}
        size={size}
      />
    </div>
  );
}
