import axios from 'axios';
import config from '../configs/index.js';

export const getUserById = async (userId, token) => {
  try {
    const response = await axios.get(`${config.USER_SERVICE_URL}/get-profile`, {
      headers: { Authorization: token }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error.response?.data || error.message);
    return null;
  }
};

export const verifyDeliveryPerson = async (userId, token) => {
  try {
    const user = await getUserById(userId, token);
    return user && user.role === 'delivery_person';
  } catch (error) {
    console.error('Error verifying delivery person:', error);
    return false;
  }
};