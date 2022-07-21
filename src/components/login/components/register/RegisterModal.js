import { Button, Modal } from "antd";
import React, { useState } from "react";
import styles from "../../../../scss/components/register.module.scss";
import RegisterForm from "./components/RegisterForm";

// import { useSelector } from "react-redux";
// import authSelectors from "../../redux/selectors/authSelectors";
// import { NavLink } from "react-router-dom";

const RegisterModal = () => {
  const [modal2Visible, setModal2Visible] = useState(false);
  // const userSelector = useSelector(authSelectors);
  // const isLogin = userSelector.isLogin;
  // console.log(userSelector);
  return (
    <div style={{ color: "white" }}>
      <Button
        type="primary"
        htmlType="submit"
        className={styles.loginForm_button}
      >
        Log in
      </Button>
      Or
      <span
        onClick={() => setModal2Visible(true)}
        style={{ cursor: "pointer", color: "#1890FF" }}
        href=""
      >
        &nbsp; register now!
      </span>
      <Modal
        title="Finish below form to register new user"
        centered
        visible={modal2Visible}
        onOk={() => setModal2Visible(false)}
        onCancel={() => setModal2Visible(false)}
        footer={null}
      >
        <RegisterForm
          onClick={() => {
            setModal2Visible(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default RegisterModal;
