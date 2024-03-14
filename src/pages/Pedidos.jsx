import React, { useEffect, useState } from "react";
import { Table, Button, Tooltip, Modal } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";
import FechaFormateada from "../components/Customs/FechaFormateada";
import { saveAs } from 'file-saver';
import { useFetch } from "../useHooks/useFetch";

const Pedidos = () => {
  const userData = useSelector((state) => state.user);
  const [pedidos, setPedidos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const { data: pedidosData } = useFetch(`http://localhost:3000/api/pedidosid?id=${userData.id}`);
  useEffect(() => {
    if (pedidosData) setPedidos(pedidosData);
  }, [pedidosData]);

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
              &nbsp;&nbsp;
              <strong>{producto.precio.toFixed(2)} €</strong>
            </div>
          ))}
        </span>
      ),
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
      key: "direccion",
      render: (direccion, tipoVia) => userData.tipoVia && userData.direccion
        ? `${userData.tipoVia} ${userData.direccion}`
        : <strong style={{ color: 'red' }}>Tienes que actualizar la dirección en tu perfil</strong>,
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      render: (fecha) => <FechaFormateada timestamp={fecha} />
    },
    {
      title: "Importe",
      dataIndex: "totalImporte",
      key: "totalImporte",
      render: (totalImporte) => <strong>{totalImporte} €</strong>,
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (text, record) => (
        <>
          <Button type="primary" ghost onClick={() => handleDescargarFactura(record)}>
            Descargar Factura
          </Button>
          <Tooltip title="Ver Factura" placement="top">
            <Button
              style={{ marginLeft: '5%', color: 'orangered' }}
              type="default"
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => handlePreviewFactura(record)}
            />
          </Tooltip>
        </>
      ),
    },
  ];

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

  const cerrarModal = () => {
    setPdfUrl("");
    setModalVisible(false);
  };


  return (
    <>
      <h1>Pedidos de {userData.nombre}</h1>
      {pedidos.length === 0 ? (
        <p>No tienes pedidos actualmente.</p>
      ) : (
        <Table dataSource={pedidos} columns={columns} />
      )}
      <Modal
        title="Previsualizar Factura"
        open={modalVisible}
        onCancel={cerrarModal}
        footer={null}
      >
        {pdfUrl && <iframe src={pdfUrl} width="100%" height="500px" title="Factura PDF" />}
      </Modal>
    </>
  );
};

export default Pedidos;
