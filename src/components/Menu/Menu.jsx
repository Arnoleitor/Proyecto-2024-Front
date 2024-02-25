import React from 'react';
import { Menu } from 'antd';
import { LaptopOutlined, HomeOutlined, AudioOutlined, UsbOutlined } from '@ant-design/icons';

const items = [
    {
        key: "0",
        icon: React.createElement(HomeOutlined),
        label: "Home",
        path: '/'
    },
    {
        key: "1",
        icon: React.createElement(LaptopOutlined),
        label: "Componentes",
        children: [
            {
                key:4,
                label: `Placas base`,
                path: '/Motherboards'
            },
            {
                key: 5,
                label: `T.Gráficas`,
                path: '/Tgraficas'
            },
            {
                key: 6,
                label: `Discos duros`,
            },
            {
                key: 7,
                label: `Procesadores`,
            }
    ]
    },
    {
        key: "2",
        icon: React.createElement(AudioOutlined),
        label: "Accesorios",
        children: [
            {
                key: 8,
                label: `Teclados`,
                path: '/Teclados'
            },
            {
                key: 9,
                label: `Ratones`,
            },
            {
                key: 10,
                label: `Pantallas`,
            },
    ]
    },{
        key: "3",
        icon: React.createElement(UsbOutlined),
        label: "Otros",
        children: [
            {
                key: 11,
                label: `Usb`,
            },
            {
                key: 12,
                label: `Cables`,
            },
            {
                key: 13,
                label: `Impresoras`,
            }
    ]
    },
]
;

const handlerMenu = (event) => {
    window.location.href = event.item.props.path;
}

const MenuComponent = () => {
    return (
        <>
            <Menu
                mode="inline"
                defaultSelectedKeys={['0']}
                defaultOpenKeys={['1', '2', '3']}
                onClick={handlerMenu}
                style={{ height: '100%', borderRight: 0 }}
                items={items}
            />
        </>
    );
};

export default MenuComponent;