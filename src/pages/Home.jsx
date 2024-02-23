import React from 'react';
import { ToolOutlined } from '@ant-design/icons';
import Carrito from '../components/Carrito';

const Home = () => {
  return (
    <>
      <div className='home'>
        <div>
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
        <div>
          <Carrito />
        </div>
      </div>
    </>
  );
};

export default Home;
