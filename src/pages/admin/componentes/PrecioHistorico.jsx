import { Button, Divider, Modal, Table } from 'antd';
import React, { useState } from 'react';
import { useFetch } from '../../../useHooks/useFetch';
import FechaFormateada from '../../../components/Customs/FechaFormateada';
import { EyeOutlined } from '@ant-design/icons';

const PrecioHistorico = () => {
    const { data: responseDatos } = useFetch("http://localhost:3000/api/recibirProducto");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
  
    const handleOpenModal = (item) => {
      setSelectedItem(item);
      setModalVisible(true);
    };
  
    const handleModalClose = () => {
      setModalVisible(false);
      setSelectedItem(null);
    };
  
    const columnsPrecioHistorico = [
      {
        title: "Nombre - Historial",
        dataIndex: "descripcion",
        key: "descripcion",
        render: (text, record) => (
          <Button type='dashed' icon={<EyeOutlined/>} onClick={() => handleOpenModal(record)}>{text}</Button>
        ),
      },
      {
        title: "Precio actual",
        dataIndex: "precio",
        render: (precio) => <span>{precio.toFixed(2)} €</span>,
      },
      {
        title: "Descuento actual",
        dataIndex: "descuento",
        key: "descuento",
        render: (descuento) => <span>{descuento} %</span>,
      },
    ];
  
    // Filtrar los productos que tienen historial de precios
    const productosConHistorico = responseDatos ? responseDatos.filter(item => item.historico.length > 0) : [];
  
    return (
      <div className='tablasAdmin'>
        <h2>Precios Históricos</h2>
        <Divider />
        <Table dataSource={productosConHistorico} columns={columnsPrecioHistorico} />
  
        <Modal
          title={selectedItem ? selectedItem.descripcion : ""}
          visible={modalVisible}
          onCancel={handleModalClose}
          footer={null}
        >
          {selectedItem && (
            <div>
              <h3>Historial de precios:</h3>
              <Table
                dataSource={selectedItem.historico}
                columns={[
                  {
                    title: "Fecha",
                    dataIndex: "fechaPrecio",
                    key: "fechaPrecio",
                    render: fechaPrecio => (
                      <FechaFormateada timestamp={fechaPrecio} />
                    )
                  },
                  {
                    title: "Precio",
                    dataIndex: "precio",
                    key: "precio",
                    render: (precio) => <span style={{color:'#1890ff'}}>{precio.toFixed(2)} €</span>,
                  },
                ]}
              />
            </div>
          )}
        </Modal>
      </div>
    );
  }

export default PrecioHistorico;
