
const pasos = [
    {
        id: 'intro',
        message: 'Hola soy Alexia, ¿cuál es tu nombre?',
        trigger: 'pregunta-nombre',
      },
      {
        id: 'pregunta-nombre',
        user: true,
        validator: (value) => {
          if (/^[A-Z]{1}[a-z]{2,15}$/.test(value)) {
            return true;
          } else {
            return 'Por favor, introduce un nombre válido.';
          }
        },
        trigger: 'respuesta-nombre',
      },
      {
        id: 'respuesta-nombre',
        message: 'Hola {previousValue}, encantada de poder ayudarte.',
        trigger: 'pregunta-need',
      },
      {
        id: 'pregunta-need',
        message: '¿Necesitas ayuda con tu pedido?',
        trigger: 'respuesta-need',
      },
      {
        id: 'respuesta-need',
        options: [
          { value: 's', label: 'Sí', trigger: 'mensaje-need-a' },
          { value: 'n', label: 'No', trigger: 'mensaje-need-b' },
        ],
      },
      {
        id: 'mensaje-need-a',
        message: 'Ok, tendras que mandar un ticket a soporte, en la parte inferior derecha encontraras un botón que dice "Necesitas ayuda?", si tienes una sesión activa puedes también usar el botón superior que pone "Soporte".',
        end: true,
      },
      {
        id: 'mensaje-need-b',
        message: 'Vale, seguimos entonces.',
        trigger: 'pregunta-need2',
      },
      {
        id: 'pregunta-need2',
        message: '¿Necesitas ayuda sobre cómo comprar un producto?',
        trigger: 'respuesta-need2',
      },
      {
        id: 'respuesta-need2',
        options: [
          { value: 's', label: 'Sí', trigger: 'mensaje-need-a2' },
          { value: 'n', label: 'No', trigger: 'mensaje-need-b2' },
        ],
      },
      {
        id: 'mensaje-need-a2',
        message: 'Ok, para comprar un producto debes darle al botón inferior del mismo "Agregar al carrito". Cuando tengas los productos necesarios, ve a tu cesta y haz clic en "Comprar".',
        end: true,
      },
      {
        id: 'mensaje-need-b2',
        message: 'Vale, seguimos entonces.',
        trigger: 'pregunta-need3',
      },
      {
        id: 'pregunta-need3',
        message: '¿Necesitas ayuda para ver o descargar tus facturas?',
        trigger: 'respuesta-need3',
      },
      {
        id: 'respuesta-need3',
        options: [
          { value: 's', label: 'Sí', trigger: 'mensaje-need-a3' },
          { value: 'n', label: 'No', trigger: 'mensaje-need-b3' },
        ],
      },
      {
        id: 'mensaje-need-a3',
        message: 'Ok, una vez realices tu compra, debes ir a tus pedidos (situado donde aparece tu nombre en la parte superior). Allí verás todos los pedidos que has realizado. Tendrás dos opciones: descargarlas o verlas. Selecciona la que prefieras.',
        end: true,
      },
      {
        id: 'mensaje-need-b3',
        message: 'Ok, si tienes otras dudas, tendrás que enviar un ticket a soporte, en la parte inferior derecha encontraras un boton que dice "Necesitas ayuda?", si tienes una sesión activa puedes también usar el boton superior que pone "Soporte".',
        end: true,
      },
      
  ]

  export default pasos