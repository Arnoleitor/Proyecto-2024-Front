import React, { useState } from 'react';
import { UsbOutlined } from "@ant-design/icons";
import { Modal, Button, Menu, Dropdown, Typography } from 'antd';
import Carrito from "../Carrito";
import Login from "../../components/Auth/Login";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const { Text } = Typography;
const { SubMenu } = Menu;

const HeaderComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setModalVisible(true);
    setLogoutVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setLogoutVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("items");
    setLogoutVisible(false);
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
          <span style={{ fontSize: '35px' }}>PC Piezas</span>
        </Link>
        <UsbOutlined style={{ marginLeft: '2%' }} />Tu tienda de componentes
      </div>
      {userData ? (
        <Dropdown overlay={userMenu} placement="bottomRight" arrow>
          <Text strong style={{ cursor: 'pointer' }}>{`Bienvenido, ${userData.nombre}!`}</Text>
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
