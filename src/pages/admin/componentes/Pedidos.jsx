import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Tooltip, Modal, Divider } from 'antd';
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

const [pdfUrl, setPdfUrl] = useState("");
const [modalVisible, setModalVisible] = useState(false);
const cerrarModal = () => {
    setPdfUrl("");
    setModalVisible(false);
  };

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

const handlePreviewFactura = async (record) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/factura?id=${record._id}`, { responseType: "blob" });
      const pdfUrl = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      setPdfUrl(pdfUrl);
      setModalVisible(true);
    } catch (error) {
      console.error('Error al obtener factura:', error.message);
    }
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
          <>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>

            <Button type="primary" ghost onClick={() => handleDescargarFactura(record)}>
              Descargar Factura
            </Button>
            <Tooltip title="Ver Factura" placement="bottom">
            <Button style={{ marginLeft: '3%', borderColor: 'orange' }} type="default" onClick={() => handlePreviewFactura(record)}>
              <EyeOutlined />
            </Button>
          </Tooltip>

          </div>
          </>
        ),
      },
];

return (
    <>
        <h2>Pedidos realizados</h2>
        <Divider/>
        <Table dataSource={pedidos} columns={columnsPedidos} />
        <Modal
        title="Previsualizar Factura"
        open={modalVisible}
        onCancel={cerrarModal}
        footer={null}
      >
        {pdfUrl && <iframe src={pdfUrl} width="100%" height="500px" title="Factura PDF" />}
      </Modal>
    </>
)
}

export default Pedidos