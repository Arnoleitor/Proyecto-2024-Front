import { useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton, Modal, Tooltip } from 'antd';

const Help = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Tooltip title="Necesitas ayuda?" placement="left" open={true}>
        <FloatButton
          icon={<QuestionCircleOutlined />}
          type="default"
          style={{
            right: 60,
            bottom: 30
          }}
          onClick={handleButtonClick}
        />
      </Tooltip>
      <Modal
        title="¿Necesitas ayuda?"
        visible={modalVisible}
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

export default Help;
