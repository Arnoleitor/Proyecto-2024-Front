import React, { useEffect, useState } from 'react';
import Grid from '../../components/Grid';
import axios from 'axios';
import SearchBar from '../../components/Searcher/SearcherBar';
import CarrouselOfertas from '../../components/Carrousel/CarrouselOfertas';
import { Divider } from 'antd';

const Piezas = () => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [descripcionFilter, setDescripcionFilter] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/recibirProducto`);
        const productosTGraficas = response.data;
        setProductos(productosTGraficas);
        setFilteredProductos(productosTGraficas);
      } catch (error) {
        console.error('Error al obtener productos:', error.message);
      }
    };

    fetchProductos();
  }, []);

  const handleSearch = (descripcion) => {
    setDescripcionFilter(descripcionFilter);

    const filtered = productos.filter((producto) =>
      producto.descripcion.toLowerCase().includes(descripcion.toLowerCase())
    );
    setFilteredProductos(filtered);
  };

  return (
    <div>
      <h1>Todos los productos</h1>
      <Divider/>
      <div>
        <SearchBar onSearch={handleSearch} />
      </div>
      <CarrouselOfertas productos={productos} />
      <Grid productos={filteredProductos} />
    </div>
  );
};

export default Piezas;
