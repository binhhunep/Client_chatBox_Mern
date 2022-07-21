import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../scss/components/chat.container.module.scss";

import { Row, Col, Button, Input, Image, Typography } from "antd";
import { PoweroffOutlined, SendOutlined } from "@ant-design/icons";
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";

import Brand from "./components/Brand";
import Admin from "./components/Admin";
import User from "./components/User";
import ReceiveMsg from "./components/ReceiveMsg";
import SendMsg from "./components/SendMsg";

import robot from "../../assets/images/robot.gif";

import * as authApi from "../../apis/services/authApi";
import * as messageApi from "../../apis/services/messageApi";

const { Text } = Typography;

function ChatContainer({ socket }) {
  const navigate = useNavigate();
  const idObject = localStorage.getItem("_id");
  const avatar = localStorage.getItem("avatar");
  const admin = localStorage.getItem("admin");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [isShowEmoji, setIsShowEmoji] = useState(false);
  const [msg, setMsg] = useState("");
  const [isStart, setIsStart] = useState(false);

  const [messages, setMessages] = useState([]);
  const [receiveMsg, setReceiveMsg] = useState();
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await messageApi.getMessages({
        from: idObject,
        to: user._id,
      });
      setMessages(data.data);
    };
    fetchData().catch(console.error);
  }, [user, reset]);

  const handleUserClick = (user) => {
    setUser({ username: user.username, avatar: user.avatar, _id: user._id });
    setIsStart(true);
  };

  const handleShowEmojiClick = () => {
    setIsShowEmoji(!isShowEmoji);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const handleMessageChange = (e) => {
    setMsg(e.target.value);
  };

  const handleSendClick = async () => {
    socket.current.emit("client-send-msg-server", {
      from: idObject,
      to: user._id,
      msg,
    }); //gui tin nhan xuong server
    const currentMessages = [...messages];
    currentMessages.push({ fromSeft: true, message: msg });
    setMessages(currentMessages);
    await messageApi.addMessage({
      from: idObject,
      to: user._id,
      message: msg,
    });
    setIsShowEmoji(false);
    setMsg("");
    setReset(!reset);
  };

  const handleLogoutClick = () => {
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("server-msg-receive-client", (msg) => {
        setReceiveMsg(msg);
        console.log(msg);
      });
    }
  }, [reset]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await authApi.getAllUsers(idObject);
      setUsers(data.data);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <Row className={styles.container}>
      <Col span={6} className={styles.container_listUser}>
        <Brand />
        <div className={styles.listUser}>
          {users.map((item, index) => {
            return (
              <User
                onClick={(user) => handleUserClick(user)}
                color="white"
                size={44}
                key={index}
                username={item.username}
                avatar={item.avatarImage}
                _id={item._id}
              />
            );
          })}
        </div>
        <Admin admin={admin} avatar={avatar} />
      </Col>
      {isStart ? (
        <Col span={18} className={styles.container_chatContainer}>
          <div className={styles.container_chatContainer_header}>
            <User
              avatar={user.avatar}
              username={user.username}
              bgColor="#7bcdc8"
              color="yellow"
              size={64}
            />
            <Button type="danger" onClick={handleLogoutClick}>
              <PoweroffOutlined />
            </Button>
          </div>
          <div className={styles.container_chatContainer_body}>
            {messages &&
              messages.map((data, index) => {
                if (data.fromSeft) {
                  return (
                    <div
                      key={index}
                      style={{
                        textAlign: "end",
                        display: "flex",
                        justifyContent: "end",
                      }}
                    >
                      <SendMsg msg={data.message} />
                    </div>
                  );
                } else {
                  return <ReceiveMsg key={index} msg={receiveMsg} />;
                }
              })}
          </div>
          <div className={styles.container_chatContainer_bottom}>
            {isShowEmoji ? <Picker onEmojiClick={handleEmojiClick} /> : ""}
            <div className={styles.chatContainer_bottom_chat}>
              <BsEmojiSmileFill
                onClick={handleShowEmojiClick}
                style={{
                  fontSize: "25px",
                  zIndex: "1",
                  color: "yellow",
                  cursor: "pointer",
                }}
              />
              <Input
                className={styles.bottom_chat_input}
                placeholder="type your message here"
                onChange={(e) => {
                  handleMessageChange(e);
                }}
                value={msg}
              />
              <Button
                className={styles.bottom_chat_button}
                type="primary"
                onClick={handleSendClick}
              >
                <SendOutlined
                  style={{
                    fontSize: "20px",
                    color: "white",
                  }}
                />
              </Button>
            </div>
          </div>
        </Col>
      ) : (
        <Col
          span={18}
          className={styles.container_chatContainer}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            type="warning"
            style={{ fontFamily: "monospace", fontSize: "25px" }}
          >
            Welcome to Chat with my boss-Mr.Binh!
          </Text>
          <Image src={robot} alt="robot" width={500} />
        </Col>
      )}
    </Row>
  );
}

export default ChatContainer;
