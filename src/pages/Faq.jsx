// Faq.js
import React, { useState } from 'react';

const Faq = () => {
  const faqData = [
    {
      question: '¿Cómo puedo comprar un componente?',
      answer:
        'Puedes comprar un componente siguiendo estos pasos: 1. Explora nuestra tienda en línea. 2. Selecciona el componente que deseas. 3. Añádelo al carrito y completa el proceso de pago.',
    },
    {
      question: '¿Cuáles son los métodos de pago aceptados?',
      answer:
        'Aceptamos tarjetas de crédito y débito, así como otros métodos de pago en línea seguros. Puedes ver todas las opciones disponibles durante el proceso de pago.',
    },
    {
      question: '¿Cómo instalo los componentes después de la compra?',
      answer:
        'Después de realizar la compra, recibirás un correo electrónico con instrucciones detalladas sobre cómo descargar e instalar tus componentes. Si encuentras algún problema, nuestro equipo de soporte está aquí para ayudarte.',
    },
    {
        question: '¿Cómo obtengo la factura de mi compra?',
        answer:
          'Después de realizar la compra, recibirás un correo electrónico con la factura. También puedes descargarla en el apartado "Mis Pedidos" en tu perfil. Busca el botón "Descargar Factura" junto a los detalles de tu compra.',
      },
  ];

  const [openQuestion, setOpenQuestion] = useState(null);

  const handleToggleQuestion = (index) => {
    setOpenQuestion((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      <h1>Preguntas Frecuentes</h1>
      {faqData.map((item, index) => (
        <div key={index}>
          <div className="question" onClick={() => handleToggleQuestion(index)}>
            <h3>{item.question}</h3>
            <span>{openQuestion === index ? '▲' : '▼'}</span>
          </div>
          {openQuestion === index && <p style={{fontFamily:'monospace'}} className="answer">{item.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default Faq;
