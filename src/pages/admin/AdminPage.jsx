import TicketsAdmin from '../../components/Tickets/TicketsAdmin';
import Usuarios from '../admin/componentes/Usuarios';
import Pedidos from './componentes/Pedidos';
import Productos from './componentes/Productos';

const AdminPanel = () => {
  return (
    <>
      <Usuarios />
      <Productos />
      <Pedidos/>
      <TicketsAdmin/>
    </>
  );
};

export default AdminPanel;
