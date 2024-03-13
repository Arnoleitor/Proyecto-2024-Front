import React from 'react';
import { Carousel } from 'antd';

const ContentStyle = {
  height: '160px',
  textAlign: 'center',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const ImageStyle = {
  width: '200px',
  height: '200px',
  margin: 'auto',
  display: 'block',
};

const CarrouselOfertas = ({ productos }) => (
  <Carousel autoplay fade={true} dots={false} infinite={true}>
    {productos.map((producto) => (
      <div key={producto._id}>
        <h1 style={{ fontFamily: 'negrita', color: 'orange' }}>Productos en PCPiezas!</h1>
        <span style={{ marginLeft: '1%', fontFamily: 'negrita' }}>{producto.descripcion}<span style={{marginLeft:'5px', color:'green'}}> Por tan solo</span>
          <span style={{color:'green', marginLeft:'5px', fontSize:'20px'}}>
            {producto.tieneDescuento ? (
              <>
                <span style={{textDecoration: 'line-through', color:'red', marginRight: '5px'}}>{producto.precio.toFixed(2)}€</span>
                <span style={{fontWeight: 'bold'}}>{(producto.precio * (1 - producto.descuento / 100)).toFixed(2)}€</span>
              </>
            ) : (
              <span>{producto.precio.toFixed(2)}€</span>
            )}
          </span>
        </span>
        <div style={ContentStyle}>
          <img src={`${producto.imagen}`} style={ImageStyle} />
        </div>
      </div>
    ))}
  </Carousel>
);

export default CarrouselOfertas;
