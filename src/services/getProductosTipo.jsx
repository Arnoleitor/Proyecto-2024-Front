import axios from 'axios';

const getProductosTipo = async (tipoProducto) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/productosPorTipo/${tipoProducto}`);
        return response.data.filter(producto => producto.tipo === tipoProducto);
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        throw error;
    }
};

export default getProductosTipo;