import axios from 'axios';
import config from '../configs/index.js';

export const getOrderById = async (orderId, token) => {
  try {
    const response = await axios.get(`${config.ORDER_SERVICE_URL}/orders/${orderId}`, {
      headers: { Authorization: token }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error.response?.data || error.message);
    return null;
  }
};