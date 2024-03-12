import React from 'react';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';



const CargarArchivo = ({setProductos}) => {

  const props = {
    name: 'file',
    action: 'http://localhost:3000/api/agregarproductoExcel',
    headers: {
      authorization: 'authorization-text',
    },
    beforeUpload: (file) => {
      const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isExcel) {
        message.error('Por favor, sube un archivo Excel (xlsx)!');
      }
      return isExcel;
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} archivo cargado correctamente`);
    
        axios.get("http://localhost:3000/api/recibirProducto")
          .then(response => {
            setProductos(response.data);
          })
          .catch(error => {
            message.error('Error al obtener la lista de productos actualizada');
          });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} fallo al cargar el archivo.`);
      }
    },
    
  };

  return (
    <Upload {...props} showUploadList={false} disabled={props.fileList && props.fileList.length > 0}>
      <Button type="primary" ghost icon={<UploadOutlined />} disabled={props.fileList && props.fileList.length > 0}>
        Insertar excel productos
      </Button>
    </Upload>
  );
}
export default CargarArchivo;
