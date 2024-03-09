import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Select, notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from '../store/user/userSlice';
import { useFetch } from "../useHooks/useFetch";
import axios from "axios";

const Perfil = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [tiposDevia, setTiposDevia] = useState([]);

  const openNotification = (type, message) => {
    notification[type]({
      message,
      duration:1.5,
    });
  };

  const { data: tipoViaData } = useFetch(`http://localhost:3000/api/tiposdevias`);
    useEffect(() => {
        if (tipoViaData) setTiposDevia(tipoViaData);
    }, [tipoViaData]);
  

  const onFinish = async (values) => {
    if (userData && userData.id) {
      try {
        const response = await axios.put(`http://localhost:3000/api/users/${userData.id}`, {
          ...values,
          username: values.nombre,
        });
        dispatch(setUserData(response.data));
        openNotification('success', 'Usuario actualizado correctamente');
      } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
        openNotification('error', 'Error al actualizar usuario');
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
          initialValues={{ nombre: userData.nombre, tipoVia: userData.tipoVia , direccion: userData.direccion }}
        >
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: 'El nombre no puede estar vacío' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tipo de Vía"
            name="tipoVia"
            rules={[{ required: true, message: 'Seleccione el tipo de vía' }]}
          >
            <Select>
              {tiposDevia.map((tipo) => (
                <Option key={tipo.id} value={tipo.tipo}>
                  {tipo.tipo}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Dirección"
            name="direccion"
            rules={[{ required: true, message: 'La dirección no puede estar vacía' }]}
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
          <p>Tipo de vía: {userData.tipoVia}</p>
          <p>Email: {userData.email}</p>
        </Card>
      </div>
    </div>
  );
};


export default Perfil;
