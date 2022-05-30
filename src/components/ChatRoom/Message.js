import { Avatar, Typography } from "antd";
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

export default function Message({ text, displayName, createdAt, photoURL }) {
  return (
    <div className={cx("mess-wrapper")}>
      <div className={cx("mess-title")}>
        <Avatar size="small" className={cx("mess-avt")} src={photoURL}>
          {photoURL ? "" : displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text className={cx("mess-auth")}>
          {displayName}
        </Typography.Text>
        <Typography.Text className={cx("mess-time")}>
          {formatDate(createdAt?.seconds)}
        </Typography.Text>
      </div>
      <div className={cx("mess-content")}>
        <Typography.Text>{text}</Typography.Text>
      </div>
    </div>
  );
}
