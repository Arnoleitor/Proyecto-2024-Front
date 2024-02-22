import React, { useState } from 'react';
import { Button, Input, Menu } from 'antd';

import {
  UsbOutlined,
  BuildOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
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
  { label: (<Input.Search placeholder='Buscar...' />), key: "Buscar" },
    getItem('Inicio', '1', <HomeOutlined />),
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
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="white"
        inlineCollapsed={collapsed}
        items={items}
        onClick={(info) => {
          console.log(info.key)
        }}
      />
    </div>
  );
};
export default Selector;