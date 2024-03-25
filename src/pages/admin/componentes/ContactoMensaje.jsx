import React, { useEffect, useState } from 'react'
import { useFetch } from '../../../useHooks/useFetch';
import { Divider, Table } from 'antd';

const ContactoMensaje = () => {

  const [mensajes, setMensajes] = useState([]);

  const { data: responseMensajesData } = useFetch("http://localhost:3000/api/getcontacto");
  useEffect(() => {
      if (responseMensajesData) setMensajes(responseMensajesData);
  }, [responseMensajesData]);

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
    },
    {
      title: "Mensaje",
      dataIndex: "mensaje",
      key: "mensaje",
  },
];

return (
    <>
    <div className='tablasAdmin'>
        <h2>Mensajes de contacto</h2>
        <Divider />
        <Table dataSource={mensajes} columns={columnsMensajesConctacto} />
    </div>
    </>
  )
}

export default ContactoMensaje;