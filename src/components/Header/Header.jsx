import { UsbOutlined } from "@ant-design/icons";
import Carrito from "../Carrito";

const HeaderComponent = () => {
  return (
    <>
      <div  style={{ fontSize: '25px', fontFamily: 'fantasy', width: '100%'}}>
          PC Piezas <UsbOutlined style={{marginLeft: '1%'}} />Tu tienda de componentes
      </div>
          <Carrito />
    </>
  );
};

export default HeaderComponent;
