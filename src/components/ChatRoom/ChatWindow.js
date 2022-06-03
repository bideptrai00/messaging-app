import React, { useContext, useMemo, useState } from "react";
import styles from "./ChatWindow.scss";
import classNames from "classnames/bind";
import { Avatar, Button, Form, Input, Tooltip } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import Message from "./Message";
import { AppContext } from "../Context/AppProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../Context/AuthProvider";
import useFireStore from "../../hooks/useFireStore";

const cx = classNames.bind(styles);

export default function ChatWindow() {
  const [inputValue, setInputValue] = useState("");

  const {
    roomCurrent,
    userInRoom,
    isInviteMemberModal,
    setIsInviteMemberModal,
  } = useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleClickAddMember = () => {
    setIsInviteMemberModal(true);
    console.log("isInviteMemberModal", isInviteMemberModal);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleEnter = () => {
    addDocument("message", {
      text: inputValue,
      uid,
      photoURL,
      roomId: roomCurrent.id,
      displayName,
    });
    form.resetFields(["message"]);
  };
  const messCodition = useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: roomCurrent?.id,
    }),
    [roomCurrent?.id]
  );

  const messages = useFireStore("message", messCodition);

  return (
    <div className={cx("wrapper-chat")}>
      <div className={cx("wrapper-header")}>
        <div className={cx("header__info")}>
          <p className={cx("header__title")}>
            {roomCurrent ? roomCurrent.name : "Chọn phòng"}
          </p>
          <span className={cx("header__des")}>
            {roomCurrent ? roomCurrent.description : ""}
          </span>
        </div>
        <div className={cx("header__user")}>
          {roomCurrent && (
            <Button
              icon={<UserAddOutlined />}
              type="text"
              onClick={handleClickAddMember}
            >
              Mời
            </Button>
          )}
          <Avatar.Group size="small" maxCount={2}>
            {userInRoom.map((user) => (
              <Tooltip key={user.id} title={user.displayName}>
                <Avatar src={user.photoURl}>
                  {user.photoURL
                    ? ""
                    : user.displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        </div>
      </div>
      <div className={cx("wrapper-content")}>
        <div className={cx("message-list")}>
          {messages.map((message) => (
            <Message
              myMessage={message.uid === uid}
              key={message.id}
              text={message.text}
              displayName={message.displayName}
              createdAt={message.createdAt}
              photoURL={message.photoURL}
            />
          ))}
        </div>
        {roomCurrent ? (
          <Form form={form} className={cx("form-send")}>
            <Form.Item name="message" className={cx("form-input")}>
              <Input
                onPressEnter={handleEnter}
                onChange={handleInputChange}
                placeholder="Aa"
                bordered={false}
              ></Input>
            </Form.Item>
            <Button type="primary" onClick={handleEnter}>
              Send
            </Button>
          </Form>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
