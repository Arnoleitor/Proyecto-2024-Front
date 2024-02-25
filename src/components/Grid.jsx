import { useState, useEffect } from 'react';
import { Button, Col, Divider, Pagination, Row } from 'antd';
import imagen from '../assets/img/placaBase3.png';
import SkeletonComponent from './Skeleton/Skeleton';

const TipoProducto = ({ id, imagenSrc, descripcion, precio, agregarAlCarrito }) => (
  <div style={{ borderRadius: '20px', textAlign: 'center' }}>
    <img
      src={imagenSrc}
      alt="Descripción de la imagen"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
    <p>{descripcion}</p>
    <p>Precio: {precio}€</p>
    <Button type='primary' ghost onClick={() => agregarAlCarrito({ id, descripcion, precio })}>
      Añadir a la cesta
    </Button>
  </div>
);
const Grid = () => {
  const [carrito, setCarrito] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const handleAgregarAlCarrito = (producto) => {
    if (!carrito.find(item => item.id === producto.id)) {
      setCarrito((prevCarrito) => [...prevCarrito, producto]);
      console.log("Producto agregado al carrito:", producto);
    } else {
      console.log("Producto ya está en el carrito.");
    }
  };

  useEffect(() => {

    setTimeout(() => setShowSkeleton(false), 2000);

  }, [])

  const productos = [
    { imagenSrc: imagen, id: 1, descripcion: <span style={{ fontFamily: 'fantasy' }}>'Asus ge476'</span>, precio: 100 },
    { imagenSrc: imagen, id: 2, descripcion: <span style={{ fontFamily: 'fantasy' }}>'Asus ml2td3'</span>, precio: 150 },
    { imagenSrc: imagen, id: 3, descripcion: <span style={{ fontFamily: 'fantasy' }}>'Asus ge476'</span>, precio: 120 },
    { imagenSrc: imagen, id: 4, descripcion: <span style={{ fontFamily: 'fantasy' }}>'Asus ml2td3'</span>, precio: 150 },
    { imagenSrc: imagen, id: 5, descripcion: <span style={{ fontFamily: 'fantasy' }}>'Asus ge476'</span>, precio: 400 },
    { imagenSrc: imagen, id: 6, descripcion: <span style={{ fontFamily: 'fantasy' }}>'Asus ml2td3'</span>, precio: 150 },
    { imagenSrc: imagen, id: 7, descripcion: <span style={{ fontFamily: 'fantasy' }}>'Asus ge476'</span>, precio: 200 },
    { imagenSrc: imagen, id: 8, descripcion: <span style={{ fontFamily: 'fantasy' }}>'Asus ge476'</span>, precio: 350 },
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
                  <TipoProducto {...producto} agregarAlCarrito={handleAgregarAlCarrito} />
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
