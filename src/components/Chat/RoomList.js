import React from 'react';
import { Collapse, Typography, Button } from 'antd';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';
import {useApp} from '../../contexts/AppContext'

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

export default function RoomList() {
  const { rooms, setIsAddRoomVisible, setCurRoomId } = useApp()

  return (
    <Collapse ghost defaultActiveKey={['1']}>
      <PanelStyled header='Listing room' key='1'>
        {rooms.map((room) => (
          <LinkStyled key={room.id} onClick={() => setCurRoomId(room.id)}>
            {room.name}
          </LinkStyled>
        ))}
        <Button
          type='text'
          icon={<PlusSquareOutlined />}
          className='add-room'
          onClick={() =>  setIsAddRoomVisible(true)}
        >
          Add a new room
        </Button>
      </PanelStyled>
    </Collapse>
  );
}