import { config } from 'dotenv';
config();

export default {
    DB_CONNECTION_STRING: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
    USER_SERVICE_URL: process.env.USER_SERVICE_URL,
    ORDER_SERVICE_URL: process.env.ORDER_SERVICE_URL
};