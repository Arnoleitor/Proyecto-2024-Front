import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../useHooks/useFetch';
import { Button, Divider, Table, Modal } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const ContactoMensaje = () => {
  const [mensajes, setMensajes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const { data: responseMensajesData } = useFetch("http://localhost:3000/api/getcontacto");

  useEffect(() => {
    if (responseMensajesData) setMensajes(responseMensajesData);
  }, [responseMensajesData]);

  const handleReply = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleOpenModal = (message) => {
    setSelectedMessage(message);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const columnsMensajesConctacto = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">{email}</a>
      )
    },
    {
      title: "Ver mensaje",
      dataIndex: "mensaje",
      key: "mensaje",
      width: 200,
      render: (mensaje, record) => (
        <Button type="primary" icon={<MailOutlined />} onClick={() => handleOpenModal(record)}></Button>
      )
    }
  ];
  

  return (
    <div className='tablasAdmin'>
      <h2>Mensajes de contacto</h2>
      <Divider />
      <Table dataSource={mensajes} columns={columnsMensajesConctacto} />
      <Modal
        title={`Mensaje de ${selectedMessage && selectedMessage.nombre}`}
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Cerrar
          </Button>,
          <Button key="reply" type="primary" onClick={() => handleReply(selectedMessage.email)}>
            Responder
          </Button>,
        ]}
      >
        <p>{selectedMessage && selectedMessage.mensaje}</p>
      </Modal>
    </div>
  );
};

export default ContactoMensaje;
