import { Avatar, Form, Modal, Select, Spin } from "antd";
import { debounce } from "lodash";
import React, { useState } from "react";
import { useApp } from "../../contexts/AppContext";
import { db } from "../../firebase/config";
import { fetchUserList } from "../../firebase/services";

const debounceTimeout = 300;

export default function InviteMemberModal() {
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    curRoomId,
    curRoom,
  } = useApp();

  const [values, setValues] = useState([]);
  const [form] = Form.useForm();
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearchUsers = React.useMemo(() => {
    const handler = (keyword) => {
      setOptions([]);
      setFetching(true);

      fetchUserList(keyword, curRoom.members).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(handler, debounceTimeout);
  }, [curRoom]);

  React.useEffect(() => {
    return () => {
      setOptions([]);
    };
  }, []);

  const handleOk = () => {
    form.resetFields();
    setValues([]);
    const roomRef = db.collection("rooms").doc(curRoomId);
    roomRef.update({
      members: [...curRoom.members, ...values.map((val) => val.value)],
    });
    setIsInviteMemberVisible(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setValues([]);
    setIsInviteMemberVisible(false);
  };

  return (
    <div>
      <Modal
        title="Invite new member"
        visible={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form form={form} layout="vertical">
          <Select
            mode="multiple"
            labelInValue
            filterOption={false}
            onSearch={handleSearchUsers}
            onChange={(newValues) => setValues(newValues)}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            style={{ width: "100%" }}
          >
            {options.map((opt) => (
              <Select.Option
                key={opt.uid}
                value={opt.uid}
                title={opt.displayName}
              >
                <Avatar size="small" src={opt.photoURL}>
                  {opt.photoURL
                    ? ""
                    : opt.displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
                {` ${opt.displayName}`}
              </Select.Option>
            ))}
          </Select>
        </Form>
      </Modal>
    </div>
  );
}
