import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = () => {
    const onFinish = async (values) => {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', values);
        console.log('Inicio de sesión correcto:', response.data);
      } catch (error) {
        console.error('Login failed:', error);
        message.error("No existe ese correo o contraseña")
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
          placeholder="Password"
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
          Inicia sesion
        </Button>
        <span style={{marginLeft:'1%'}}>O</span><a style={{marginLeft:'1%'}} href="/">registrate!</a>
      </Form.Item>
    </Form>
  );
};

export default Login;
