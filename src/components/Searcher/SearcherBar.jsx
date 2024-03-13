import React from 'react';
import { Input } from 'antd';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (value) => {
    onSearch(value);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <Input.Search
        placeholder="Buscar productos"
        enterButton="Buscar"
        size="large"
        onSearch={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
