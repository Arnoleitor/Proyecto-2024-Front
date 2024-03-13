// DiscountPopup.js
import React, { useRef } from 'react';
import { Alert, Button, message } from 'antd';

const DiscountPopup = ({ onClose }) => {
  const codeRef = useRef(null);

  const copyDiscountCode = () => {
    const discountCode = 'Acv35Ad3'; // El código de descuento
    navigator.clipboard.writeText(discountCode)
      .then(() => {
        message.success('Código copiado al portapapeles');
      })
      .catch((err) => {
        console.error('Error al copiar el código al portapapeles:', err);
        message.error('Error al copiar el código al portapapeles');
      });
  };

  const handleCodeClick = (e) => {
    e.stopPropagation(); // Detener la propagación del evento
    copyDiscountCode();
  };

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
        cursor: 'pointer',
      }}
      onClick={() => codeRef.current.click()}
    >
      <Alert
        message="¡Tenemos descuentos!"
        description={
          <>
            Obtén un 10% de descuento con este código:{' '}
            <span
              ref={codeRef}
              onClick={handleCodeClick}
              style={{
                background: '#f2f4f5',
                padding: '2px 4px',
                borderRadius: 2,
                cursor: 'pointer',
              }}
            >
              Acv35Ad3
            </span>
          </>
        }
        type="info"
        showIcon
        closable
        onClose={onClose}
      />
    </div>
  );
};

export default DiscountPopup;
