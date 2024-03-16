import React from 'react';
import { Layout, Typography, Collapse } from 'antd';
import { ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const TerminosCondiciones = () => {
  return (
    <Content style={{ padding: '50px', marginTop: '64px', background: '#f0f2f5' }}>
      <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <Title level={2}>Términos y Condiciones</Title>
        <Collapse accordion>
          <Panel header={<span><ExclamationCircleOutlined /> Términos de uso</span>} key="1">
            <Paragraph>
              Estos son los términos y condiciones que rigen el uso de nuestro sitio web. Al acceder y utilizar este sitio web, usted acepta estar legalmente vinculado por estos términos y condiciones. Si no está de acuerdo con alguno de estos términos y condiciones, por favor no utilice nuestro sitio web.
            </Paragraph>
          </Panel>
          <Panel header={<span><InfoCircleOutlined /> Uso del Sitio Web</span>} key="2">
            <Paragraph>
              El uso de este sitio web se rige por las leyes aplicables del país desde el cual se accede al sitio. Usted acepta utilizar este sitio web únicamente con fines legales y de manera que no infrinja los derechos de terceros, ni restrinja o inhiba el uso y disfrute de este sitio web por parte de otros usuarios.
            </Paragraph>
          </Panel>
          <Panel header={<span><InfoCircleOutlined /> Contenido del Sitio Web</span>} key="3">
            <Paragraph>
              Todo el contenido de este sitio web es proporcionado únicamente con fines informativos y de referencia. Nos esforzamos por mantener la información actualizada y precisa, pero no garantizamos la precisión, integridad o actualidad de dicha información.
            </Paragraph>
          </Panel>
          <Panel header={<span><InfoCircleOutlined /> Modificaciones</span>} key="4">
            <Paragraph>
              Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento sin previo aviso. Cualquier modificación entrará en vigencia inmediatamente después de su publicación en este sitio web.
            </Paragraph>
          </Panel>
          <Panel header={<span><InfoCircleOutlined /> Contacto</span>} key="5">
            <Paragraph>
              Si tiene alguna pregunta sobre estos términos y condiciones, por favor contáctenos.
            </Paragraph>
          </Panel>
        </Collapse>
      </div>
    </Content>
  );
};

export default TerminosCondiciones;
