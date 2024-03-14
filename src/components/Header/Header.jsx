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
    <div className='header'>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={logo} alt="Logo" className='logo'/>
        </Link>
      <div className='botonesHeader'>
        <div className='menuPerfil'>
        {userData ? (
          <Dropdown overlay={userMenu} placement="bottomRight" arrow>
            <Text strong style={{ cursor: 'pointer' }}>
              {`Bienvenido, ${userData.nombre} `}
              <BarsOutlined />
            </Text>
          </Dropdown>
        ) : null}
  
        <Carrito />
        </div>
  
        {userData ? (
          <>
            <Button type="primary" onClick={() => setLogoutVisible(true)}>
              Cerrar sesión
            </Button>
            {userData.role === 1 && (
              <Button type="default" danger onClick={() => navigate('/admin')}>
                Panel Admin
              </Button>
            )}
          </>
        ) : (
          <Button type="primary" onClick={handleOpenModal}>
            Iniciar sesión
          </Button>
        )}
        {userData && userData.role === 2 ? 
          <Button style={{ backgroundColor:'#FF993A' }} type="primary" onClick={handleOpenTicketForm}>
            Soporte
          </Button>
          : <></>}
      </div>
      <TicketForm
        visible={ticketFormVisible}
        onCreate={(values) => {
          console.log('Ticket creado:', values);
          setTicketFormVisible(false)
        }}
        onCancel={handleCloseTicketForm}
      />
  
      <Modal
        title="Iniciar sesión"
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Login handleCloseModal={handleCloseModal} />
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
    </div>
  );
  
  
};

export default HeaderComponent;
