import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Divider, Pagination, Row, Modal, Rate, Input, Tooltip, List } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import SkeletonComponent from './Skeleton/Skeleton';
import { useDispatch } from 'react-redux';
import { addItem } from '../featues/cartSlice';
import axios from 'axios';
import imagenPorDefecto from '../assets/img/imagenrota.jpg';

const TipoArticulo = ({ id, imagen, descripcion, precio, agregarAlCarrito }) => {
  const [imagenError, setImagenError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [comentarios, setComentarios] = useState('');
  const [valoracion, setValoracion] = useState(0);
  const [valoracionesUsuarios, setValoracionesUsuarios] = useState([
    { usuario: 'Usuario1', valoracion: 4, comentario: 'Buen producto' },
    { usuario: 'Usuario2', valoracion: 5, comentario: 'Excelente calidad' },
  ]);

  const desc = ['Terrible', 'Malo', 'Normal', 'Bueno', 'Excelente'];
  const [value, setValue] = useState(3);

  const handleImagenError = () => {
    setImagenError(true);
  };

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito({ id, descripcion, precio, imagen });
  };

  const handleVerDetalles = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handlePublicarComentario = () => {
    console.log('Comentario publicado:', comentarios);
    setComentarios('');
  };

  const calcularMediaValoraciones = () => {
    const totalValoraciones = valoracionesUsuarios.length;
    const sumaValoraciones = valoracionesUsuarios.reduce((suma, { valoracion }) => suma + valoracion, 0);
    return totalValoraciones > 0 ? sumaValoraciones / totalValoraciones : 0;
  };

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <Card
        style={{ borderRadius: '20px', textAlign: 'center', height: '100%' }}
        cover={
          imagenError ? (
            <img src={imagenPorDefecto} alt="imagen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <img src={imagen} style={{ width: '350px', height: '350px' }} onError={handleImagenError} />
          )
        }
      >
        <Tooltip title="Ver detalles">
          <InfoCircleOutlined
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: '#1890ff',
              fontSize: '20px',
              cursor: 'pointer',
            }}
            onClick={handleVerDetalles}
          />
        </Tooltip>
        <Card.Meta title={descripcion} description={`Precio: ${precio}€`} />
        <Button
          type='primary'
          ghost
          onClick={handleAgregarAlCarrito}
          style={{ marginTop: '10px' }}
        >
          Agregar al carrito
        </Button>
      </Card>
      <Modal
        title={descripcion}
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="publicar" type="primary" onClick={handlePublicarComentario}>
            Publicar Comentario
          </Button>,
          <Button key="back" onClick={handleModalCancel}>
            Cerrar
          </Button>,
        ]}
      >
        <img
          src={imagenError ? imagenPorDefecto : imagen}
          alt="imagen"
          style={{ width: '50%', height: 'auto', marginBottom: 'auto', marginLeft: '25%' }}
        />
        <p><span style={{fontWeight:'bold'}} >Precio:</span> {precio}€</p>
        <Input.TextArea
          placeholder="Añade tu comentario..."
          value={comentarios}
          onChange={(e) => setComentarios(e.target.value)}
        />
        <Rate
          tooltips={desc} onChange={setValoracion} value={valoracion}
          allowHalf
          {...value ? <span>{desc[value - 1]}</span> : null}
          style={{ marginTop: '10px' }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        />
        <div style={{ marginTop: '20px' }} >
          <h4>Valora el producto!</h4>
          <Divider/>
          <h3>Comentarios de otros usuarios</h3>
          <List
            dataSource={valoracionesUsuarios}
            renderItem={(item) => (
              <List.Item>
                <Rate disabled allowHalf value={item.valoracion} style={{ marginRight: '8px' }} />
                <strong>{item.usuario}:</strong> {item.comentario}
              </List.Item>
            )}
          />
        </div>
        <Divider />
        <div>
          <h3>Media de valoraciones: {calcularMediaValoraciones().toFixed(1)}</h3>
        </div>
      </Modal>
    </>
  );
};

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
