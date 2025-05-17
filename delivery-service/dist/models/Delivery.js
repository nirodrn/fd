"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var DeliverySchema = new _mongoose["default"].Schema({
  orderId: {
    type: String,
    required: true
  },
  deliveryPersonId: {
    type: String,
    required: false
  },
  customerId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    "enum": ['pending', 'assigned', 'picked_up', 'in_transit', 'delivered', 'cancelled'],
    "default": 'pending'
  },
  pickupLocation: {
    address: String,
    latitude: Number,
    longitude: Number
  },
  dropoffLocation: {
    address: String,
    latitude: Number,
    longitude: Number
  },
  currentLocation: {
    latitude: Number,
    longitude: Number,
    lastUpdated: Date
  },
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  route: {
    type: Object,
    required: false
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
var _default = exports["default"] = _mongoose["default"].model('Delivery', DeliverySchema);