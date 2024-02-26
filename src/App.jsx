import React, { lazy, Suspense } from 'react';
import { Layout, theme } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/Header/Header';
import MenuComponent from './components/Menu/Menu';
import FooterComponent from './components/Footer/FooterComponent';
import Help from './components/Help/Help';

const { Header, Content, Sider } = Layout;

const Piezas = lazy(() => import('./pages/Piezas'));
const Motherboards = lazy(() => import('./pages/Motherboards'));
const Tgraficas = lazy(() => import('./pages/Tgraficas'));

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
                    <Suspense fallback={<div>Cargando...</div>}>
                      <Routes>
                        <Route path="/" element={<Piezas />} />
                        <Route path="/Motherboards" element={<Motherboards />} />
                        <Route path="/Tgraficas" element={<Tgraficas />} />
                      </Routes>
                    </Suspense>
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
