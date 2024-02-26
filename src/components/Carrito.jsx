import { useState } from 'react';
import { Button, List, Modal, Avatar, Tooltip, Steps, Flex } from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  LoadingOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import imagen from '../assets/img/procesador.webp';

const { Step } = Steps;

const Carrito = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pasoActual, setPasoActual] = useState(0);

  const [articulo, setArticulo] = useState([
    
  ]);

  const borrarArticulo = (itemId) => {
    const actualizarArticulo = articulo.filter((item) => item.id !== itemId);
    setArticulo(actualizarArticulo);
  };

  const precioTotal = articulo.reduce((total, item) => total + item.precio, 0);

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

  return (
    <div style={{ display: 'flex', alignItems: 'center'}}>
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
                description={`Precio: ${item.precio} €`}
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
