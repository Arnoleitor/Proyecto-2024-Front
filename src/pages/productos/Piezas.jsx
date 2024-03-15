import React, { useEffect, useState } from 'react';
import Grid from '../../components/Grid';
import axios from 'axios';
import SearchBar from '../../components/Searcher/SearcherBar';
import CarrouselOfertas from '../../components/Carrousel/CarrouselOfertas';

const Piezas = () => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [descripcionFilter, setDescripcionFilter] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

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

  const handleSearch = (descripcion, selectedOption) => {
    setDescripcionFilter(descripcion);
  
    const filtered = productos.filter((producto) => {
      const fieldValue = producto[selectedOption];
      
      if (selectedOption === 'precio') {
        // Si el campo seleccionado es 'precio', filtramos por el precio base y por el precio con descuento
        const precioBase = producto.precio;
        const precioConDescuento = producto.descuento ? (precioBase - (precioBase * producto.descuento / 100)) : precioBase;
        return precioBase.toString().toLowerCase().includes(descripcion.toLowerCase()) ||
               precioConDescuento.toString().toLowerCase().includes(descripcion.toLowerCase());
      } else if (typeof fieldValue === 'string') {
        return fieldValue.toLowerCase().includes(descripcion.toLowerCase());
      } else if (typeof fieldValue === 'number') {
        return fieldValue.toString().toLowerCase().includes(descripcion.toLowerCase());
      }
      return false;
    });
    setFilteredProductos(filtered);
};

  return (
    <div>
      <div>
        <SearchBar onSearch={handleSearch} onSelectChange={setSelectedOption} />
      </div>
      <CarrouselOfertas productos={filteredProductos} />
      <Grid productos={filteredProductos} />
    </div>
  );
};

export default Piezas;
