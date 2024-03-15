// DiscountPopup.js
import React, { useEffect, useRef, useState } from 'react';
import { Alert, message } from 'antd';
import axios from 'axios';

const DiscountPopup = ({ onClose }) => {
  const codeRef = useRef(null);
  const [discountCode, setDiscountCode] = useState('');
  const [descuento, setDescuento] = useState('');

  const copyDiscountCode = () => {
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
    e.stopPropagation();
    copyDiscountCode();
  };

  // Llamada a la API para obtener el código de descuento
  const fetchDiscountCode = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/codigosDescuento');
      setDiscountCode(response.data[0].codigo);
      setDescuento(response.data[0].descuento)
    } catch (error) {
      console.error('Error al obtener el código de descuento:', error);
      message.error('Error al obtener el código de descuento');
    }
  };

  useEffect(() => {
    fetchDiscountCode();
  }, []);
  return (
    <div className='popUp'
     onClick={() => codeRef.current.click()}
    >
      <Alert
        message="¡Tenemos descuentos!"
        description={
          <>
            Obtén un {descuento}% de descuento con este código en tu primera compra!:{' '}
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
              {discountCode}
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
