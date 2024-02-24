import React, { useState } from 'react';
import { Button, Input, Menu } from 'antd';
import {
  UsbOutlined,
  BuildOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  InboxOutlined
} from '@ant-design/icons';

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
    getItem('Inicio', '0', <HomeOutlined />),
    getItem('Todo', '1', <InboxOutlined />),
    getItem('Componentes', 'sub1', <BuildOutlined />, [
    getItem('Placas base', '2'),
    getItem('T.Gráficas', '3'),
    getItem('Discos duros', '4'),
    getItem('Procesadores', '5'),
  ]),
    getItem('Accesorios', 'sub2', <UsbOutlined />, [
    getItem('Teclados', '6'),
    getItem('Ratones', '7'),
    getItem('Pantallas', '8'),
    getItem('Otros', 'sub3', null, [getItem('Cables', '9'), getItem('Usb', '10')]),
  ]),
];

const Selector = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

 const seleccionMenu = ({ key }) => {
  switch (key) {
    case '0':
      window.location.href = '/';
      break;
    case '1':
      window.location.href = '/Piezas';
      break;
    case '2':
      window.location.href = '/Motherboards';
      break;
    default:
      break;
  }
};

  return (
    <div
      style={{
        width: 256,
      }}
    >
      <Button
        type=""
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
          color: "black",
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      {collapsed ? null : (
        <Input.Search placeholder='Buscar...' style={{ marginBottom: 16, marginLeft: '2em' }} />
      )}
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        mode="inline"
        theme="white"
        inlineCollapsed={collapsed}
        items={items}
        onSelect={seleccionMenu}
      />
    </div>
  );
};

export default Selector;
