import React, { useEffect, useState } from 'react';
import { Table, Button, Space, message, Modal, Input, Select, Divider } from 'antd';
import { useFetch } from '../../../useHooks/useFetch';
import axios from 'axios';
import FechaFormateada from '../../../components/Customs/FechaFormateada';

const TicketsAdmin = () => {
  const [tickets, setTickets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [respuesta, setRespuesta] = useState('');
  const [ticketSeleccionado, setTicketSeleccionado] = useState(null);

  const { data: ticketsData } = useFetch('http://localhost:3000/api/recibirTicket');
  useEffect(() => {
    if (ticketsData) {
      setTickets(ticketsData);
    }
  }, [ticketsData]);

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      render: (fecha) => <FechaFormateada timestamp={fecha} />
    },
    {
      title: 'Título',
      dataIndex: 'titulo',
      key: 'titulo',
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Respuesta',
      dataIndex: 'respuesta',
      key: 'respuesta',
      render: (respuesta) => (
        respuesta ? respuesta : <span style={{ color: 'red' }}>Sin responder</span>
      ),
    },
    {
      title: 'Fecha respuesta',
      dataIndex: 'fechaRespuesta',
      key: 'fechaRespuesta',
      render: (fechaRespuesta) => (
        fechaRespuesta ? <FechaFormateada timestamp={fechaRespuesta} /> : <span style={{ color: 'red' }}>Sin responder</span>
      ),
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (text, record) => {
        const disableClosedOption = !record.respuesta && text === 'Cerrado';
  
        return (
          <Select 
            value={text} 
            onChange={(value) => handleCambiarEstado(record, value)}
          >
            <Select.Option value="Abierto">Abierto</Select.Option>
            <Select.Option value="Cerrado" disabled={disableClosedOption}>Cerrado</Select.Option>
            <Select.Option value="En progreso">En progreso</Select.Option>
          </Select>
        );
      },
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleAbrirModal(record)}>Responder</Button>
        </Space>
      )
    }
  ];

  const handleAbrirModal = (ticket) => {
    if (ticket.estado === 'Cerrado') {
      message.error('Para responder a este ticket, cambia su estado a "Abierto" o "En progreso"');
    } else {
      setTicketSeleccionado(ticket);
      setModalVisible(true);
    }
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
    setRespuesta('');
    setTicketSeleccionado(null);
  };

  const handleCambiarEstado = async (record, nuevoEstado) => {
    try {
      // Verifica si hay una respuesta antes de cambiar el estado a "Cerrado"
      if (nuevoEstado === 'Cerrado' && !record.respuesta) {
        message.error('No puedes cerrar el ticket sin una respuesta');
        return;
      }
  
      const response = await axios.post(`http://localhost:3000/api/responderTicket/${record._id}`, { estado: nuevoEstado });
  
      if (response.status === 200) {
        message.success('Estado del ticket actualizado');
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket._id === record._id ? { ...ticket, estado: nuevoEstado } : ticket
          )
        );
      } else {
        message.error(`Error al actualizar el estado del ticket: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error al actualizar el estado del ticket:', error);
      message.error('Error al actualizar el estado del ticket, inténtalo más tarde');
    }
  };

  const handleResponder = async () => {
    try {
      const body = {
        respuesta,
        estado: ticketSeleccionado.estado,
      };
  
      const response = await axios.post(`http://localhost:3000/api/responderTicket/${ticketSeleccionado._id}`, body);
  
      if (response.status === 200) {
        const updatedTicketsData = await axios.get('http://localhost:3000/api/recibirTicket');
        setTickets(updatedTicketsData.data);
  
        message.success('Ticket respondido correctamente');
        handleCerrarModal();
      } else {
        message.error(`Error al responder al ticket: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error al responder al ticket:', error);
      message.error('Error al responder al ticket, inténtalo más tarde');
    }
  };

  const rowClassName = (record) => {
    const estadoClass = record.estado.toLowerCase().replace(/\s+/g, '_');
    return `row-${estadoClass}`;
  };

  return (
    <div className='tablasAdmin'>
      <h2>Tickets soporte técnico</h2>
      <Divider />
      <Table dataSource={tickets} columns={columns} rowClassName={rowClassName} />
      <Modal
        title={`Responder a ${ticketSeleccionado?.titulo || ''}`}
        open={modalVisible && ticketSeleccionado && ticketSeleccionado.estado !== 'Cerrado'}
        onCancel={handleCerrarModal}
        onOk={handleResponder}
      >
        <p>Fecha de creación: <FechaFormateada timestamp={ticketSeleccionado?.fecha} /></p>
        {ticketSeleccionado?.fechaRespuesta && (
          <p>Fecha ultima respuesta: <FechaFormateada timestamp={ticketSeleccionado?.fechaRespuesta} /></p>
        )}
        <Input.TextArea
          rows={4}
          placeholder="Escribe tu respuesta aquí"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default TicketsAdmin;
