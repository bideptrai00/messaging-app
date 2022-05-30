import React, { useContext, useState } from "react";
import { Modal, Form, Input } from "antd";
import { AppContext } from "../Context/AppProvider";
import styles from "./AddRoomModal.scss";
import classNames from "classnames";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../Context/AuthProvider";

const cx = classNames.bind(styles);

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();
  const handleOK = () => {
    console.log("form", {
      ...form.getFieldValue(),
      members: [uid],
    });
    addDocument("rooms", {
      ...form.getFieldValue(),
      members: [uid],
    });
    // reset form
    form.resetFields();

    setIsAddRoomVisible(false);
  };
  const handleCancle = () => {
    form.resetFields();
    setIsAddRoomVisible(false);
  };

  return (
    <div>
      <Modal
        title="Tạo phòng"
        visible={isAddRoomVisible}
        onOk={handleOK}
        onCancel={handleCancle}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Tên phòng" name="name">
            <Input placeholder="Nhập tên phòng" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea placeholder="Nhập mô tả" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
