import React, { useState } from 'react';
import { Form, Input, Button, Modal, notification } from 'antd';
import axios from 'axios';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Register from '../Auth/Register';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../store/userSlice ';

const Login = () => {
  const dispatch = useDispatch();
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  const showRegisterModal = () => {
    setRegisterModalVisible(true);
  };

  const handleCancel = () => {
    setRegisterModalVisible(false);
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', values);
      notification.success({duration:1.5,  message: 'Inicio de sesión correcto!' });
      dispatch(setUserData(response.data));
    } catch (error) {
      console.error('Login failed:', error);
      notification.error({ message: 'Correo o contraseña invalido!' });
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Por favor introduce tu email!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Por favor introduce tu contraseña!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Contraseña"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
        </Form.Item>

        <a className="login-form-forgot" href="/">
          Contraseña olvidada
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Inicia sesión
        </Button>
        <span style={{ marginLeft: '1%' }}>O</span>
        <Button style={{ marginLeft: '1%' }} type='primary' ghost onClick={showRegisterModal}>regístrate aquí!</Button>
      </Form.Item>

      <Modal
        title="Registro"
        open={registerModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Register />
      </Modal>
    </Form>
  );
};

export default Login;
