import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, List, Modal, Avatar, Tooltip, Steps, message } from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  LoadingOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import imagen from '../assets/img/procesador.webp';
import { removeItem, incrementItemQuantity, decrementItemQuantity } from '../featues/cartSlice';

const { Step } = Steps;

const Carrito = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pasoActual, setPasoActual] = useState(0);
  const dispatch = useDispatch();
  const articulo = useSelector((state) => state.cart.items);

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

  const handleOk = () => {
    setPasoActual(2);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const showSuccessMessage = (text) => {
    message.success(text);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title={`Total: ${precioTotal} € IVA inc`} placement="bottom">
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
                avatar={<Avatar src={imagen} />}
                title={item.descripcion}
                description={`Precio: ${item.precio} € x ${item.quantity} = ${item.precio * item.quantity} €`}
              />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  onClick={() => incrementarCantidad(item.id)}
                  type="primary"
                  ghost
                  size="small"
                  style={{ marginRight: '8px', width: '24px' }}
                >
                  +
                </Button>
                <Button
                  onClick={() => decrementarCantidad(item.id)}
                  type="primary"
                  ghost
                  size="small"
                  style={{ marginRight: '8px', width: '24px' }}
                >
                  -
                </Button>
                <Button
                  onClick={() => borrarArticulo(item.id)}
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
          <strong>Total: {precioTotal} € IVA inc.</strong>
        </div>
      </Modal>
    </div>
  );
};

export default Carrito;
