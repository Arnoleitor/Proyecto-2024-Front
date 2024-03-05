import React from 'react';
import { Menu } from 'antd';
import { LaptopOutlined, HomeOutlined, AudioOutlined, UsbOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

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
                path: '/DiscosDuros'
            },
            {
                key: 7,
                label: `Procesadores`,
                path: '/Procesadores'
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
                path: '/Ratones'
            },
            {
                key: 10,
                label: `Pantallas`,
                path: '/Pantallas'
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
                path: '/Usb'
            },
            {
                key: 12,
                label: `Cables`,
                path: '/Cables'
            },
            {
                key: 13,
                label: `Impresoras`,
                path: '/Impresoras'
            }
    ]
    },
]
;

const MenuComponent = () => {
    const navigate = useNavigate();

    const handlerMenu = (event) => {
        const path = event.item.props.path;
        navigate(path); 
    }

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