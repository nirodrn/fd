import mongoose from 'mongoose';

const DeliverySchema = new mongoose.Schema({
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
    enum: ['pending', 'assigned', 'picked_up', 'in_transit', 'delivered', 'cancelled'],
    default: 'pending'
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
    default: Date.now
  }
});

export default mongoose.model('Delivery', DeliverySchema);