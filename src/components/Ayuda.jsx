import React, { useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton, Modal } from 'antd';

const Ayuda = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <FloatButton
        icon={<QuestionCircleOutlined />}
        type="default"
        style={{
          right: 24,
        }}
        onClick={handleButtonClick}
      />
      <Modal
        title="¿Necesitas ayuda?"
        open={modalVisible}
        onCancel={cerrarModal}
        footer={null}
        closable={false}
      >
        <p>
          Envía un correo a{' '}
          <a href="mailto:ayuda@gmail.com">pcpiezas@gmail.com</a>
        </p>
        <p>En 24/48h tendrás una respuesta.</p>
      </Modal>
    </>
  );
};

export default Ayuda;
