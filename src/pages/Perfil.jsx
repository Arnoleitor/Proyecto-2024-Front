import React from "react";
import { Form, Input, Button, Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from '../featues/userSlice ';
import axios from "axios";

const Perfil = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const onFinish = async (values) => {
    if (userData && userData.id) {
      // Realizar la conversión
      const convertedValues = { ...values, username: values.nombre };

      dispatch(setUserData(convertedValues));

      try {
        const response = await axios.put(`http://localhost:3000/api/users/${userData.id}`, convertedValues);
        dispatch(setUserData(response.data));
      } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
      }
    } else {
      console.error('Error');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h1>Perfil de {userData.nombre ? userData.nombre : 'Usuario sin nombre'}</h1>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 12 }}
          onFinish={onFinish}
          initialValues={{ nombre: userData.nombre, direccion: userData.direccion }}
        >
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: 'El nombre no puede estar vacío' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Dirección"
            name="direccion"
            rules={[{ required: true, message: 'La direccón no puede estar vacía' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 12 }}>
            <Button type="primary" htmlType="submit">
              Guardar Cambios
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div style={{ flex: 1 }}>
        <Card title="Tus datos" style={{ width: '300px' }}>
          <p>Nombre: {userData.nombre}</p>
          <p>Dirección: {userData.direccion}</p>
          <p>Email: {userData.email}</p>
        </Card>
      </div>
    </div>
  );
};


export default Perfil;
