import React, { useState } from 'react';
import { Button, List, Modal, Avatar, Tooltip } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import imagen from '../assets/img/procesador.webp'

const Carrito = () => {
  const [articulo, setArticulo] = useState([
    { id: 1, name: 'Producto 1', price: 20 },
    { id: 2, name: 'Producto 2', price: 30 },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const borrarArticulo = (itemId) => {
    const actualizarArticulo = articulo.filter(item => item.id !== itemId);
    setArticulo(actualizarArticulo);
  };

  const precioTotal = articulo.reduce((total, item) => total + item.price, 0);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <Tooltip title={`Total: ${precioTotal} € IVA inc`} placement="bottom">
        <Button style={{marginLeft:'15px', marginTop:'25px', marginBottom:'15px'}} icon={<ShoppingCartOutlined />} onClick={showModal}>
          Árticulos ({articulo.length})
        </Button>
      </Tooltip>

      <Modal
        title="Carrito de Compras"
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Pagar
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Cerrar
          </Button>,
        ]}
      >
        <List
          bordered
          dataSource={articulo}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={imagen} />}
                title={item.name}
                description={`Precio: ${item.price} €`}
              />
              <Button onClick={() => borrarArticulo(item.id)} type="primary" danger ghost size="small">
                Quitar
              </Button>
            </List.Item>
          )}
        />
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <strong>Total: {precioTotal} € IVA inc.</strong>
        </div>
      </Modal>
    </div>
  );
};

export default Carrito;
