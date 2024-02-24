import Carrito from "../Carrito";

const HeaderComponent = () => {
  return (
    <>
      <div  style={{ fontSize: '25px', fontFamily: 'fantasy', width: '100%', display: "flex", justifyContent: 'space-between'}}>
          PC Piezas -   Tu tienda de componentes
          <Carrito />
      </div>
    </>
  );
};

export default HeaderComponent;
