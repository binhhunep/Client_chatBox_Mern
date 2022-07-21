import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Typography } from "antd";

import styles from "../../scss/components/avatar.background.module.scss";
import * as authApi from "../../apis/services/authApi";

import AvatarUser from "./components/AvatarUser";
import background from "../../assets/images/background.jpg";
import avatar1 from "../../assets/images/avatar1.jpg";
import avatar2 from "../../assets/images/avatar2.jpg";
import avatar3 from "../../assets/images/avatar3.jpg";
import avatar4 from "../../assets/images/avatar4.jpg";
import avatar5 from "../../assets/images/avatar5.jpg";

const { Title } = Typography;

export default function SetAvatar() {
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(avatar1);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleClick = (avatar) => {
    setAvatar(avatar);
    const id = localStorage.getItem("_id");
    setData({
      userId: id,
      avatarImage: avatar,
    });
  };

  const handleSaveClick = async () => {
    const res = await authApi.setAvatar(data);
    console.log(res);
    setIsLoading(!isLoading);
    setTimeout(() => {
      navigate("/chat", { replace: true });
    }, 3000);
    localStorage.setItem("avatar", avatar);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 3000);
  }, []);

  return (
    <>
      {!isLoading ? (
        <div style={{ backgroundColor: "#262626" }}>
          <div className={styles.container_loading} />
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${background})`,
            backgroundPosition: "center",
          }}
        >
          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <AvatarUser size={84} url={avatar} />
          </div>
          <div>
            <Title type="success" level={4}>
              Pick an avatar as your profile picture
            </Title>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px 0 30px  0",
            }}
          >
            <AvatarUser
              size={64}
              url={avatar1}
              onClick={(avatar) => handleClick(avatar)}
            />
            <AvatarUser
              size={64}
              url={avatar2}
              onClick={(avatar) => handleClick(avatar)}
            />
            <AvatarUser
              size={64}
              url={avatar3}
              onClick={(avatar) => handleClick(avatar)}
            />
            <AvatarUser
              size={64}
              url={avatar4}
              onClick={(avatar) => handleClick(avatar)}
            />
            <AvatarUser
              size={64}
              url={avatar5}
              onClick={(avatar) => handleClick(avatar)}
            />
          </div>
          <div>
            <Button onClick={handleSaveClick} type="primary" size="large">
              Save
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
