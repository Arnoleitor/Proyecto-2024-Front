import { useState, useEffect } from 'react';
import { Col, Divider, Pagination, Row } from 'antd';
import imagen from '../assets/img/placaBase3.png';
import SkeletonComponent from './Skeleton/Skeleton';

const TipoProducto = ({ imagenSrc, descripcion, precio }) => (
  <div style={{ borderRadius: '20px', textAlign: 'center' }}>
    <img
      src={imagenSrc}
      alt="Descripción de la imagen"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
    <p>{descripcion}</p>
    <p >Precio: {precio}</p>
  </div>
);

const Grid = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {

    setTimeout(() => setShowSkeleton(false), 2000);

  }, [])
  const productos = [
    { imagenSrc: imagen, descripcion: <span style={{ fontFamily: 'fantasy' }}>'Asus ge476'</span>, precio: '100€' },
    { imagenSrc: imagen, descripcion: <span style={{ fontFamily: 'fantasy' }}>'Asus ml2td3'</span>, precio: '150€' },
    { imagenSrc: imagen, descripcion: <span style={{ fontFamily: 'fantasy' }}>'Asus ge476'</span>, precio: '120€' },
    { imagenSrc: imagen, descripcion: <span style={{ fontFamily: 'fantasy' }}>'Asus ml2td3'</span>, precio: '150€' },
    { imagenSrc: imagen, descripcion: <span style={{ fontFamily: 'fantasy' }}>'Asus ge476'</span>, precio: '400€' },
    { imagenSrc: imagen, descripcion: <span style={{ fontFamily: 'fantasy' }}>'Asus ml2td3'</span>, precio: '150€' },
    { imagenSrc: imagen, descripcion: <span style={{ fontFamily: 'fantasy' }}>'Asus ge476'</span>, precio: '200€' },
    { imagenSrc: imagen, descripcion: <span style={{ fontFamily: 'fantasy' }}>'Asus ge476'</span>, precio: '350€' },
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
                  <TipoProducto {...producto} />
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
