import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../useHooks/useFetch';
import { Button, Divider, Table } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const ContactoMensaje = () => {
  const [mensajes, setMensajes] = useState([]);
  const { data: responseMensajesData } = useFetch("http://localhost:3000/api/getcontacto");
  
  useEffect(() => {
    if (responseMensajesData) setMensajes(responseMensajesData);
  }, [responseMensajesData]);

  const handleReply = (email) => {
    window.location.href = `mailto:${email}`;
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
      title: "Mensaje",
      dataIndex: "mensaje",
      key: "mensaje",
    },
    {
      title: "Responder",
      key: "accion",
      render: (i, record) => (
        <Button icon={<MailOutlined/>} type='primary' onClick={() => handleReply(record.email)}></Button>
      )
    }
  ];

  return (
    <div className='tablasAdmin'>
      <h2>Mensajes de contacto</h2>
      <Divider />
      <Table dataSource={mensajes} columns={columnsMensajesConctacto} />
    </div>
  );
};

export default ContactoMensaje;
