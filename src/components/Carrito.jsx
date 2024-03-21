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

  const precioTotal = articulo.reduce((total, item) => {
    const precioItem = item.descuento ? item.precio * (100 - item.descuento) / 100 : item.precio;
    return total + parseFloat(precioItem.toFixed(2)) * item.quantity;
  }, 0);

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

    if (!codigoDescuento) {
      return;
    }

    try {
      const responseDescuentos = await axios.get('http://localhost:3000/api/codigosDescuento');

      if (responseDescuentos.status === 200) {
        const codigosDescuento = responseDescuentos.data;
        const descuentoEncontrado = codigosDescuento.find(descuento => descuento.codigo === codigoDescuento);

        if (descuentoEncontrado) {
          const porcentajeDescuento = descuentoEncontrado.descuento;

          setDescuento(porcentajeDescuento);
          setCodigo(codigoDescuento);

          const totalConDescuento = precioTotal - (precioTotal * porcentajeDescuento / 100);
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

    if (userData.monedero < precioTotal || userData.monedero < precioTotalConDescuento) {
      message.error('No tienes suficiente saldo para realizar esta compra.');
      return;
    }

    try {
      await aplicarDescuento();

      const productosConCantidad = articulo.map(({ imagen, ...rest }) => ({
        ...rest,
        cantidad: rest.quantity,
      }));

      const direccion = `${userData.direccion}`;

      const responsePedido = await axios.post('http://localhost:3000/api/pedidos', {
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

      if (responsePedido.status === 200) {
        await axios.put(`http://localhost:3000/api/putmonedero/${userData.id}`, {
          totalPedido: precioTotalConDescuento || precioTotal
        });

        showSuccessMessage('Pedido realizado con éxito');
        dispatch(clearCart());
        setDescuento(null);
      } else {
        console.error('Error creating order:', responsePedido.statusText);
      }
    } catch (error) {
      console.error('Error creating order:', error.message);
    } finally {
      setPrecioTotalConDescuento(null);
      setModalVisible(false);
      setCodigoDescuento('');
      setDescuento(null);
      setCodigo('');
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
                description={item.descuento ? (
                  <>
                    <div>
                      <span style={{ textDecoration: 'line-through', color: 'red', marginRight: '5px' }}>
                        {item.precio.toFixed(2)} €
                      </span>
                      <span style={{ color: 'green' }}>{(item.precio * (100 - item.descuento) / 100).toFixed(2)}€ <span style={{color:'black'}}>-{item.descuento}%</span></span>
                    </div>
                    <div>Cantidad: {item.quantity}</div>
                  </>
                ) : (
                  `Precio: ${item.precio.toFixed(2)}€ Cantidad ${item.quantity}`
                )}
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
