import { useState, useEffect } from 'react';
import { Button, Col, Divider, Pagination, Row } from 'antd';
import imagen from '../assets/img/placaBase3.png';
import SkeletonComponent from './Skeleton/Skeleton';

const TipoProducto = ({ id, imagenSrc, descripcion, precio, AgregarAlCarrito }) => (
    <div style={{ borderRadius: '20px', textAlign: 'center' }}>
      <img
        src={imagenSrc}
        alt="Descripción de la imagen"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <p>{descripcion}</p>
      <p>Precio: {precio}</p>
      <Button type='primary' ghost onClick={() => AgregarAlCarrito({ id, descripcion, precio })}>
        Agregar al carrito
      </Button>
    </div>
  );

const Grid = ({ agregarAlCarrito }) => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  console.log("agregarAlCarrito in Grid:", agregarAlCarrito);

  useEffect(() => {

    setTimeout(() => setShowSkeleton(false), 2000);

  }, [])
  const productos = [
    { id: 1, imagenSrc: imagen, descripcion: 'Asus ge476',  precio: '100€' },
    { id: 2, imagenSrc: imagen, descripcion: 'Asus ml2td3', precio: '150€' },
    { id: 3, imagenSrc: imagen, descripcion: 'Asus ge476',  precio: '120€' },
    { id: 4, imagenSrc: imagen, descripcion: 'Asus ml2td3', precio: '150€' },
    { id: 5, imagenSrc: imagen, descripcion: 'Asus ge476',  precio: '400€' },
    { id: 6, imagenSrc: imagen, descripcion: 'Asus ml2td3', precio: '150€' },
    { id: 7, imagenSrc: imagen, descripcion: 'Asus ge476',  precio: '200€' },
    { id: 8, imagenSrc: imagen, descripcion: 'Asus ge476',  precio: '350€' },
  ];

  const itemsPerPage = 4;
  const totalItems = productos.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = productos.slice(startIndex, endIndex);

  return (
    <div className='Grid'>
      <br />
      <div>
        {showSkeleton ?
          <SkeletonComponent /> :
          <div>
            <Row gutter={[32, 32]}>
              {currentProducts.map((producto, index) => (
                <Col span={6} key={index}>
                  <TipoProducto {...producto} AgregarAlCarrito={agregarAlCarrito} />
                </Col>
              ))}
            </Row>
          </div>
        }
      </div>
      <div>
        <Divider />
        <Pagination
          total={totalItems}
          pageSize={itemsPerPage}
          current={currentPage}
          onChange={handleChangePage}
          showSizeChanger={false}
          style={{ textAlign: 'center', marginTop: '20px' }}
        />
      </div>
    </div>
  );
};

export default Grid;
