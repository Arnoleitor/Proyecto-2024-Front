import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Space, Modal, Button, Form, Input, Select } from 'antd';
import CargarArchivo from '../../components/Customs/CargarArchivo';

const { Option } = Select;

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [form] = Form.useForm();
  // const history = useHistory();

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

    fetchUsers();
    fetchPedidos();
    fetchProductos();
  }, []);

  const columnsUsers = [
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
  ];

  const columnsPedidos = [
    {
      title: 'ID del Pedido',
      dataIndex: '_id',
      key: '_id',
    },
  ];

  const columnsProductos = [
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
      key: 'precio',
    },
    {
      title: 'Imagen',
      dataIndex: 'imagen',
      key: 'imagen',
      render: (text, record) => <img src={record.imagen} alt={record.descripcion} style={{ maxWidth: '50px' }} />,
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEditarProducto(record)}>Editar</Button>
          <Button onClick={() => handleEliminarProducto(record._id)} type="default" danger>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const handleAgregarProducto = () => {
    setModalVisible(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          await axios.post('http://localhost:3000/api/productos', values);
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

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleEditarProducto = (producto) => {
    console.log('Editar producto:', producto);
  };

  const handleEliminarProducto = async (productoId) => {
    try {
      await axios.delete(`http://localhost:3000/api/productos/${productoId}`);
      setProductos(productos.filter((producto) => producto._id !== productoId));
    } catch (error) {
      console.error('Error al eliminar producto:', error.message);
    }
  };

  //   useEffect(() => {
  //     const userRole = obtenerElRolDelUsuario();

  //     if (userRole !== 1) {
  //       history.push('/');
  //     }

  return (
    <div>
      <h2>Usuarios</h2>
      <Table dataSource={users} columns={columnsUsers} />

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
              <Option value="Tipo1">Tipo 1</Option>
              <Option value="Tipo2">Tipo 2</Option>
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
  // }, [history]);

};

export default AdminPanel;
