import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase from '../../firebase/config';
import { useAuth } from "../../contexts/AuthContext"

const { Title } = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const { login } = useAuth()
  return (
    <div>
      <Row justify='center' style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: 'center' }} level={3}>
            Fun Chat
          </Title>
          <Button
            style={{ width: '100%', marginBottom: 5 }}
            onClick={() => login(googleProvider)}
          >
            Login with Google
          </Button>
          <Button
            style={{ width: '100%' }}
            onClick={() => login(fbProvider)}
          >
            Login with Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}