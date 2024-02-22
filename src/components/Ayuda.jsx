import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
const Ayuda = () => (
  <>
    <FloatButton
      icon={<QuestionCircleOutlined />}
      type="default"
      style={{
        right: 24,
      }}
    />
  </>
);
export default Ayuda;