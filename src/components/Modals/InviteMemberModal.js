import React, { useContext, useMemo, useState } from "react";
import { Modal, Form, Select, Spin, Avatar } from "antd";
import { AppContext } from "../Context/AppProvider";

import { AuthContext } from "../Context/AuthProvider";
import { debounce } from "lodash";
import { async } from "@firebase/util";
import { db } from "../../firebase/config";
import useFireStore from "../../hooks/useFireStore";

function DebounceSelect({ fetchOptions, debounceTimeOut = 300, ...props }) {
  const [fetching, setFetching] = useState(false);

  // search result
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, props.currMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchOptions, debounceTimeOut]);
  return (
    <Select
      showSearch
      filterOption={false}
      labelInValue
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((option, index) => (
        <Select.Option key={index} value={option.value} title={option.label}>
          <Avatar size="small" src={option.photoURL}>
            {option.photoURL ? "" : option.label?.charAt(0).toUpperCase()}
          </Avatar>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  );
}

async function fetchUserList(searchValue, currMembers) {
  return db
    .collection("users")
    .where("keywords", "array-contains", searchValue)
    .orderBy("displayName")
    .limit(20)
    .get()
    .then((snapShot) => {
      console.log("searchValue", searchValue);
      console.log("snapShot", snapShot);
      return snapShot.docs
        .map((doc) => ({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
        }))
        .filter((opt) => !currMembers.includes(opt.value));
    });
}

export default function InviteMemberModal() {
  const [value, setValue] = useState([]);

  const {
    isInviteMemberModal,
    setIsInviteMemberModal,
    selectorRoomID,
    roomCurrent,
  } = useContext(AppContext);

  const [form] = Form.useForm();
  const handleOK = () => {
    // reset form
    form.resetFields();
    //update member
    const roomRef = db.collection("rooms").doc(selectorRoomID);
    roomRef.update({
      members: [...roomCurrent.members, ...value.map((val) => val.value)],
    });

    setIsInviteMemberModal(false);
  };
  const handleCancle = () => {
    form.resetFields();
    setIsInviteMemberModal(false);
  };

  console.log("value", value);

  return (
    <div>
      <Modal
        title="MỜi thêm thành viên"
        visible={isInviteMemberModal}
        onOk={handleOK}
        onCancel={handleCancle}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            label="Tên Thành viên"
            value={value}
            placeholder="Nhập tên thành viên"
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
            currMembers={roomCurrent ? roomCurrent.members : []}
          />
        </Form>
      </Modal>
    </div>
  );
}
