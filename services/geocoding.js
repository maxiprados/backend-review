import axios from 'axios';

/**
 * Servicio de geocoding usando OpenStreetMap Nominatim (gratuito)
 * Convierte una dirección postal en coordenadas GPS (lon, lat)
 */
export const geocodeAddress = async (address) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: address,
        format: 'json',
        limit: 1
      },
      headers: {
        'User-Agent': 'ReViews-App/1.0'
      }
    });

    if (response.data && response.data.length > 0) {
      const { lon, lat } = response.data[0];
      return {
        lon: parseFloat(lon),
        lat: parseFloat(lat)
      };
    } else {
      throw new Error('No se encontraron coordenadas para la dirección proporcionada');
    }
  } catch (error) {
    console.error('Error en geocoding:', error.message);
    throw new Error('Error al obtener coordenadas de la dirección');
  }
};
