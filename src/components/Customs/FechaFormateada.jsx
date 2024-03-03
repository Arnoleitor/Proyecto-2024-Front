import React from "react";

const FechaFormateada = ({ timestamp }) => {
  const formatFecha = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return <span>{formatFecha(timestamp)}</span>;
};

export default FechaFormateada;
