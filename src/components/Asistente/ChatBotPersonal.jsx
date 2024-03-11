import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { FloatButton, Modal, Tooltip } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import pasos from './pasosConfig';

const theme = {
  background: '#f5f8fb',
  headerBgColor: '#22C3FF',
  headerFrontColor: '#fff',
  headerFontSize: '20px',
  botBubbleColor: '#22C3FF',
  botFontColor: '#fff',
  userBuubbleColor: '#0cb3c9',
  userFontColor: '#0cb3c9',
};

const ChatBotPersonal = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='chatBot'>
        <Tooltip title="Chatea con nuestro Asistente" placement="left" open={true}>
          <FloatButton
          style={{
            right: 60,
            bottom: 100
          }}
            type="default"
            shape="circle"
            size="large"
            icon={<MessageOutlined />}
            onClick={showModal}
          />
        </Tooltip>
        <Modal
          style={{display:'flex', justifyContent:'center'}}
          open={visible}
          onCancel={handleCancel}
          footer={null}
          closable={false}
        >
          <ChatBot
            placeholder="Escribe aquí tu nombre..."
            speechSynthesis={{ enable: true, lang: 'es', voices: true }}
            steps={pasos}
          />
        </Modal>
      </div>
    </ThemeProvider>
  );
};

export default ChatBotPersonal;
