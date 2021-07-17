import { Form, Input, Modal } from 'antd';
import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import { addDocument } from '../../firebase/services';

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useApp();
  const {
    user: { uid },
  } = useAuth();

  const [form] = Form.useForm();

  const closeModal = () => {
    form.resetFields();
    setIsAddRoomVisible(false);
  }

  const handleOk = () => {
    addDocument('rooms', { ...form.getFieldsValue(), members: [uid] });
    closeModal()
  };

  const handleCancel = () => {
    closeModal()
  };

  return (
    <div>
      <Modal
        title='Create room'
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical'>
          <Form.Item label='Room name' name='name'>
            <Input placeholder='Enter your room' />
          </Form.Item>
          <Form.Item label='Description' name='description'>
            <Input.TextArea placeholder='Enter your description' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}