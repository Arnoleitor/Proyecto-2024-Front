import React from 'react';
import { Form, Input, Button, Card, notification, message } from 'antd';
import axios from 'axios';

const openNotification = (type, message) => {
    notification[type]({
        message,
    });
};

const Contacto = () => {
    const onFinish = async (values) => {
        try {
            const contacto = await axios.post(`http://localhost:3000/api/postcontacto`, values)
            openNotification('success', 'Mensaje enviado correctamente');
        } catch {
            openNotification('error', 'Fallo al enviar el mensaje, prueba mas tarde.');
        }
    };

    const cardStyle = { padding: '20px', maxWidth: '500px', margin: '0 auto' };

    return (
        <Card style={cardStyle}>
            <div className="contact-us-container">
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Contacta con Nosotros</h1>
                <p>
                    Si tienes alguna pregunta, comentario o sugerencia, no dudes en ponerte en contacto con nuestro equipo de soporte.
                    Estamos aquí para ayudarte.
                </p>
                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Por favor, ingresa tu nombre' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Correo"
                        name="email"
                        rules={[
                            { required: true, message: 'Por favor, ingresa tu correo electrónico' },
                            { type: 'email', message: 'Ingresa un correo electrónico válido' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Mensaje" name="mensaje" rules={[{ required: true, message: 'Por favor, ingresa tu mensaje' }]}>
                        <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Enviar Mensaje
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Card>
    );
};

export default Contacto;
