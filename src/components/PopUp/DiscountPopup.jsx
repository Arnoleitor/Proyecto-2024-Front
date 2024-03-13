// DiscountPopup.js
import React from 'react';
import { Alert, Button } from 'antd';

const DiscountPopup = ({ onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        width: 300,
        padding: 16,
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Alert
        message="¡Tenemos descuentos!"
        description="Obtén un 10% de descuento con este código: Acv35Ad3"
        type="info"
        showIcon
        closable
        onClose={onClose}
      />

      <Button
        type="text"
        size="small"
        onClick={onClose}
        style={{ position: 'absolute', top: 5, right: 5 }}
      >
      </Button>
    </div>
  );
};

export default DiscountPopup;
