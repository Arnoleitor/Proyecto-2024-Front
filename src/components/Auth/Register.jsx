import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';

const Register = ({setRegisterModalVisible}) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/auth/register', values);
      notification.success({ message: 'Usuario registrado!' });
      setRegisterModalVisible(false)
    } catch (error) {
      console.error('Error de registro:', error.message);
      if (error.response && error.response.status === 400) {
        notification.error({ message: error.response.data.message });
      } else {
        notification.error({ message: 'Error al registrar usuario' });
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="register-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="Nombre de usuario"
        name="username"
        rules={[
          { required: true, message: 'Ingresa tu nombre de usuario' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Correo electrónico"
        name="email"
        rules={[
          { required: true, message: 'Ingresa tu correo electrónico' },
          { type: 'email', message: 'Ingresa un correo electrónico válido' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="password"
        rules={[
          { required: true, message: 'Ingresa tu contraseña' },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirmar contraseña"
        name="confirmPassword"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Confirma tu contraseña' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('Las contraseñas no coinciden');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Registrar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
