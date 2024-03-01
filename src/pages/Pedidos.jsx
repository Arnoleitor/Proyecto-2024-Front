import React from "react";
import { Table, Button } from "antd";
import { useSelector } from "react-redux";

const Pedidos = () => {
  const userData = useSelector((state) => state.user);

  const data = [
    {
      key: "1",
      numeroPedido: "P001",
      producto: "Producto 1",
      direccion: "Calle A, Ciudad",
      precio: "50.00€",
    },
    {
      key: "2",
      numeroPedido: "P002",
      producto: "Producto 2",
      direccion: "Calle B, Ciudad",
      precio: "35.00€",
    },
    {
      key: "1",
      numeroPedido: "P001",
      producto: "Producto 1",
      direccion: "Calle A, Ciudad",
      precio: "50.00€",
    },
    {
      key: "2",
      numeroPedido: "P002",
      producto: "Producto 2",
      direccion: "Calle B, Ciudad",
      precio: "35.00€",
    },{
      key: "1",
      numeroPedido: "P001",
      producto: "Producto 1",
      direccion: "Calle A, Ciudad",
      precio: "50.00€",
    },
    {
      key: "2",
      numeroPedido: "P002",
      producto: "Producto 2",
      direccion: "Calle B, Ciudad",
      precio: "35.00€",
    },{
      key: "1",
      numeroPedido: "P001",
      producto: "Producto 1",
      direccion: "Calle A, Ciudad",
      precio: "50.00€",
    },
    {
      key: "2",
      numeroPedido: "P002",
      producto: "Producto 2",
      direccion: "Calle B, Ciudad",
      precio: "35.00€",
    },  ];

  const columns = [
    {
      title: "Nº de Pedido",
      dataIndex: "numeroPedido",
      key: "numeroPedido",
    },
    {
      title: "Producto",
      dataIndex: "producto",
      key: "producto",
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
      key: "direccion",
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
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
      <Table dataSource={data} columns={columns} />
    </>
  );
};

export default Pedidos;
