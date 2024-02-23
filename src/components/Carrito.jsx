import React, { useState } from 'react';
import { Button, List, Modal, Avatar } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const Carrito = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Producto 1', price: 20 },
    { id: 2, name: 'Producto 2', price: 30 },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const handleRemoveFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

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
      <Button icon={<ShoppingCartOutlined />} onClick={showModal}>
        Árticulos ({cartItems.length})
      </Button>

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
          dataSource={cartItems}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="imagen_del_producto" />}
                title={item.name}
                description={`Precio: ${item.price} €`}
              />
              <Button onClick={() => handleRemoveFromCart(item.id)} type="danger" size="small">
                Quitar
              </Button>
            </List.Item>
          )}
        />
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <strong>Total: {totalPrice} €</strong>
        </div>
      </Modal>
    </div>
  );
};

export default Carrito;
