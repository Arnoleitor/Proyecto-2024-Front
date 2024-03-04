// Contacto.js
import React from 'react';
import { Form, Input, Button, Card } from 'antd';

const Contacto = () => {
    const onFinish = (values) => {
        console.log('Formulario enviado:', values);
    };

    const inputStyle = { minWidth: '300px', width: '100%' };
    const cardStyle = { padding: '20px', maxWidth: '500px', margin: '0 auto' };

    return (
        <Card style={cardStyle}>
            <div className="contact-us-container">
                <h1>Contacta con Nosotros</h1>
                <p>
                    Si tienes alguna pregunta, comentario o sugerencia, no dudes en ponerte en contacto con nuestro equipo de soporte.
                    Estamos aquí para ayudarte.
                </p>
                <Form onFinish={onFinish}>
                    <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Por favor, ingresa tu nombre' }]}>
                        <Input style={inputStyle} />
                    </Form.Item>

                    <Form.Item
                        label="Correo"
                        name="email"
                        rules={[
                            { required: true, message: 'Por favor, ingresa tu correo electrónico' },
                            { type: 'email', message: 'Ingresa un correo electrónico válido' },
                        ]}
                    >
                        <Input style={inputStyle} />
                    </Form.Item>
                    
                    <Form.Item label="Mensaje" name="message" rules={[{ required: true, message: 'Por favor, ingresa tu mensaje' }]}>
                        <Input.TextArea style={inputStyle} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Enviar Mensaje
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Card>
    );
};

export default Contacto;
