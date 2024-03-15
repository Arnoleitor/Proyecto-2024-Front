import { SearchOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import { useState } from "react";

const SearchBar = ({ onSearch, onSelectChange }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('descripcion'); // Establece por defecto "descripcion"

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value, selectedOption);
  };

  const handleSelectChange = (value) => {
    setSelectedOption(value);
    onSelectChange(value);
  };

  return (
    <div className='buscador' style={{ marginBottom: 16}}>
      <Input
        style={{ borderColor: '#87a7d3' }}
        placeholder="Buscar productos"
        size="large"
        value={searchValue}
        onChange={handleChange}
        suffix={<SearchOutlined style={{ cursor: 'pointer' }} />}
      />
      <Select
        style={{ width: 200, marginLeft: 16 }}
        onChange={handleSelectChange}
        value={selectedOption}
      >
        <Option value="descripcion">Nombre</Option>
        <Option value="precio">Precio</Option>
      </Select>
    </div>
  );
};

export default SearchBar;
