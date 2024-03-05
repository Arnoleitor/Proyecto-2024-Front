import React, { lazy, Suspense } from 'react';
import { Layout, theme } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/Header/Header';
import MenuComponent from './components/Menu/Menu';
import FooterComponent from './components/Footer/FooterComponent';
import Help from './components/Help/Help';
import { useSelector } from 'react-redux';


const { Header, Content, Sider } = Layout;
const Piezas = lazy(() => import('./pages/Piezas'));
const Motherboards = lazy(() => import('./pages/Motherboards'));
const Tgraficas = lazy(() => import('./pages/Tgraficas'));
const Admin = lazy(() => import('./pages/Admin/Admin'));
const Pedidos = lazy(() => import('./pages/Pedidos'));
const Perfil = lazy(() => import('./pages/Perfil'));
const Faq = lazy(() => import('./pages/Faq'));
const QuienSomos = lazy(() => import('./pages/QuienSomos'));
const Contacto = lazy(() => import('./pages/Contacto'));
const Cables = lazy(() => import('./pages/Cables'));
const DiscosDuros = lazy(() => import('./pages/DiscosDuros'));
const Impresoras = lazy(() => import('./pages/Impresoras'));
const Pantallas = lazy(() => import('./pages/Pantallas'));
const Procesadores = lazy(() => import('./pages/Procesadores'));
const Ratones = lazy(() => import('./pages/Ratones'));
const Usb = lazy(() => import('./pages/Usb'));
const Teclados = lazy(() => import('./pages/Teclados'));

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const userData = useSelector((state) => state.user);

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
                  <Suspense fallback={<div>Cargando...</div>}>
                    <Routes>
                      <Route path="/" element={<Piezas />} />
                      <Route path="/motherboards" element={<Motherboards />} />
                      <Route path="/tgraficas" element={<Tgraficas />} />
                      <Route path="/perfil" element={<Perfil />} />
                      <Route path="/pedidos" element={<Pedidos />} />
                      <Route path="/quiensomos" element={<QuienSomos />} />
                      <Route path="/faq" element={<Faq />} />
                      <Route path="/Cables" element={<Cables />} />
                      <Route path="/contactanos" element={<Contacto />} />
                      <Route path="/DiscosDuros" element={<DiscosDuros />} />
                      <Route path="/Impresoras" element={<Impresoras />} />
                      <Route path="/Pantallas" element={<Pantallas />} />
                      <Route path="/Procesadores" element={<Procesadores />} />
                      <Route path="/Ratones" element={<Ratones />} />
                      <Route path="/Usb" element={<Usb />} />
                      <Route path="/Teclados" element={<Teclados />} />
                      {userData && userData.role === 1 && (
                      <Route path="/admin" element={<Admin userData={userData} />} />
                      )}
                    </Routes>
                  </Suspense>
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
