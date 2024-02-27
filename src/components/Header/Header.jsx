import React, { useState } from 'react';
import { UsbOutlined } from "@ant-design/icons";
import { Modal, Button } from 'antd';
import Carrito from "../Carrito";
import Login from "../../components/Auth/Login";

const HeaderComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div style={{ fontSize: '25px', fontFamily: 'fantasy', width: '100%'}}>
        <span style={{ fontSize: '35px'}}>PC Piezas</span> <UsbOutlined style={{marginLeft: '1%'}} />Tu tienda de componentes
      </div>
      <Carrito />

      <Button style={{marginLeft:'1%'}} type="primary" onClick={handleOpenModal}>
        Iniciar sesión
      </Button>

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
