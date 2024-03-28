import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Select, notification, Modal, Divider, message } from "antd";
import { useDispatch } from "react-redux";
import { setUserData } from '../store/user/userSlice';
import { useFetch } from "../useHooks/useFetch";
import { useGetUser } from '../store/user/userSelectors';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FechaFormateada from "../components/Customs/FechaFormateada";
import EstadoTicket from "../components/Tickets/EstadoTickets";
import { EuroCircleOutlined, HeartOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons";

const Perfil = () => {
  const dispatch = useDispatch();
  const userData = useGetUser();
  const navigate = useNavigate();
  const [tiposDevia, setTiposDevia] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [recargarModalVisible, setRecargarModalVisible] = useState(false);
  const [montoRecarga, setMontoRecarga] = useState(0);

  useEffect(() => {
    if (!userData) {
      navigate('/');
    }
  }, [userData, navigate]);

  if (!userData) {
    return message.error("Debes iniciar sesión para entrar en tu perfil");
  }

  const openNotification = (type, message) => {
    notification[type]({
      message,
      duration: 1,
    });
  };

  const idUsuario = userData.id;

  const { data: tipoViaData } = useFetch(`http://localhost:3000/api/tiposdevias`);
  useEffect(() => {
    if (tipoViaData) setTiposDevia(tipoViaData);
  }, [tipoViaData]);

  const { data: datosTicket } = useFetch('http://localhost:3000/api/recibirTicket');
  useEffect(() => {
    if (datosTicket) {
      const userTickets = datosTicket.filter(ticket => ticket.idUsuario === idUsuario);
      setTickets(userTickets);
    }
  }, [datosTicket, idUsuario]);

  const handleRecargarSaldo = async () => {
    try {
      // Validar que el monto de recarga sea mayor que cero
      if (montoRecarga <= 0) {
        openNotification('error', 'El monto de recarga debe ser mayor que cero');
        return;
      }

      // Manejar el caso en que el usuario no esté autenticado
      if (!userData) {
        openNotification('error', 'Debes iniciar sesión para recargar saldo');
        return;
      }

      // Realizar la recarga de saldo
      await axios.post(`http://localhost:3000/api/monedero/${userData.id}`, { monedero: montoRecarga });

      // Obtener el saldo actualizado después de la compra
      const updatedUserData = await axios.get(`http://localhost:3000/api/getmonedero/${userData.id}`);

      // Actualizar los datos del usuario en el estado global
      dispatch(setUserData(updatedUserData.data));

      // Restablecer el monto de recarga y ocultar el modal
      setMontoRecarga(0);
      setRecargarModalVisible(false);

      // Notificar al usuario que la recarga de saldo fue exitosa
      openNotification('success', 'Saldo recargado correctamente');
    } catch (error) {
      // Manejar el caso en que la recarga de saldo no sea exitosa
      console.error('Error al recargar saldo:', error.message);
      openNotification('error', 'Error al recargar saldo');
    }
  };

  const onFinish = async (values) => {
    if (userData && userData.id) {
      try {
        const response = await axios.put(`http://localhost:3000/api/users/${userData.id}`, {
          ...values,
          username: values.nombre,
        });
        dispatch(setUserData(values));
        openNotification('success', 'Usuario actualizado correctamente');
      } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
        openNotification('error', 'Error al actualizar usuario');
      }
    } else {
      console.error('Error');
    }
  };

  const handleOpenModal = (ticket) => {
    setSelectedTicket(ticket);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTicket(null);
  };

  return (
    <div className="tablasPerfil" style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h1>Perfil de {userData.nombre ? userData.nombre : 'Usuario sin nombre'}</h1>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 12 }}
          onFinish={onFinish}
          initialValues={{ nombre: userData.nombre, tipoVia: userData.tipoVia, direccion: userData.direccion }}
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
      <div className="tarjetasPerfil" style={{ flex: 1, display: 'flex', justifyContent: 'space-evenly' }}>
        <div className="tarjeta1">
          <Card title={<span><UserOutlined /> Tus datos</span>} style={{ width: '300px' }}>
            <p>Nombre: {userData.nombre}</p>
            <p>Dirección: {userData.direccion}</p>
            <p>Tipo de vía: {userData.tipoVia}</p>
            <p>Email: {userData.email}</p>
          </Card>
        </div>
        <div className="tarjeta2">
          <Card title={<span><SolutionOutlined /> Tus tickets de soporte</span>} style={{ width: '300px' }}>
            {tickets.length === 0 ? (
              <p>No tienes ningún ticket actualmente.</p>
            ) : (
              tickets.map((ticket) => (
                <div key={ticket.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <p><FechaFormateada timestamp={ticket.fecha} /></p>
                  <Button type="primary" onClick={() => handleOpenModal(ticket)}>
                    Ver Detalles
                  </Button>
                  <Divider />
                </div>
              ))
            )}
          </Card>
        </div>
        <div className="tarjeta3">
          <Card
            title={
              <span>
                <EuroCircleOutlined /> Tu saldo
              </span>
            }
            style={{ width: '300px' }}
          >
            <p>Tu saldo actual es de: {userData.monedero.toFixed(2)} €</p>
            <Button type="primary" onClick={() => setRecargarModalVisible(true)}>
              Recargar Saldo
            </Button>
          </Card>
        </div>
        <Card
          title={
            <span>
              <HeartOutlined /> Productos favoritos
            </span>
          }
          style={{ width: '300px' }}
        >
          {userData.productosFavoritos.map((producto) => (
            <div key={producto._id}>
              <img src={`data:image/jpeg;base64, ${producto.imagen}`} alt={producto.descripcion} style={{ width: '100px', height: '100px' }} />
              <p>Nombre: {producto.descripcion}</p>
              <p>Precio: {producto.precio.toFixed(2)} €</p>
              <Divider />
            </div>
          ))}
        </Card>
      </div>
      <Modal
        title="Detalles del Ticket"
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedTicket && (
          <>
            <p>
              <EstadoTicket estado={selectedTicket.estado} />
              {selectedTicket.estado}
            </p>
            <p>Fecha: <FechaFormateada timestamp={selectedTicket.fecha} /></p>
            <Divider />
            <p>Titulo: {selectedTicket.titulo}</p>
            <p>Descripcion: {selectedTicket.descripcion}</p>
            <Divider />
            <strong>
              Respuesta soporte técnico:
              {selectedTicket.fechaRespuesta ? (
                <FechaFormateada timestamp={selectedTicket.fechaRespuesta} />
              ) : (
                <span style={{ color: 'red' }}> Sin fecha de respuesta</span>
              )}
            </strong>
            <p>{selectedTicket.respuesta ? selectedTicket.respuesta : <span style={{ color: 'red' }}>El agente de soporte aun no ha respondido</span>}</p>
          </>
        )}
      </Modal>
      <Modal
        title="Recargar Saldo"
        open={recargarModalVisible}
        onCancel={() => setRecargarModalVisible(false)}
        onOk={handleRecargarSaldo}
      >
        <Form.Item label="Monto a recargar">
          <Input
            value={montoRecarga}
            onChange={(e) => setMontoRecarga(parseFloat(e.target.value))}
            type="number"
            min={0}
            step={0.01}
            autoFocus
          />
        </Form.Item>
      </Modal>
    </div>
  );
};

export default Perfil;
