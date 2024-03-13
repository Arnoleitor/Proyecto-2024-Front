import React, { useState } from 'react';
import { Input } from 'antd';

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div style={{ marginBottom: 16, width: '25%' }}>
      <Input
      style={{borderColor:'#87a7d3'}}
        placeholder="Buscar productos"
        size="large"
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
