"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var OrderSchema = new _mongoose["default"].Schema({
  userId: {
    type: String,
    required: true
  },
  restaurantId: {
    type: String,
    required: true
  },
  items: [{
    menuItemId: String,
    name: String,
    price: Number,
    quantity: Number
  }],
  deliveryAddress: {
    type: String,
    required: false
  },
  deliveryLocation: {
    type: String,
    required: false
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    "default": "cash"
  },
  paymentStatus: {
    type: String,
    "default": "pending"
  },
  orderStatus: {
    type: String,
    "enum": ["ready-to-checkout", "order-placed", "confirmed", "preparing", "picked-up", "on-the-way", "rejected", "cancelled", "completed"],
    "default": "ready-to-checkout"
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
var _default = exports["default"] = _mongoose["default"].model("Order", OrderSchema);