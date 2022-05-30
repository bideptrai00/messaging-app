import { Avatar, Button, Typography } from "antd";
import React, { useContext, useEffect } from "react";
import styles from "./UserInfo.module.scss";
import classNames from "classnames/bind";
import { db, auth } from "../../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../Context/AuthProvider";

const cx = classNames.bind(styles);

export default function UserInfo() {
  useEffect(() => {
    // const unsub = onSnapshot(doc(db, "users", "SF"), (doc) => {
    //   console.log("Current data: ", doc.id);
    // });
    // return unsub;

    db.collection("users").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(data);
    });
  }, []);

  const {
    user: { displayName, photoURL },
  } = useContext(AuthContext);

  return (
    <div className={cx("wrapper")}>
      <div>
        <Avatar src={photoURL}>
          {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className={cx("username")}>
          {displayName}
        </Typography.Text>
      </div>
      <Button ghost onClick={() => auth.signOut()}>
        Log Out
      </Button>
    </div>
  );
}
