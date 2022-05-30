import { Col, Row } from "antd";
import React from "react";
import RoomList from "./RoomList";
import UserInfo from "./UserInfo";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
export default function Sidebar() {
  return (
    <Row className={cx("row")}>
      <Col span={24}>
        <UserInfo />
      </Col>
      <Col span={24}>
        <RoomList />
      </Col>
    </Row>
  );
}
