import { Col, Divider, Row, } from 'antd';
import imagen from '../assets/img/procesador.webp'

const Grid = () => {

  return (
    <div className='Grid'>
      <br></br>
      <Row gutter={[32, 32]}>
        <Col span={6}>
          <div style={{ borderRadius: '20px' }}>
            <img
              src={imagen}
              alt="Descripción de la imagen"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </Col>
        <Col span={6}>
          <div style={{ borderRadius: '20px' }}>
            <img
              src={imagen}
              alt="Descripción de la imagen"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </Col>
        <Col span={6}>
          <div style={{ borderRadius: '20px' }}>
            <img
              src={imagen}
              alt="Descripción de la imagen"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </Col>
        <Col span={6}>
          <div style={{ borderRadius: '20px' }}>
            <img
              src={imagen}
              alt="Descripción de la imagen"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </Col>
      </Row>
      <Divider></Divider>
      <Row gutter={[32, 32]}>
        <Col span={6}>
          <div style={{ borderRadius: '20px' }}>
            <img
              src={imagen}
              alt="Descripción de la imagen"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </Col>
        <Col span={6}>
          <div style={{ borderRadius: '20px' }}>
            <img
              src={imagen}
              alt="Descripción de la imagen"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </Col>
        <Col span={6}>
          <div style={{ borderRadius: '20px' }}>
            <img
              src={imagen}
              alt="Descripción de la imagen"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </Col>
        <Col span={6}>
          <div style={{ borderRadius: '20px' }}>
            <img
              src={imagen}
              alt="Descripción de la imagen"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </Col>
      </Row> <Divider></Divider>
      <Row gutter={[32, 32]}>
        <Col span={6}>
          <div style={{ borderRadius: '20px' }}>
            <img
              src={imagen}
              alt="Descripción de la imagen"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </Col>
        <Col span={6}>
          <div style={{ borderRadius: '20px' }}>
            <img
              src={imagen}
              alt="Descripción de la imagen"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </Col>
        <Col span={6}>
          <div style={{ borderRadius: '20px' }}>
            <img
              src={imagen}
              alt="Descripción de la imagen"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </Col>
        <Col span={6}>
          <div style={{ borderRadius: '20px' }}>
            <img
              src={imagen}
              alt="Descripción de la imagen"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Grid;