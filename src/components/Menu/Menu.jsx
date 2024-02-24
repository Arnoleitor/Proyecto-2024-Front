import React from 'react';
import { Menu } from 'antd';
import { LaptopOutlined, HomeOutlined } from '@ant-design/icons';


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
                key:3,
                label: `Placas base`,
                path: '/Motherboards'
            },
            {
                key: 4,
                label: `T.Gráficas`,
            },
            {
                key: 5,
                label: `Discos duros`,
            },
            {
                key: 6,
                label: `Procesadores`,
            }
    ]
    },
    {
        key: "2",
        icon: React.createElement(LaptopOutlined),
        label: "Accesorios",
        children: [
            {
                key: 7,
                label: `Teclados`,
                path: '/Teclados'
            },
            {
                key: 8,
                label: `Ratones`,
            },
            {
                key: 9,
                label: `Pantallas`,
            },
            {
                key: 10,
                label: `Otros`,
            }
    ]
    },
]
;

const handlerMenu = (event) => {
    console.log(event)
    console.log(event.item.props.path);
    const route = event.item.props.path;
    window.location.href = route;

}

const MenuComponent = () => {
    return (
        <>
            <Menu
                mode="inline"
                defaultSelectedKeys={['0']}
                defaultOpenKeys={['1']}
                onClick={handlerMenu}
                style={{ height: '100%', borderRight: 0 }}
                items={items}
            />
        </>
    );
};

export default MenuComponent;


// getItem('Placas base', '2'),
// getItem('T.Gráficas', '3'),
// getItem('Discos duros', '4'),
// getItem('Procesadores', '5'),
// ]),
// getItem('Accesorios', 'sub2', <UsbOutlined />, [
// getItem('Teclados', '6'),
// getItem('Ratones', '7'),
// getItem('Pantallas', '8'),
// getItem('Otros', 'sub3', null, [getItem('Cables', '9'), getItem('Usb', '10')]),