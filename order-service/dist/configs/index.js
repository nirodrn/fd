"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var config = {
  DB_CONNECTION_STRING: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  PORT: process.env.PORT,
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  USER_SERVICE_URL: process.env.USER_SERVICE_URL,
  RESTAURANT_SERVICE_URL: process.env.RESTAURANT_SERVICE_URL
};
var _default = exports["default"] = config;