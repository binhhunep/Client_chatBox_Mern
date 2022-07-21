import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input, Typography, Avatar } from "antd";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "../../scss/components/formLogin.module.scss";

import * as authApi from "../../apis/services/authApi";
import authSlices from "../../redux/slices/authSlices";

import RegisterModal from "./components/register/RegisterModal";
import AlertLogin from "./components/Alert";

const { Title } = Typography;

function FormLogin() {
  const disPatch = useDispatch();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const res = await authApi.checkLogin(values);
    if (res.success) {
      const user = res.data;
      disPatch(authSlices.actions.login(user));
      navigate(`/setAvatar`, { replace: true });
      localStorage.setItem("_id", user._id);
      localStorage.setItem("admin", user.username);
    } else {
      setError(res.message);
    }
  };

  return (
    <div className={styles.container}>
      <Form
        name="normal_login"
        className={styles.container_loginForm}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item>
          <Title className={styles.loginForm_title} level={3}>
            Chat with Mr.Binh
          </Title>
        </Form.Item>
        <Form.Item>
          <Avatar
            size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 64,
              xl: 80,
              xxl: 100,
            }}
            className={styles.loginForm_avatar}
          />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            className={styles.loginForm_input}
            prefix={<UserOutlined className={styles.loginForm_itemIcon} />}
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            className={styles.loginForm_input}
            prefix={<LockOutlined className={styles.loginForm_itemIcon} />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className={styles.loginForm_remember}>
                Remember me
              </Checkbox>
            </Form.Item>

            <span
              style={{ cursor: "pointer", color: "#1890FF" }}
              className={styles.loginForm_forgot}
              href=""
            >
              Forgot password
            </span>
          </div>
        </Form.Item>
        <Form.Item>
          <RegisterModal />
        </Form.Item>
        <Form.Item style={{ height: "20px" }}>
          {error ? <AlertLogin error={error} /> : ""}
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormLogin;
