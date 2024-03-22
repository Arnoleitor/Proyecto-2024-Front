import { Layout, Row, Col, Card } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, CheckCircleOutlined, CreditCardOutlined, CustomerServiceOutlined, RocketOutlined, DownloadOutlined } from '@ant-design/icons';
import x from '../../assets/img/x.png'

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer style={{ textAlign: 'center', margin: '0 16px' }}>
      <Row gutter={[16, 16]} justify="center">
        <Col span={6}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FacebookOutlined style={{ fontSize: '30px', color: '#1877f2' }} /><br></br>
            Facebook
          </a>
        </Col>
        <Col span={6}>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={x} style={{ width: '30px', color: '#1da1f2' }}></img><br></br>
            X
          </a>
        </Col>
        <Col span={6}>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramOutlined style={{ fontSize: '30px', color: '#c13584' }} /><br></br>
            Instagram
          </a>
        </Col>
        <Col span={6}>
          <CheckCircleOutlined style={{ fontSize: '30px', color: 'green' }} />
          <p>Envíos en 24h</p>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center" style={{ marginTop: '20px' }}>
        <Col span={6}>
          <Card>
            <CreditCardOutlined style={{ fontSize: '30px' }} />
            <p>Formas de Pago:</p>
            <p>Aceptamos Visa, Mastercard, y más.</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <CustomerServiceOutlined style={{ fontSize: '30px' }} />
            <p>Compromiso con el Cliente:</p>
            <p>Atención al cliente 24/7 y devoluciones gratuitas.</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <RocketOutlined style={{ fontSize: '30px' }} />
            <p>Información de Envío:</p>
            <p>Envío gratis en pedidos superiores a 50€.</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <DownloadOutlined style={{ fontSize: '30px' }} />
            <p>Descargar App:</p>
            <p>Disponible en Play Store y App Store.</p>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center" style={{ marginTop: '20px' }}>
        <Col span={6}>
          <a style={{ fontFamily: 'basica' }} href="/quiensomos">Quiénes somos</a>
        </Col>
        <Col span={6}>
          <a style={{ fontFamily: 'basica' }} href="/faq">FAQ</a>
        </Col>
        <Col span={6}>
          <a style={{ fontFamily: 'basica' }} href="/contactanos">Contáctanos</a>
        </Col>
        <Col span={6}>
          <a style={{ fontFamily: 'basica' }} href="/terminoscondiciones">Términos y Condiciones</a>
        </Col>
      </Row>
      <p style={{ fontFamily: 'fantasy', marginTop: '5%' }}>&copy;{new Date().getFullYear()} <span style={{ fontFamily: 'basica' }}>PC Piezas. Creado por Arnold</span></p>
    </Footer>
  );
};

export default FooterComponent;
