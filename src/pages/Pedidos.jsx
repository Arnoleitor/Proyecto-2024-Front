import React, { useEffect, useState } from "react";
import { Table, Button, Tooltip } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";

const Pedidos = () => {
  const userData = useSelector((state) => state.user);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/pedidosid?id=${userData.id}`);
        setPedidos(response.data);
      } catch (error) {
        console.error('Error al obtener pedidos:', error.message);
      }
    };
  
    fetchPedidos();
  }, []);
  

  const columns = [
    {
      title: "Nº de Pedido",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Producto",
      dataIndex: "productos",
      render: (productos) => (
        <span>
          {productos.map((producto) => (
            <div key={producto._id}>
              {producto._id}
              <Tooltip title={`${producto.cantidad} Unidad/es`} placement="right">
                <span style={{ marginLeft: '2%', fontWeight: 'bolder', cursor: 'pointer', color:'blue' }}>
                  <EyeOutlined />
                </span>
              </Tooltip>
            </div>
          ))}
        </span>
      ),
    },
    {
      title: "Importe",
      dataIndex: "totalImporte",
      key: "totalImporte",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (text, record) => (
        <Button type="primary" ghost onClick={() => handleDownloadInvoice(record)}>
          Descargar Factura
        </Button>
      ),
    },
  ];

  const handleDownloadInvoice = (record) => {
    console.log("Downloading invoice for order:", record.numeroPedido);
  };

  return (
    <>
      <h1>Pedidos de {userData.nombre}</h1>
      <Table dataSource={pedidos} columns={columns} />
    </>
  );
};

export default Pedidos;
