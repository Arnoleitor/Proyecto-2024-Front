import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, List, Modal, Avatar, Tooltip, Steps, message } from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  LoadingOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { removeItem, incrementItemQuantity, decrementItemQuantity } from '../featues/cartSlice';
import { setUserData } from '../featues/userSlice ';
import axios from 'axios';

const { Step } = Steps;

const Carrito = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pasoActual, setPasoActual] = useState(0);
  const dispatch = useDispatch();
  const articulo = useSelector((state) => state.cart.items);
  const userData = useSelector((state) => state.user);

  const incrementarCantidad = (itemId) => {
    dispatch(incrementItemQuantity(itemId));
  };

  const decrementarCantidad = (itemId) => {
    dispatch(decrementItemQuantity(itemId));
  };

  const borrarArticulo = (itemId) => {
    dispatch(removeItem(itemId));
    showSuccessMessage('Producto eliminado del carrito');
  };

  const precioTotal = articulo.reduce((total, item) => total + parseFloat(item.precio) * item.quantity, 0);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = async () => {
    setPasoActual(2);
    setModalVisible(true);
    try {
      const productosSinImagen = articulo.map(({ imagen, ...rest }) => rest);
  
      const response = await axios.post('http://localhost:3000/api/pedidos', {
        id: userData.id,
        productos: productosSinImagen,
        totalImporte: Number(precioTotal.toFixed(2)),
      });
  
      if (response.status === 200) {
        showSuccessMessage('Pedido realizado con éxito');
      } else {
        console.error('Error creating order:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating order:', error.message);
    } finally {
      setModalVisible(false);
    }
  };
  

  const handleCancel = () => {
    setModalVisible(false);
  };

  const showSuccessMessage = (text) => {
    message.success(text);
  };
  

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title={`Total: ${precioTotal.toFixed(2)} € IVA inc`} placement="bottom">
        <Button icon={<ShoppingCartOutlined />} onClick={showModal}>
          Mi cesta
          <span className="circuloCesta">{articulo.length}</span>
        </Button>
      </Tooltip>

      <Modal
        title="Mi cesta"
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
        {pasoActual >= 2 && (
          <Steps current={pasoActual - 2} style={{ marginBottom: '20px' }}>
            <Step title="Login" icon={<UserOutlined />} />
            <Step title="Pago" icon={<LoadingOutlined />} />
            <Step title="Completado" icon={<SmileOutlined />} />
          </Steps>
        )}

        <List
          bordered
          dataSource={articulo}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.imagen} />}
                title={item.descripcion}
                description={`Precio: ${item.precio} € x ${item.quantity} = ${item.precio * item.quantity} €`}
              />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  onClick={() => incrementarCantidad(item._id)}
                  type="primary"
                  ghost
                  size="small"
                  style={{ marginRight: '8px', width: '24px' }}
                >
                  +
                </Button>
                <Button
                  onClick={() => decrementarCantidad(item._id)}
                  type="primary"
                  ghost
                  size="small"
                  style={{ marginRight: '8px', width: '24px' }}
                >
                  -
                </Button>
                <Button
                  onClick={() => borrarArticulo(item._id)}
                  type="primary"
                  danger
                  ghost
                  size="small"
                >
                  Quitar
                </Button>
              </div>
            </List.Item>
          )}
        />
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <strong>Total: {precioTotal.toFixed(2)} € IVA inc.</strong>
        </div>
      </Modal>
    </div>
  );
};

export default Carrito;
