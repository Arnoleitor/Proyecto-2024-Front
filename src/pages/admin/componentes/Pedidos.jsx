import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import FechaFormateada from '../../../components/Customs/FechaFormateada';
import { saveAs } from 'file-saver';
import { useFetch } from '../../../useHooks/useFetch';

const Pedidos = () => {

const [pedidos, setPedidos] = useState([]);
const { data: responsePedidosData } = useFetch("http://localhost:3000/api/pedidos");
useEffect(() => {
    if (responsePedidosData) setPedidos(responsePedidosData);
}, [responsePedidosData]);

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
return (
    <>
        <h2>Pedidos Realizados</h2>
        <Table dataSource={pedidos} columns={columnsPedidos} />
    </>
)
}

export default Pedidos