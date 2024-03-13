import React, { useState } from 'react';
import { Button, Card, Col, Divider, Pagination, Row, Modal, Rate, Input, Tooltip, List, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import SkeletonComponent from './Skeleton/Skeleton';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cart/cartSlice';
import axios from 'axios';
import imagenPorDefecto from '../assets/img/imagenrota.jpg';
import { useSelector } from "react-redux";

const TipoArticulo = ({ _id, imagen, descripcion, precio, agregarAlCarrito }) => {

  const [imagenError, setImagenError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [valoracion, setValoracion] = useState(0);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [comentarioRequerido, setComentarioRequerido] = useState(false);
  const [valoracionRequerida, setValoracionRequerida] = useState(false);
  const userData = useSelector((state) => state.user);

  const desc = ['Terrible', 'Malo', 'Normal', 'Bueno', 'Excelente'];

  const handleImagenError = () => {
    setImagenError(true);
  };

  const handleAgregarAlCarrito = () => {
    agregarAlCarrito({ _id, descripcion, precio, imagen });
  };

  const handleVerDetalles = () => {
    fetchComentarios()
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const comentariosPublicados = useSelector((state) => state.comentarios?.[_id] || new Set());

  const fetchComentarios = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/comentariosPorId/?idProducto=${_id}`);
      setComentarios(response.data);
    } catch (error) {
      console.error('Error al obtener comentarios:', error.message);
    }
  };

  const handlePublicarComentario = async () => {
    if (nuevoComentario && valoracion) {
      try {
        if (!comentariosPublicados.has(userData.id)) {
          const response = await axios.post('http://localhost:3000/api/comentarios', {
            idProducto: _id,
            comentario: nuevoComentario,
            valoracion: valoracion,
            nombreUsuario: userData.nombre,
            idUsuario: userData.id
          });
          if(response.data.error){
            message.error(response.data.error)
            return
          }
          setComentarioRequerido(false);
          setValoracionRequerida(false);
          setComentarios([...comentarios, response.data]);          
          setNuevoComentario("");
        }
      } catch (error) {
        console.error('Error al publicar comentario:', error.message);
      }
    } else {
      setComentarioRequerido(!nuevoComentario);
      setValoracionRequerida(!valoracion);
    }
  };

  const calcularMediaValoraciones = () => {
    const totalValoraciones = comentarios.length;
    const sumaValoraciones = comentarios.reduce((suma, { valoracion }) => suma + valoracion, 0);
    return totalValoraciones > 0 ? sumaValoraciones / totalValoraciones : 0;
  };

  
  return (
    <>
      <Card
        style={{ borderRadius: '20px', textAlign: 'center', height: '100%', fontFamily:'basica' }}
        cover={
          imagenError ? (
            <img src={imagenPorDefecto} alt="imagen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <img src={imagen} style={{ width: '200px', height: '180px' }} onError={handleImagenError} />
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
          style={{ marginTop: '20px' }}
        >
          Agregar al carrito
        </Button>
      </Card>
      <Modal
        closable={false}
        title={descripcion}
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="publicar" type="primary" onClick={handlePublicarComentario}>
            Publicar Comentario
          </Button>
        ]}
      >
        <img
          src={imagenError ? imagenPorDefecto : imagen}
          alt="imagen"
          style={{ width: '50%', height: 'auto', marginBottom: 'auto', marginLeft: '25%' }}
        />
        <p><span style={{ fontWeight: 'bold' }} >Precio:</span> {precio}€</p>
        <Input.TextArea
          placeholder="Añade tu comentario..."
          value={nuevoComentario}
          onChange={(e) => setNuevoComentario(e.target.value)}
          style={{ borderColor: comentarioRequerido ? 'red' : '' }}
        />
        <Rate
          tooltips={desc} onChange={setValoracion} value={valoracion}
          allowHalf
          style={{ marginTop: '10px', borderColor: valoracionRequerida ? 'red' : '' }}
        />
        {comentarioRequerido && <p style={{ color: 'red' }}>El comentario es obligatorio.</p>}
        {valoracionRequerida && <p style={{ color: 'red' }}>La valoración es obligatoria.</p>}

        <div style={{ marginTop: '20px' }} >
          <h4>Valora el producto!</h4>
          <Divider />
          <h3>Comentarios de otros usuarios</h3>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <List
              dataSource={comentarios}
              renderItem={(item) => (
                <List.Item>
                  <Rate disabled allowHalf value={item.valoracion} style={{ marginRight: '8px' }} />
                  <strong>{item.nombreUsuario}:</strong> {item.comentario}
                </List.Item>
              )}
            />
          </div>
        </div>
        <Divider />
        <div>
          <h3>Media de valoraciones: {calcularMediaValoraciones().toFixed(1)}</h3>
        </div>
      </Modal>
    </>
  );
};

const Grid = ({productos}) => {
  const totalItems = productos.length;
  const dispatch = useDispatch();
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
