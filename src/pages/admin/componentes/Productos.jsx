import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Space, Modal, Button, Form, Input, Select, notification, Upload, message, Divider, InputNumber, Tooltip } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useFetch } from '../../../useHooks/useFetch';
import CargarArchivo from '../../../components/Customs/CargarArchivo';

const Productos = () => {
    const { Option } = Select;
    const [productos, setProductos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editProductModalVisible, setEditProductModalVisible] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [deleteDescuentoSeleccionado, setDeleteDescuentoSeleccionado] = useState(null);
    const [form] = Form.useForm();
    const [tiposProductos, setTiposProductos] = useState([]);
    const [descuentoModalVisible, setDescuentoModalVisible] = useState(false);
    const [descuento, setDescuento] = useState(0);

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
    const handleModalEditOkProducto = async () => {
        try {
            const values = await form.validateFields();
            await axios.put(`http://localhost:3000/api/actualizaproducto/${productoSeleccionado}`, values);

            const { data: nuevosProductos } = await axios.get("http://localhost:3000/api/recibirProducto");
            setProductos(nuevosProductos);
            setEditProductModalVisible(false);
            form.resetFields();
            openNotification('success', 'Producto actualizado correctamente');
        } catch (error) {
            message.error('Error al actualizar producto');
            openNotification('error', 'Error al actualizar producto');
        }
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
                    message.error('Error al eliminar producto');
                }
            },
        });
    };

    const handleAgregarProducto = () => {
        setModalVisible(true);
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            const imagen = values?.imagen.file.thumbUrl.split(',')[1];
            const body = { ...values, imagen };

            await axios.post('http://localhost:3000/api/agregarproducto', body);

            const { data: nuevosProductos } = await axios.get("http://localhost:3000/api/recibirProducto");
            setProductos(nuevosProductos);

            openNotification('success', 'Producto añadido correctamente');
            setModalVisible(false);
            form.resetFields();
        } catch (error) {
            message.error('Error al agregar producto');
        }
    };

    const handleAgregarDescuento = async () => {
        try {
            if (descuento === 0) {
                message.error('El descuento no puede ser 0.');
                return;
            }

            const { data } = await axios.post(`http://localhost:3000/api/productosconDescuento/${productoSeleccionado._id}`, { descuento });
            setDescuentoModalVisible(false);

            const { data: nuevosProductos } = await axios.get("http://localhost:3000/api/recibirProducto");
            setProductos(nuevosProductos);
            openNotification('success', 'Descuento agregado correctamente');

        } catch (error) {
            console.error('Error al agregar descuento:', error);
            setDescuentoModalVisible(false);
            openNotification('error', 'Error al agregar descuento');
        }
    };

    const handleModalEliminarDescuento = (record) => {
        Modal.confirm({
            title: 'Confirmar Eliminación de Descuento',
            content: '¿Estás seguro de que quieres eliminar este descuento?',
            okText: 'Eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: async () => {
                try {
                    await axios.put(`http://localhost:3000/api/deleteDescuentoProducto/${record._id}`);
                    const { data: nuevosProductos } = await axios.get("http://localhost:3000/api/recibirProducto");
                    setProductos(nuevosProductos);
                    openNotification('success', 'Descuento eliminado correctamente');
                } catch (error) {
                    message.error('Error al eliminar descuento');
                    openNotification('error', 'Error al eliminar descuento');
                }
            },
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
            render: (precio, record) => {
                if (record.tieneDescuento) {
                    const precioConDescuento = precio - (precio * (record.descuento / 100));
                    return (
                        <span>
                            {precioConDescuento.toFixed(2)} € (Descuento: {record.descuento}%)
                        </span>
                    );
                } else {
                    return (
                        <span>
                            {precio.toFixed(2)} €
                        </span>
                    );
                }
            },
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
                    <Tooltip title={'Eliminar producto'}>
                    <Button onClick={() => handleEliminarProducto(record._id)} type="default" danger>
                        Eliminar
                    </Button>
                    </Tooltip>
                    <Button onClick={() => { setProductoSeleccionado(record); setDescuentoModalVisible(true) }} type="dashed" style={{ color: 'green' }}>Descuento</Button>
                    <Tooltip title={'Eliminar descuento'}>
                    <Button onClick={() => handleModalEliminarDescuento(record)} type="dashed" style={{ color: 'red' }}>Eliminar %</Button>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className='tablasAdmin'>
                <h2>Productos disponibles</h2>
                <Divider />
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
                    <Button type="primary" onClick={handleAgregarProducto}>
                        Agregar Producto
                    </Button>
                    <div style={{ marginRight: '2%' }}></div>
                    <CargarArchivo setProductos={setProductos} />
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
                <Modal
                    title="Agregar Descuento"
                    open={descuentoModalVisible}
                    onOk={handleAgregarDescuento}
                    onCancel={() => setDescuentoModalVisible(false)}
                >
                    <Form layout="vertical">
                        <Form.Item
                            label="Descuento (%)"
                            name="descuento"
                            rules={[{ required: true, message: 'Ingresa el descuento' }]}
                        >
                            <InputNumber
                                min={0}
                                max={99}
                                formatter={value => `${value}`}
                                onChange={(value) => setDescuento(value)}
                                onKeyDown={(e) => {
                                    if (e.target.value.length >= 2 && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    )
}

export default Productos;