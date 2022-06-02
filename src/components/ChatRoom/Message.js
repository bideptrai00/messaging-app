import { Avatar, Tooltip, Typography } from "antd";
import React from "react";
import styles from "./Message.scss";
import classNames from "classnames/bind";
import { formatRelative } from "date-fns/esm";

const cx = classNames.bind(styles);

function formatDate(seconds) {
  let formatDate = "";
  if (seconds) {
    formatDate = formatRelative(new Date(seconds * 1000), new Date());

    formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
  }
  return formatDate;
}

export default function Message({
  text,
  displayName,
  createdAt,
  photoURL,
  myMessage,
}) {
  return (
    <div className={cx("mess-wrapper", { myMessage: myMessage })}>
      {!myMessage && (
        <div className={cx("mess-title")}>
          <Avatar size="small" className={cx("mess-avt")} src={photoURL}>
            {photoURL ? "" : displayName?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography.Text className={cx("mess-auth")}>
            {displayName}
          </Typography.Text>
        </div>
      )}
      <Tooltip placement="left" title={formatDate(createdAt?.seconds)}>
        <div className={cx("mess-content")}>
          <Typography.Text className={cx("mess-text")}>{text}</Typography.Text>
        </div>
      </Tooltip>
    </div>
  );
}
