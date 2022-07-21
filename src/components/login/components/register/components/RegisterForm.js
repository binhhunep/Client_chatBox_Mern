import { Form, Input, Button } from "antd";
import React from "react";
import * as authApi from "../../../../../apis/services/authApi";

import * as modalResponse from "./components/modalResponse";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 4,
      offset: 10,
    },
    sm: {
      span: 4,
      offset: 10,
    },
  },
};

const RegisterModal = ({ onClick }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const res = await authApi.registerUser(values);
    if (res.success) {
      onClick();
    } else await modalResponse.error(res.message);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            type: "string",
          },
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input allowClear placeholder="binhhunep" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input allowClear placeholder="binhhunep@gmail.com" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password allowClear placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="repeat_password"
        label="Repeat Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password allowClear placeholder="Password confirm" />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterModal;
