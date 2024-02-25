import { Layout, theme } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/Header/Header';
import MenuComponent from './components/Menu/Menu';
import Piezas from './pages/Piezas';
import Motherboards from './pages/Motherboards'
import FooterComponent from './components/Footer/FooterComponent';
import Help from './components/Help/Help';

const { Header, Content, Sider } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout>
        <Layout>
          <Header style={{ display: 'flex', alignItems: 'center', background: colorBgContainer }}>
            <HeaderComponent />
          </Header>
          <Layout>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={(broken) => {
                console.log(broken);
              }}
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
              }}
            >
              <div className="demo-logo-vertical" />
              <MenuComponent />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content
                style={{
                  margin: '24px 16px 0',
                }}
              >
                <div
                  style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <Router>
                    <Routes>
                      <Route path="/" element={<Piezas />} />
                      <Route path="/Motherboards" element={<Motherboards />} />
                    </Routes>
                  </Router>
                </div>
                <Help />
              </Content>
              <FooterComponent />
            </Layout>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
