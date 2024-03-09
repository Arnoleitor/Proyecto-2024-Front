const EstadoTicket = ({ estado }) => {
    let color;
  
    switch (estado) {
      case 'Abierto':
        color = 'green';
        break;
      case 'En progreso':
        color = 'yellow';
        break;
      case 'Cerrado':
        color = 'red';
        break;
      default:
        color = 'gray';
    }
  
    const estiloCirculo = {
      display: 'inline-block',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: color,
      marginRight: '5px',
    };
  
    return <span style={estiloCirculo}></span>;
  };

  export default EstadoTicket;
