"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var MenuSchema = new _mongoose.Schema({
  restaurantId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String
  },
  // E.g., "Beverage", "Main Course", etc.

  isAvailable: {
    type: Boolean,
    "default": true
  },
  images: [{
    url: String,
    publicId: String
  }],
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
var _default = exports["default"] = (0, _mongoose.model)("Menu", MenuSchema);