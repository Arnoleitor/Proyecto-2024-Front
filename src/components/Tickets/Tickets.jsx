import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useGetUser } from '../../store/user/userSelectors';
import { useDispatch } from 'react-redux';

const TicketForm = ({ visible, onCreate, onCancel }) => {
  const dispatch = useDispatch();
  const userData = useGetUser();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onCreate(values);
    form.resetFields();
  };

  const handleCrearNuevoTicket = async (values) => {
    try {
      const valuesWithUserIdAndTimestamp = {
        ...values,
        idUsuario: userData.id,
        fecha: new Date().getTime(),
      };

      const url = 'http://localhost:3000/api/nuevoTicket';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(valuesWithUserIdAndTimestamp),
      });

      if (response.ok) {
        message.success('Ticket creado exitosamente');
      } else {
        message.error('Error al crear el ticket:', response.status, response.statusText);
      }
    } catch (error) {
      message.error('Error al crear el ticket, debes iniciar sesión');
    }
  };

  return (
    <Modal
      open={visible}
      closable={false}
      title="Crear Ticket"
      okText="Crear"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onFinish(values);
            handleCrearNuevoTicket(values);
          })
          .catch((info) => {
            console.log('Validación fallida:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="ticket_form">
        <Form.Item
          name="titulo"
          label="Título"
          rules={[{ required: true, message: 'Por favor ingresa el título del ticket' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="descripcion"
          label="Descripción"
          rules={[{ required: true, message: 'Por favor ingresa la descripción del ticket' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
      <span style={{ color: 'red' }}>Una vez mandes el ticket, aparecerá en tu perfil de usuario.</span>
    </Modal>
  );
};

export default TicketForm;
