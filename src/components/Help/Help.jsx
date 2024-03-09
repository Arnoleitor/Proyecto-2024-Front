import React, { useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton, Modal, Tooltip } from 'antd';
import TicketForm from '../../components/Tickets/Tickets';

const Help = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ticketFormVisible, setTicketFormVisible] = useState(false);

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const showTicketForm = () => {
    setTicketFormVisible(true);
  };

  const closeTicketForm = () => {
    setTicketFormVisible(false);
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
        open={modalVisible}
        onCancel={cerrarModal}
        footer={null}
        closable={false}
      >
        <p>
          Envía un correo a{' '}
          <a href="mailto:pcpiezas@gmail.com">pcpiezas@gmail.com</a>
        </p>
        <p>En 24/48h tendrás una respuesta.</p>
        <p style={{ fontWeight: 'bolder' }}>
          También puedes mandar un
          <span
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={showTicketForm}
          >
            {' '}
            Ticket
          </span>
        </p>
      </Modal>
      <TicketForm
        visible={ticketFormVisible}
        onCancel={closeTicketForm}
        onCreate={(values) => {
          console.log('Ticket creado:', values);
          setModalVisible(false)
          setTicketFormVisible(false);
        }}
      />
    </>
  );
};

export default Help;
