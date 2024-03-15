import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, List, Modal, Avatar, Tooltip, message, Empty, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { removeItem, incrementItemQuantity, decrementItemQuantity } from '../store/cart/cartSlice';
import { clearCart } from '../store/cart/cartSlice';
import { useGetCart } from '../store/cart/cartSelectors';
import { useGetUser } from '../store/user/userSelectors';


const Carrito = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [precioTotalConDescuento, setPrecioTotalConDescuento] = useState(null);
  const [codigoDescuento, setCodigoDescuento] = useState('');
  const [descuento, setDescuento] = useState(null);
  const [codigo, setCodigo] = useState("");
  const dispatch = useDispatch();
  const articulo = useGetCart();
  const userData = useGetUser();

  
  const calcularPrecioTotalConDescuento = () => {
    if (descuento !== null) {
      const totalConDescuento = precioTotal - (precioTotal * descuento / 100);
      setPrecioTotalConDescuento(Number(totalConDescuento.toFixed(2)));
    }
  };

  useEffect(() => {
    calcularPrecioTotalConDescuento();
  }, [articulo, descuento]);

  const incrementarCantidad = (itemId) => {
    dispatch(incrementItemQuantity(itemId));
    calcularPrecioTotalConDescuento();
  };

  const decrementarCantidad = (itemId) => {
    dispatch(decrementItemQuantity(itemId));
    calcularPrecioTotalConDescuento();
  };

  const borrarArticulo = (itemId) => {
    dispatch(removeItem(itemId));
    calcularPrecioTotalConDescuento();
    showSuccessMessage('Producto eliminado del carrito');
  };

  const precioTotal = articulo.reduce((total, item) => total + parseFloat(item.precio.toFixed(2)) * item.quantity, 0);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const showSuccessMessage = (text) => {
    message.success(text);
  };


  const aplicarDescuento = async () => {
    if (!userData) {
      message.warning('Debes iniciar sesión o registrarte para realizar el pago.');
      setModalVisible(false);
      return;
    }
  
    // Verifica si el código de descuento está vacío
    if (!codigoDescuento) {
      // Si está vacío, no realiza ninguna acción y sale de la función
      return;
    }
  
    try {
      const responseDescuentos = await axios.get('http://localhost:3000/api/codigosDescuento');
  
      if (responseDescuentos.status === 200) {
        const codigosDescuento = responseDescuentos.data;
  
        // Busca el descuento correspondiente al código ingresado
        const descuentoEncontrado = codigosDescuento.find(descuento => descuento.codigo === codigoDescuento);
  
        if (descuentoEncontrado) {
          const porcentajeDescuento = descuentoEncontrado.descuento;
  
          // Almacena el descuento en el estado del componente
          setDescuento(porcentajeDescuento);
  
          // Almacena el código promocional en el estado del componente
          setCodigo(codigoDescuento);
  
          // Calcula el total con descuento
          const totalConDescuento = precioTotal - (precioTotal * porcentajeDescuento / 100);
  
          // Actualiza el estado con el nuevo precio total
          setPrecioTotalConDescuento(Number(totalConDescuento.toFixed(2)));
  
          message.success('Descuento aplicado con éxito');
        } else {
          message.error('Código de descuento no válido. Inténtalo de nuevo.');
        }
      } else {
        console.error('Error fetching discounts:', responseDescuentos.statusText);
        message.error('No se pudo aplicar el descuento. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error applying discount:', error.message);
    }
  };
  

  const handleOk = async () => {
    if (!userData) {
      message.warning('Debes iniciar sesión o registrarte para realizar el pago.');
      setModalVisible(false);
      return;
    }

    // Aplica el descuento antes de enviar el pedido
    await aplicarDescuento();

    try {
      const productosConCantidad = articulo.map(({ imagen, ...rest }) => ({
        ...rest,
        cantidad: rest.quantity,
      }));

      const direccion = `${userData.direccion}`;

      const response = await axios.post('http://localhost:3000/api/pedidos', {
        id: userData.id,
        productos: productosConCantidad,
        totalImporte: precioTotalConDescuento || Number(precioTotal.toFixed(2)),
        direccion,
        tipoVia: userData.tipoVia,
        descripcion: articulo.descripcion,
        precio: articulo.precio,
        descuento: descuento,
        codigo: codigo
      });

      if (response.status === 200) {
        showSuccessMessage('Pedido realizado con éxito');
        dispatch(clearCart());
        setDescuento(null);
      } else {
        console.error('Error creating order:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating order:', error.message);
    } finally {
      // Restablece el precio total con descuento después de realizar el pedido
      setPrecioTotalConDescuento(null);
      setModalVisible(false);
      setCodigoDescuento('');
    }
};


  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title={`Total: ${precioTotal.toFixed(2)} € IVA inc`} placement="bottom">
        <Button icon={<ShoppingCartOutlined />} onClick={showModal}>
          Mi cesta
          <span className="circuloCesta">{articulo.length}</span>
        </Button>
      </Tooltip>

      <Modal
        title="Mi cesta"
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={articulo.length === 0 ? (
          <Empty description="Tu cesta está vacía" />
        ) : (
          <>
            <div className='modalCarrito' style={{ marginBottom: '10px' }}>
              <label>Código promocional</label>
              <input
                type="text"
                value={codigoDescuento}
                onChange={(e) => setCodigoDescuento(e.target.value)}
                style={{ marginLeft: '10px' }}
              />
              <div className='modalCarritoBoton'>
              <Button
                type="primary"
                onClick={aplicarDescuento}
                style={{ marginLeft: '10px' }}
              >
                Aplicar Descuento
              </Button>
              </div>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <Button key="submit" type="primary" onClick={handleOk} disabled={articulo.length === 0}>
                Pagar
              </Button>
            </div>
          </>
        )}
      >
        <List
          bordered
          dataSource={articulo}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.imagen} />}
                title={item.descripcion}
                description={`Precio: ${item.precio.toFixed(2)} € x ${item.quantity} = ${item.precio.toFixed(2) * item.quantity} €`}
              />
              <div className='botonesCarrito' style={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  onClick={() => incrementarCantidad(item._id)}
                  type="primary"
                  ghost
                  size="small"
                  style={{ marginRight: '8px', width: '24px' }}
                >
                  +
                </Button>
                <Button
                  onClick={() => decrementarCantidad(item._id)}
                  type="primary"
                  ghost
                  size="small"
                  style={{ marginRight: '8px', width: '24px' }}
                >
                  -
                </Button>
                <Button
                  onClick={() => borrarArticulo(item._id)}
                  type="primary"
                  danger
                  ghost
                  size="small"
                >
                  Quitar
                </Button>
              </div>
            </List.Item>
          )}
        />
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <strong>Total: {precioTotalConDescuento ? (
            <>
              <Typography.Text style={{ color: 'red' }} delete>
                {precioTotal.toFixed(2)} €
              </Typography.Text>
              {' '}
              -<span style={{ color: 'green' }}>{descuento}%</span> = {precioTotalConDescuento.toFixed(2)} € IVA inc.
            </>
          ) : (
            `${precioTotal.toFixed(2)} € IVA inc.`
          )}
          </strong>
        </div>
      </Modal>
    </div>
  );
};

export default Carrito;
