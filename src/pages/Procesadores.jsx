import React, { useEffect, useState } from 'react';
import Grid from '../components/Grid';
import fetchProductos from '../services/getProductosTipo';

const Procesadores = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const getProductos = async () => {
            try {
                const productosData = await fetchProductos(1);
                setProductos(productosData);
            } catch (error) {
                console.error("Error fetching productos:", error);
            }
        };

        getProductos();
    }, []);

    return (
        <div>
            <h1>Procesadores</h1>
            <Grid productos={productos} />
        </div>
    );
};

export default Procesadores;