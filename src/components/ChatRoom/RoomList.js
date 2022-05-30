import React, { useContext, useMemo } from "react";
import { Button, Collapse, Typography } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import styles from "./RoomList.scss";
import classNames from "classnames/bind";

import { AppContext } from "../Context/AppProvider";
const cx = classNames.bind(styles);

const { Panel } = Collapse;

export default function RoomList() {
  const {
    rooms,
    isAddRoomVisible,
    setIsAddRoomVisible,
    selectorRoomID,
    setSelectorRoomID,
  } = useContext(AppContext);

  console.log("rooms", rooms);

  return (
    <Collapse className={cx("wrapper")} ghost defaultActiveKey={["1"]}>
      <Panel className={cx("list-panel")} header="List Room" key="1">
        {rooms.map((room) => (
          <Typography.Link
            key={room.id}
            onClick={() => setSelectorRoomID(room.id)}
          >
            {room.name}
          </Typography.Link>
        ))}

        <Button
          className="add-room"
          icon={<PlusSquareOutlined />}
          onClick={() => setIsAddRoomVisible(true)}
        >
          Add Room
        </Button>
      </Panel>
    </Collapse>
  );
}
