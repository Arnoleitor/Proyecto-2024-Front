import React, { useEffect, useState } from 'react';
import Grid from '../../components/Grid';
import axios from 'axios';
import SearchBar from '../../components/Searcher/SearcherBar';

const Piezas = () => {
  const [productos, setProductos] = useState([]);
  const [descripcionFilter, setDescripcionFilter] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/recibirProducto`);
        const productosTGraficas = response.data;
        setProductos(productosTGraficas);
      } catch (error) {
        console.error('Error al obtener productos:', error.message);
      }
    };

    fetchProductos();
  }, []);

  const filteredProductos = productos.filter((producto) =>
    producto.descripcion.toLowerCase().includes(descripcionFilter.toLowerCase())
  );

  const handleSearch = (descripcion) => {
    setDescripcionFilter(descripcion);
  };

  return (
    <div>
      <h1>Todos los productos</h1>
      <div>
        <SearchBar onSearch={handleSearch} />
      </div>
      <Grid productos={filteredProductos} />
    </div>
  );
};

export default Piezas;
