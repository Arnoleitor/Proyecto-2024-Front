import React from 'react';
import { ToolOutlined } from '@ant-design/icons';
import Carrito from '../components/Carrito';
import { Divider } from 'antd';

const Home = () => {
  return (
    <>
      <div className='home'>
        <div className="titulo">
          <p>
            <span style={{ fontSize: '50px', fontFamily: 'fantasy', marginLeft: '15px' }}>
              PC Piezas
            </span>
            <ToolOutlined />
            <span style={{ fontSize: '20px', marginLeft: '1em', fontFamily: 'fantasy' }}>
              Tu tienda de componentes
            </span>
          </p>

        </div>
        <div className='carrito'>
          <Carrito />
        </div>
      </div>
      <Divider />
    </>
  );
};

export default Home;
