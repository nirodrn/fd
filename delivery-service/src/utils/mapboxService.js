import mbxDirections from '@mapbox/mapbox-sdk/services/directions.js';
import config from '../configs/index.js';

const directionsClient = mbxDirections({ accessToken: config.MAPBOX_API_KEY });

export const getDirections = async (start, end) => {
  try {
    const response = await directionsClient
      .getDirections({
        profile: 'driving',
        geometries: 'geojson',
        waypoints: [
          { coordinates: start },
          { coordinates: end }
        ]
      })
      .send();

    return response.body.routes[0];
  } catch (error) {
    console.error('Error getting directions:', error);
    throw error;
  }
};