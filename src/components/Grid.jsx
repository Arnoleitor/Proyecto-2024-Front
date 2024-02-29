import React, { useState, useEffect } from 'react';
import { Button, Col, Divider, Pagination, Row } from 'antd';
import SkeletonComponent from './Skeleton/Skeleton';
import { useDispatch } from 'react-redux';
import { addItem } from '../featues/cartSlice';
import axios from 'axios';

const TipoArticulo = ({ id, imagenSrc, descripcion, precio, agregarAlCarrito }) => (
  <div style={{ borderRadius: '20px', textAlign: 'center' }}>
    <img
      src={imagenSrc}
      alt="Descripción de la imagen"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
    <p>{descripcion}</p>
    <p>Precio: {precio}€</p>
    <Button type='primary' ghost onClick={() => agregarAlCarrito({ id, descripcion, precio, imagenSrc })}>
      Agregar al carrito
    </Button>
  </div>
);

const Grid = () => {
  const dispatch = useDispatch();
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/recibirProducto');
        setProductos(response.data);
        setShowSkeleton(false);
      } catch (error) {
        console.error('Error al obtener productos:', error.message);
      }
    };

    fetchProductos();
  }, []);

  const itemsPerPage = 4;
  const totalItems = productos.length;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);

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
        {showSkeleton ? (
          <SkeletonComponent />
        ) : (
          <div>
            <Row gutter={[32, 32]}>
              {currentProducts.map((producto, index) => (
                <Col span={6} key={index}>
                  <TipoArticulo {...producto} agregarAlCarrito={() => dispatch(addItem(producto))} />
                </Col>
              ))}
            </Row>
          </div>
        )}
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
