import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Space, Modal, Button, Form, Input, Select, notification, Tooltip, Upload, message } from 'antd';
import CargarArchivo from '../../components/Customs/CargarArchivo';
import { EyeOutlined, UploadOutlined } from '@ant-design/icons';
import FechaFormateada from '../../components/Customs/FechaFormateada';

const {Dragger} = Upload

const { Option } = Select;

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [tiposDevia, setTiposDevia] = useState([]);
  const [tiposProductos, setTiposProductos] = useState([]);
  const [imagen, setImagen] = useState(null);

  const openNotification = (type, message) => {
    notification[type]({
      message,
    });
  };

  useEffect(() => {
    const fecthTipoVia = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tiposdevias');
        setTiposDevia(response.data);
      } catch (error) {
        console.error('Error al obtener tiposDevia:', error.message);
      }
    };

    fecthTipoVia();
  }, []);

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
      }
    };

    const fetchPedidos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/pedidos');
        setPedidos(response.data);
      } catch (error) {
        console.error('Error al obtener pedidos:', error.message);
      }
    };

    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/recibirProducto');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error.message);
      }
    };

    const fetchTiposProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tiposproducto');
        setTiposProductos(response.data);
      } catch (error) {
        console.error('Error al obtener tipos de productos:', error.message);
      }
    };

    fetchUsers();
    fetchPedidos();
    fetchProductos();
    fetchTiposProductos();
  }, []);

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
    setEditModalVisible(true);
  };

  const handleModalEditOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          await axios.put(`http://localhost:3000/api/users/${selectedUser._id}`, values);
          setEditModalVisible(false);
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
    setEditModalVisible(false);
    form.resetFields();
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleEditarProducto = (producto) => {
    console.log('Editar producto:', producto);
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
          const response = await axios.post('http://localhost:3000/api/agregarproducto', values);
          setModalVisible(false);
          form.resetFields();
          setProductos([...productos, values]);
        } catch (error) {
          console.error('Error al agregar producto:', error.message);
        }
      })
      .catch((info) => {
        console.error('Validación fallida:', info);
      });
  };

  const dummyRequest = ({ file, onSuccess }) => {
    console.log("🚀 ~ dummyRequest ~ file:", file)
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handlerPreview = ({ file, onSuccess }) => {
    console.log(file)
  };
  return (
    <div>
      <h2>Usuarios</h2>
      <Table dataSource={users} columns={columnsUsers} rowKey={(record) => record.id} />


      <Modal
        title="Editar Usuario"
        open={editModalVisible}
        onOk={handleModalEditOk}
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
        title="Agregar Producto"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical" name="producto-form">
        <Form.Item label="Imagen" name="imagen">
  <Upload
    customRequest={dummyRequest}
    beforeUpload={(file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Solo se permiten archivos de imagen');
      }
      return isImage;
    }}
    onChange={(info) => {
      const { status, name, response } = info.file;
    
      if (status === 'done') {
        if (response && typeof response === 'object' && 'imageBase64' in response) {
          const { imageBase64 } = response;
          form.setFieldsValue({ imagen: imageBase64 });
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
            name="nombre"
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
