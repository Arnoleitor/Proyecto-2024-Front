import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Localizacion = () => {
  const [location, setLocation] = useState(null);
  const [licence, setLicence] = useState(null);
  const [state, setState] = useState(null);
  const [postCode, setPostCode] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

          const response = await axios.get(apiUrl);
          const city =
            response.data.address.city ||
            response.data.address.village ||
            response.data.address.state ||
            response.data.address.state_district ||
            response.data.address.isolated_dwelling;

          setLocation(city);
          setLicence(response.data.licence);
          setState(response.data.address.state);
          setPostCode(response.data.address.postcode);
        });
      } catch (error) {
        console.error('Error al obtener la ubicación:', error);
        setLocation('Error al obtener la ubicación');
      }
    };

    fetchLocation();
  }, []);

  return (
    <div style={{ marginTop: '1%', fontFamily: 'inherit', letterSpacing: '2px' }}>
      {location ? (
        <div>
          <p>Tu ubicación actual: <strong>{location} - {state} - {postCode}</strong></p>
          <p>Ubicación obtenida por: <strong>{licence}</strong></p>
        </div>
      ) : (
        <p>Obteniendo ubicación...</p>
      )}
    </div>
  );
};

export default Localizacion;
