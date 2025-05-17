import NodeGeocoder from 'node-geocoder';
import config from '../configs/index.js';

const geocoder = NodeGeocoder({
  provider: 'google',
  apiKey: config.GOOGLE_MAPS_API_KEY
});

export const geocodeAddress = async (address) => {
  try {
    const results = await geocoder.geocode(address);
    if (!results.length) {
      throw new Error('Address not found');
    }
    
    return {
      latitude: results[0].latitude,
      longitude: results[0].longitude
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
};