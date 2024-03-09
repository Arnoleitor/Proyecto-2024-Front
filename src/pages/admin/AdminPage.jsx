import Usuarios from '../admin/componentes/Usuarios';
import Pedidos from './componentes/Pedidos';
import Productos from './componentes/Productos';

const AdminPanel = () => {
  return (
    <>
      <Usuarios />
      <Productos />
      <Pedidos/>
    </>
  );
};

export default AdminPanel;