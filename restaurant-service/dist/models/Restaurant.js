"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var RestaurantSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ownerId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  cuisineType: {
    type: String
  },
  isOpen: {
    type: Boolean,
    "default": true
  },
  approved: {
    type: Boolean,
    "default": true
  },
  status: {
    type: String,
    "enum": ["pending", "approved", "rejected"],
    "default": "approved"
  },
  rating: {
    type: Number,
    "default": 0
  },
  location: {
    latitude: {
      type: Number,
      required: false
    },
    longitude: {
      type: Number,
      required: false
    }
  },
  images: [{
    url: String,
    publicId: String
  }],
  description: {
    type: String
  },
  openingHours: {
    type: String
  },
  closingHours: {
    type: String
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});

// Index for geospatial queries
RestaurantSchema.index({
  location: "2dsphere"
});
var _default = exports["default"] = (0, _mongoose.model)("Restaurant", RestaurantSchema);