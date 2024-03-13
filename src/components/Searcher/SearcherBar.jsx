import React, { useState } from 'react';
import { Input } from 'antd';

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <Input.Search
        placeholder="Buscar productos"
        enterButton="Buscar"
        size="large"
        value={searchValue}
        onChange={handleChange}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
