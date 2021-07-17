import { Avatar, Button, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';


const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);
  .username {
    color: white;
    margin-left: 5px;
  }
`;

export default function UserInfo() {
  const {
    user: { displayName, photoURL },
    logout
  } = useAuth();
  const { clearState } = useApp();

  const handleLogout = () => {
    logout()
    clearState();
  }

  return (
    <WrapperStyled>
      <div>
        <Avatar src={photoURL}>
          {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className='username'>{displayName}</Typography.Text>
      </div>
      <Button
        ghost
        onClick={handleLogout}
      >
        Logout
      </Button>
    </WrapperStyled>
  );
}