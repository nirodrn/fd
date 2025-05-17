import axios from "axios";
import config from "../configs/index.js";

const USER_SERVICE_URL = config.USER_SERVICE_URL;
console.log("Using user service at:", USER_SERVICE_URL);

export const getUserById = async (userId, token) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/get-profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error.message);
    return null;
  }
};

export const getUserLocation = async (userId, token) => {
  try {
    const user = await getUserById(userId, token);
    
    if (!user) {
      console.error('User not found');
      return null;
    }

    if (user.location?.latitude && user.location?.longitude) {
      return {
        latitude: user.location.latitude,
        longitude: user.location.longitude
      };
    }

    if (user.latitude && user.longitude) {
      return {
        latitude: user.latitude,
        longitude: user.longitude
      };
    }

    console.error('User location data missing or incomplete');
    return null;
  } catch (error) {
    console.error("Error in getUserLocation:", error);
    throw error;
  }
};