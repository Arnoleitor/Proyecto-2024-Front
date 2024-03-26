import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-moment';

const MyChart = ({ historico }) => {
  if (!historico || historico.length === 0) {
    return <div>No hay datos de historial disponibles.</div>;
  }

  const fechas = historico.map(entry => entry.fechaPrecio);
  const precios = historico.map(entry => entry.precio);

  const data = {
    labels: fechas,
    datasets: [
      {
        label: 'Precio',
        data: precios,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  // Opciones del gráfico
  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM D'
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Precio (€)'
        }
      }
    }
  };

  return (
    <div>
      <h2>Historial de Precios</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default MyChart;
