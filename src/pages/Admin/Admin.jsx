import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Space, Modal, Button, Form, Input, Select, notification, Tooltip, Upload, message } from 'antd';
import CargarArchivo from '../../components/Customs/CargarArchivo';
import { EyeOutlined, UploadOutlined } from '@ant-design/icons';
import FechaFormateada from '../../components/Customs/FechaFormateada';
import { saveAs } from 'file-saver';
import { useFetch } from '../../useHooks/useFetch';

const { Option } = Select;

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedUser, setSelectedUser] = useState(null);
  const [tiposDevia, setTiposDevia] = useState([]);
  const [tiposProductos, setTiposProductos] = useState([]);
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);
  const [editProductModalVisible, setEditProductModalVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const openNotification = (type, message) => {
    notification[type]({
      message,
    });
  };

  const { data: tiposDeviaData } = useFetch("http://localhost:3000/api/tiposdevias");
  useEffect(() => {
    if (tiposDeviaData) setTiposDevia(tiposDeviaData);
  }, [tiposDeviaData]);

  const { data: productosData } = useFetch("http://localhost:3000/api/recibirProducto");
  useEffect(() => {
    if (productosData) setProductos(productosData);
  }, [productosData]);

  const { data: responseUsersData } = useFetch("http://localhost:3000/api/users");
  useEffect(() => {
    if (responseUsersData) setUsers(responseUsersData);
  }, [responseUsersData]);

  const { data: responsePedidosData } = useFetch("http://localhost:3000/api/pedidos");
  useEffect(() => {
    if (responsePedidosData) setPedidos(responsePedidosData);
  }, [responsePedidosData]);

  const { data: responseTiposProductoData } = useFetch("http://localhost:3000/api/tiposproducto");
  useEffect(() => {
    if (responseTiposProductoData) setTiposProductos(responseTiposProductoData);
  }, [responseTiposProductoData]);


  const handleDescargarFactura = (record) => {
    const fetchFactura = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/factura?id=${record._id}`, { responseType: "blob" })
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'newPdf.pdf');

      } catch (error) {
        console.error('Error al obtener factura:', error.message);
      }
    };
    fetchFactura()
  };

  const columnsUsers = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Dirección',
      dataIndex: 'direccion',
      key: 'direccion',
    },
    {
      title: 'Tipo vía',
      dataIndex: 'tipoVia',
      key: 'tipoVia',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEditarUsuario(record)}>Editar</Button>
          <Button onClick={() => handleEliminarUsuario(record._id)} type="default" danger>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const columnsPedidos = [
    {
      title: "Nº de Pedido",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "ID Comprador",
      dataIndex: "id",
      key: "id",
    },
    {
      title: 'idProducto',
      dataIndex: 'productos',
      key: 'productos',
      render: (productos) => (
        <span>
          {productos.map((producto) => (
            <div key={producto._id}>
              {producto._id}
              <Tooltip title={`${producto.cantidad} Unidad/es`} placement="right">
                <span style={{ marginLeft: '2%', fontWeight: 'bolder', cursor: 'pointer', color: 'blue' }}>
                  <EyeOutlined />
                </span>
              </Tooltip>
            </div>
          ))}
        </span>
      ),
    },
    {
      title: "Descripción",
      dataIndex: "productos",
      render: (productos) => (
        <span>
          {productos.map((producto) => (
            <div key={producto._id}>
              {producto.descripcion}
            </div>
          ))}
        </span>
      ),
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      render: (fecha) => <FechaFormateada timestamp={fecha} />
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
      key: "direccion",
    },
    {
      title: "Importe",
      dataIndex: "totalImporte",
      key: "totalImporte",
      render: (totalImporte) => <span>{totalImporte} €</span>,
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (text, record) => (
        <Button type="primary" ghost onClick={() => handleDescargarFactura(record)}>
          Descargar Factura
        </Button>
      ),
    },
  ];

  const columnsProductos = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Nombre',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipo',
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
      render: (precio) => (
        <span>
          {precio} €
        </span>
      ),
    },
    {
      title: 'Imagen',
      dataIndex: 'imagen',
      key: 'imagen',
      render: (text, record) => (
        <img
          src={record.imagen}
          style={{ maxWidth: '50px', padding: '5px' }}
          onError={(e) => console.log('Error al cargar imagen:', e)}
        />
      ),
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEditarProducto(record._id)}>Editar</Button>
          <Button onClick={() => handleEliminarProducto(record._id)} type="default" danger>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const handleEliminarUsuario = async (id) => {
    Modal.confirm({
      title: 'Confirmar Eliminación',
      content: '¿Estás seguro de que quieres eliminar este usuario?',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:3000/api/users/${id}`);
          setUsers(users.filter((user) => user._id !== id));
          openNotification('success', 'Usuario eliminado correctamente');
        } catch (error) {
          console.error('Error al eliminar usuario:', error.message);
          openNotification('error', 'Error al eliminar usuario');
        }
      },
    });
  };

  const handleEditarUsuario = (user) => {
    setSelectedUser(user);
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      Roles: user.Roles,
      direccion: user.direccion,
      tipoVia: user.tipoVia
    });
    setEditUserModalVisible(true);
  };

  const handleModalEditOkUsuario = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          await axios.put(`http://localhost:3000/api/users/${selectedUser._id}`, values);
          setEditUserModalVisible(false);
          form.resetFields();
          setUsers(users.map((user) => (user._id === selectedUser._id ? { ...user, ...values } : user)));
          openNotification('success', 'Usuario actualizado correctamente');
        } catch (error) {
          console.error('Error al actualizar usuario:', error.message);
          openNotification('error', 'Error al actualizar usuario');
        }
      })
      .catch((info) => {
        console.error('Validación fallida:', info);
      });
  };

  const handleModalEditCancel = () => {
    setEditUserModalVisible(false);
    form.resetFields();
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleEditarProducto = (productoSeleccionado) => {
    setProductoSeleccionado(productoSeleccionado);
    form.setFieldsValue({
      tipo: productoSeleccionado.tipo,
      descripcion: productoSeleccionado.descripcion,
      precio: productoSeleccionado.precio,
      imagen: productoSeleccionado.imagen,
    });
    setEditProductModalVisible(true);
  };

  const handleModalEditCancelProducto = () => {
    setEditProductModalVisible(false);
    form.resetFields();
  };

  const handleModalEditOkProducto = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          await axios.put(`http://localhost:3000/api/actualizaproducto/${productoSeleccionado}`, values);
          setEditProductModalVisible(false);
          form.resetFields();
          fetchProductos();
          openNotification('success', 'Producto actualizado correctamente');
        } catch (error) {
          console.error('Error al actualizar producto:', error.message);
          openNotification('error', 'Error al actualizar producto');
        }
      })
      .catch((info) => {
        console.error('Validación fallida:', info);
      });
  };

  const handleEliminarProducto = async (productoId) => {
    Modal.confirm({
      title: 'Confirmar Eliminación',
      content: '¿Estás seguro de que quieres eliminar este producto?',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:3000/api/deleteProducto/${productoId}`);
          setProductos(productos.filter((producto) => producto._id !== productoId));
          openNotification('success', 'Producto eliminado correctamente');
        } catch (error) {
          console.error('Error al eliminar producto:', error.message);
        }
      },
    });
  };

  const handleAgregarProducto = () => {
    setModalVisible(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          const imagen = values?.imagen.file.thumbUrl.split(',')[1]
          const body = { ...values, imagen }
          await axios.post('http://localhost:3000/api/agregarproducto', body);
          setModalVisible(false);
          form.resetFields();
          fetchProductos()
        } catch (error) {
          console.error('Error al agregar producto:', error.message);
        }
      })
      .catch((info) => {
        console.error('Validación fallida:', info);
      });
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };


  return (
    <div>
      <h2>Usuarios</h2>
      <Table dataSource={users} columns={columnsUsers} rowKey={(record) => record.id} />
      <Modal
        title="Editar Usuario"
        open={editUserModalVisible}
        onOk={handleModalEditOkUsuario}
        onCancel={handleModalEditCancel}
      >
        <Form form={form} layout="vertical" name="edit-user-form">
          <Form.Item label="Nombre" name="username" initialValue={selectedUser?.username}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" initialValue={selectedUser?.email}>
            <Input />
          </Form.Item>
          <Form.Item label="Dirección" name="direccion" initialValue={selectedUser?.direccion}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Tipo de Vía"
            name="tipoVia"
            rules={[{ required: true, message: 'Seleccione el tipo de vía' }]}
            initialValue={selectedUser?.tipoVia}
          >
            <Select>
              {tiposDevia.map((tipo) => (
                <Option key={tipo.id} value={tipo.tipo}>
                  {tipo.tipo}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Roles" name="Roles">
            <Select>
              <Option value={1}>Admin</Option>
              <Option value={2}>Usuario</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <h2>Productos</h2>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
        <Button type="primary" onClick={handleAgregarProducto}>
          Agregar Producto
        </Button>
        <div style={{ marginRight: '2%' }}></div>
        <CargarArchivo />
      </div>
      <Table dataSource={productos} columns={columnsProductos} />

      <Modal
        title="Editar Producto"
        open={editProductModalVisible}
        onOk={handleModalEditOkProducto}
        onCancel={handleModalEditCancelProducto}
      >
        <Form form={form} layout="vertical" name="edit-product-form">
          <Form.Item label="Imagen" name="imagen">
            <Upload
              maxCount={1}
              multiple={false}
              listType='picture-card'
              customRequest={dummyRequest}
              beforeUpload={(file) => {
                const isImage = file.type.startsWith('image/');
                if (!isImage) {
                  message.error('Solo se permiten archivos de imagen');
                }
                return isImage;
              }}
              onChange={(info) => {

                let { status, name, response } = info.file;
                if (status === 'done') {
                  console.log("name", info.file.name);
                  if (response === 'ok') {
                    console.log(info.file.thumbUrl);
                    if (info.file.thumbUrl) {
                      form.setFieldsValue({ imagen: info.file.thumbUrl });
                    }

                    message.success(`${name} cargado exitosamente`);
                  } else {
                    console.error('Estructura de respuesta no válida:', response);
                    message.error('Error al obtener la imagen base64 de la respuesta del servidor.');
                  }
                } else if (status === 'error') {
                  message.error(`${name} carga fallida.`);
                }
              }}


            >
              <Button icon={<UploadOutlined />}>Cargar Imagen</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Nombre"
            name="descripcion"
            rules={[{ required: true, message: 'Ingresa el nombre del producto' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tipo"
            name="tipo"
            rules={[{ required: true, message: 'Selecciona el tipo del producto' }]}
          >
            <Select>
              {tiposProductos.map((tipo) => (
                <Option key={tipo.id} value={tipo.id}>
                  {tipo.tipo}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Precio"
            name="precio"
            rules={[{ required: true, message: 'Ingresa el precio del producto' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Agregar Producto"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical" name="producto-form">
          <Form.Item label="Imagen" name="imagen">
            <Upload
              maxCount={1}
              multiple={false}
              listType='picture-card'
              customRequest={dummyRequest}
              beforeUpload={(file) => {
                const isImage = file.type.startsWith('image/');
                if (!isImage) {
                  message.error('Solo se permiten archivos de imagen');
                }
                return isImage;
              }}
              onChange={(info) => {

                let { status, name, response } = info.file;
                if (status === 'done') {
                  console.log("name", info.file.name);
                  if (response === 'ok') {
                    console.log(info.file.thumbUrl);
                    if (info.file.thumbUrl) {
                      form.setFieldsValue({ imagen: info.file.thumbUrl });
                    }

                    message.success(`${name} cargado exitosamente`);
                  } else {
                    console.error('Estructura de respuesta no válida:', response);
                    message.error('Error al obtener la imagen base64 de la respuesta del servidor.');
                  }
                } else if (status === 'error') {
                  message.error(`${name} carga fallida.`);
                }
              }}


            >
              <Button icon={<UploadOutlined />}>Cargar Imagen</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Nombre"
            name="descripcion"
            rules={[{ required: true, message: 'Ingresa el nombre del producto' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tipo"
            name="tipo"
            rules={[{ required: true, message: 'Selecciona el tipo del producto' }]}
          >
            <Select>
              {tiposProductos.map((tipo) => (
                <Option key={tipo.id} value={tipo.id}>
                  {tipo.tipo}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Precio"
            name="precio"
            rules={[{ required: true, message: 'Ingresa el precio del producto' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
      <h2>Pedidos Realizados</h2>
      <Table dataSource={pedidos} columns={columnsPedidos} />
    </div>
  );

};

export default AdminPanel;
