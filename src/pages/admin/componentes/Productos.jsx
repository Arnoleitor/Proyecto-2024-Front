import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Space, Modal, Button, Form, Input, Select, notification, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useFetch } from '../../../useHooks/useFetch';
import CargarArchivo from '../../../components/Customs/CargarArchivo';

const Productos = () => {
    const { Option } = Select;
    const [productos, setProductos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editProductModalVisible, setEditProductModalVisible] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [form] = Form.useForm();
    const [tiposProductos, setTiposProductos] = useState([]);

    const openNotification = (type, message) => {
        notification[type]({
            message,
        });
    };

    const { data: productosData } = useFetch("http://localhost:3000/api/recibirProducto");
    useEffect(() => {
        if (productosData) setProductos(productosData);
    }, [productosData]);

    const { data: responseTiposProductoData } = useFetch("http://localhost:3000/api/tiposproducto");
    useEffect(() => {
        if (responseTiposProductoData) setTiposProductos(responseTiposProductoData);
    }, [responseTiposProductoData]);

    const fetchProductos = async () => {
        const { data } = await axios.get("http://localhost:3000/api/recibirProducto");
        setProductos(data);
    };

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
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
                    const imagen = values?.imagen.file.thumbUrl.split(',')[1];
                    const body = { ...values, imagen };
                    await axios.post('http://localhost:3000/api/agregarproducto', body);
                    openNotification('success', 'Producto añadido correctamente');
                    setModalVisible(false);
                    form.resetFields();
                    fetchProductos();
                } catch (error) {
                    console.error('Error al agregar producto:', error.message);
                }
            })
            .catch((info) => {
                console.error('Validación fallida:', info);
            });
    };

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
    return (
    <>
    <h2>Productos disponibles</h2>
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
</>
)
}

export default Productos; 