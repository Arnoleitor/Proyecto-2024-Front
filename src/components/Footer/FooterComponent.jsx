import { Layout, Row, Col } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';

const { Footer } = Layout;

const FooterComponent  = () => {
  return (
    <Footer style={{ textAlign: 'center', margin: '0 16px' }}>

      <Row justify="center">
        <Col span={6}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FacebookOutlined style={{ fontSize: '30px', color: '#1877f2' }} />
          </a>
        </Col>
        <Col span={6}>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <TwitterOutlined style={{ fontSize: '30px', color: '#1da1f2' }} />
          </a>
        </Col>
        <Col span={6}>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramOutlined style={{ fontSize: '30px', color: '#c13584' }} />
          </a>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={4}>
          <a style={{fontFamily:'basica'}} href="/quiensomos">Quiénes somos</a>
        </Col>
        <Col span={4}>
          <a style={{fontFamily:'basica'}} href="/faq">FAQ</a>
        </Col>
        <Col span={4}>
          <a style={{fontFamily:'basica'}} href="/contactanos">Contáctanos</a>
        </Col>
      </Row>
      <p style={{ fontFamily: 'fantasy', marginTop:'5%' }}>&copy;{new Date().getFullYear()} <span style={{fontFamily:'basica'}}>PC Piezas. Creado por Arnold</span></p>
    </Footer>
  );
};

export default FooterComponent;
