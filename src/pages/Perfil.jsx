import React from "react";
import { Form, Input, Button, Card } from "antd";
import { useSelector } from "react-redux";

const Perfil = () => {
  const userData = useSelector((state) => state.user);
  
  const onFinish = (values) => {
    // Handle form submission logic here
    console.log("Received values:", values);
  };


  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, marginRight: "20px" }}>
        <h1>Perfil de {userData.nombre}</h1>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 12 }}
          onFinish={onFinish}
          initialValues={{ nombre: userData.nombre, direccion: "" }}
        >
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: "Ingrese su nombre" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Dirección" name="direccion">
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
        <Card title="Tus datos" style={{ width: "300px" }}>
          <p>Nombre: {userData.nombre}</p>
          <p>Dirección: {userData.direccion}</p>
          <p>Email: {userData.email}</p>
        </Card>
      </div>
    </div>
  );
};

export default Perfil;
