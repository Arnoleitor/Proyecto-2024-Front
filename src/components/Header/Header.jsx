import React, { useState } from 'react';
import { BarsOutlined } from "@ant-design/icons";
import { Modal, Button, Menu, Dropdown, Typography } from 'antd';
import Carrito from "../Carrito";
import Login from "../../components/Auth/Login";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearUserData } from '../../store/user/userSlice';
import { clearCart } from '../../store/cart/cartSlice';
import logo from '../../assets/img/LogoFactura-removebg-preview.png';
import TicketForm from '../Tickets/Tickets';


const { Text } = Typography;

const HeaderComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [ticketFormVisible, setTicketFormVisible] = useState(false);
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setModalVisible(true);
    setLogoutVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setLogoutVisible(false);
  };

  const handleLogout = () => {
    dispatch(clearUserData());
    dispatch(clearCart());
    setLogoutVisible(false);
    navigate('/');
  };

  const handleOpenTicketForm = () => {
    setTicketFormVisible(true);
  };

  const handleCloseTicketForm = () => {
    setTicketFormVisible(false);
  };


  const menuItems = [
    {
      key: 'miPerfil',
      label: 'Mi perfil',
      path: '/perfil',
    },
    {
      key: 'misPedidos',
      label: 'Mis pedidos',
      path: '/pedidos',
    },
  ];

  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  const userMenu = (
    <Menu>
      {menuItems.map(item => (
        <Menu.Item key={item.key} onClick={() => handleMenuItemClick(item.path)}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <div style={{ fontSize: '25px', fontFamily: 'fantasy', width: '100%' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={logo} style={{ width: '20%', marginTop: '1%', marginLeft: '12%' }} alt="Logo" />
        </Link>
      </div>
      {userData ? (
        <Dropdown overlay={userMenu} placement="bottomRight" arrow>
          <Text strong style={{ cursor: 'pointer' }}>
            {`Bienvenido, ${userData.nombre} `}
            <BarsOutlined />
          </Text>
        </Dropdown>
      ) : null}

      <Carrito />

      {userData ? (
        <>
          <Button style={{ marginLeft: '1%' }} type="primary" onClick={() => setLogoutVisible(true)}>
            Cerrar sesión
          </Button>
          {userData.role === 1 && (
            <Button type="default" danger style={{ marginLeft: '1%' }} onClick={() => navigate('/admin')}>
              Panel Admin
            </Button>
          )}
        </>
      ) : (
        <Button style={{ marginLeft: '1%' }} type="primary" onClick={handleOpenModal}>
          Iniciar sesión
        </Button>
      )}
      <Button style={{ marginLeft: '1%', backgroundColor:'orange' }} type="primary" onClick={handleOpenTicketForm}>
        Soporte
      </Button>

      <TicketForm
        visible={ticketFormVisible}
        onCreate={(values) => {
          console.log('Ticket creado:', values);
        }}
        onCancel={handleCloseTicketForm}
      />

      <Modal
        title="Iniciar sesión"
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Login />
      </Modal>

      <Modal
        title="Cerrar sesión"
        open={logoutVisible}
        onCancel={() => setLogoutVisible(false)}
        footer={
          <Button type="primary" onClick={handleLogout}>
            Confirmar
          </Button>
        }
      >
        ¿Estás seguro de que deseas cerrar sesión?
      </Modal>
    </>
  );
};

export default HeaderComponent;
