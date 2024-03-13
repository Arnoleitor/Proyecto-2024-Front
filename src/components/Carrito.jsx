import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, List, Modal, Avatar, Tooltip, message, Empty } from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  LoadingOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { removeItem, incrementItemQuantity, decrementItemQuantity } from '../store/cart/cartSlice';
import axios from 'axios';
import { clearCart } from '../store/cart/cartSlice';
import { useGetCart } from '../store/cart/cartSelectors';
import { useGetUser } from '../store/user/userSelectors';


const Carrito = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const articulo = useGetCart();
  const userData = useGetUser()
  
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
  
  const precioTotal = articulo.reduce((total, item) => total + parseFloat(item.precio.toFixed(2)) * item.quantity, 0);
  
  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = async () => {
    if (!userData) {
      message.warning('Debes iniciar sesión o registrarte para realizar el pago.');
      setModalVisible(false);
      return;
    }
    
    try {
      const productosConCantidad = articulo.map(({ imagen, ...rest }) => ({
        ...rest,
        cantidad: rest.quantity,  
      }));

      const direccion = `${userData.direccion}`
      
      const response = await axios.post('http://localhost:3000/api/pedidos', {
        id: userData.id,
        productos: productosConCantidad,
        totalImporte: Number(precioTotal.toFixed(2)),
        direccion,
        tipoVia: userData.tipoVia,
        descripcion: articulo.descripcion,
        precio: articulo.precio
      });
  
      if (response.status === 200) {
        showSuccessMessage('Pedido realizado con éxito');
        dispatch(clearCart());
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
        footer={articulo.length === 0 ? (
          <Empty description="Tu cesta está vacía" />
        ) : (
          <Button key="submit" type="primary" onClick={handleOk} disabled={articulo.length === 0}>
            Pagar
          </Button>
        )}
      >
        <List
          bordered
          dataSource={articulo}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.imagen} />}
                title={item.descripcion}
                description={`Precio: ${item.precio.toFixed(2)} € x ${item.quantity} = ${item.precio.toFixed(2) * item.quantity} €`}
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
