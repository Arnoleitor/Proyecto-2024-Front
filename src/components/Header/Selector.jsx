import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Inicio', '1', <PieChartOutlined />),
  getItem('Componentes', 'sub1', <MailOutlined />, [
    getItem('Placas base', '5'),
    getItem('T.Gráficas', '6'),
    getItem('Discos duros', '7'),
    getItem('Procesadores', '8'),
  ]),
  getItem('Accesorios', 'sub2', <AppstoreOutlined />, [
    getItem('Teclados', '9'),
    getItem('Ratones', '10'),
    getItem('Pantallas', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
];
const Selector = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      style={{
        width: 256,
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="white"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
export default Selector;