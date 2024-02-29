import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UsbOutlined } from "@ant-design/icons";
import { Modal, Button } from 'antd';
import Carrito from "../Carrito";
import Login from "../../components/Auth/Login";
import { Typography } from 'antd';
import { useSelector } from 'react-redux';

const { Text } = Typography;

const HeaderComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const userData = useSelector((state) => state.user);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div style={{ fontSize: '25px', fontFamily: 'fantasy', width: '100%'}}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span style={{ fontSize: '35px'}}>PC Piezas</span>
        </Link>
        <UsbOutlined style={{ marginLeft: '2%' }} />Tu tienda de componentes
      </div>
      <Text strong>{userData ? `Bienvenido, ${userData.nombre}!` : ''}</Text>
      <Carrito />

      <Button style={{ marginLeft: '1%' }} type="primary" onClick={handleOpenModal}>
        Iniciar sesión
      </Button>

      {userData && userData.role === 1 && (
        <Link to="/admin">
          <Button type="default" danger style={{ marginLeft: '2%' }}>
            Panel Admin
          </Button>
        </Link>
      )}

      <Modal
        title="Iniciar sesión"
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Login />
      </Modal>
    </>
  );
};

export default HeaderComponent;
