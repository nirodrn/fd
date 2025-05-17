"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var _default = exports["default"] = {
  DB_CONNECTION_STRING: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
  USER_SERVICE_URL: process.env.USER_SERVICE_URL,
  ORDER_SERVICE_URL: process.env.ORDER_SERVICE_URL
};