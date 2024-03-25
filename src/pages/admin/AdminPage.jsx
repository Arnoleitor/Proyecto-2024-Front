import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useGetUser } from '../../store/user/userSelectors';
import TicketsAdmin from '../admin/componentes/TicketsAdmin';
import Usuarios from '../admin/componentes/Usuarios';
import Pedidos from './componentes/Pedidos';
import Productos from './componentes/Productos';
import ContactoMensaje from './componentes/ContactoMensaje';

const AdminPanel = () => {
  const navigate = useNavigate();
  const userData = useGetUser();

  useEffect(() => {
    if (!userData || userData.role !== 1) {
      navigate('/');
    }
  }, [userData, navigate]);

  if (!userData || userData.role !== 1) {
    return message.error("No tienes permisos")
  }

  return (
    <>
      <Usuarios />
      <Productos />
      <Pedidos />
      <TicketsAdmin />
      <ContactoMensaje />
    </>
  );
};

export default AdminPanel;
