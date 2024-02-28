import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

const props = {
  name: 'file',
  action: 'http://localhost:3000/api/productos',
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
    if (info.file.status !== 'Cargando...') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'Correcto') {
      message.success(`${info.file.name} archivo cargado correctamente`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} fallo al cargar el archivo.`);
    }
  },
};

const CargarArchivo = () => (
  <Upload {...props}>
    <Button type="primary" ghost icon={<UploadOutlined />}>
      Insertar excel productos
    </Button>
  </Upload>
);

export default CargarArchivo;
