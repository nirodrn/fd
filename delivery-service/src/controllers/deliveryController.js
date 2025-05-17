import Delivery from '../models/Delivery.js';
import { getDirections } from '../utils/mapboxService.js';
import { geocodeAddress } from '../utils/geocodingService.js';
import { getUserById } from '../utils/userService.js';
import { getOrderById } from '../utils/orderService.js';

// Get delivery history for delivery person
export const getDeliveryHistory = async (req, res) => {
  try {
    const deliveries = await Delivery.find({
      deliveryPersonId: req.user.userId,
      status: { $in: ['delivered', 'cancelled'] }
    })
    .sort({ createdAt: -1 })
    .limit(20);

    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all deliveries for a customer
export const getCustomerDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({
      customerId: req.user.userId
    })
    .sort({ createdAt: -1 })
    .limit(20);

    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new delivery
export const createDelivery = async (req, res) => {
  try {
    const { orderId, pickupAddress, dropoffAddress } = req.body;

    // Verify order exists and belongs to customer
    const order = await getOrderById(orderId, req.headers.authorization);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to create delivery for this order' });
    }

    // Geocode addresses
    const pickupLocation = await geocodeAddress(pickupAddress);
    const dropoffLocation = await geocodeAddress(dropoffAddress);

    // Get route from Mapbox
    const route = await getDirections(
      [pickupLocation.longitude, pickupLocation.latitude],
      [dropoffLocation.longitude, dropoffLocation.latitude]
    );

    const delivery = new Delivery({
      orderId,
      customerId: req.user.userId,
      pickupLocation: {
        address: pickupAddress,
        ...pickupLocation
      },
      dropoffLocation: {
        address: dropoffAddress,
        ...dropoffLocation
      },
      route,
      status: 'pending',
      estimatedDeliveryTime: new Date(Date.now() + route.duration * 1000)
    });

    await delivery.save();
    res.status(201).json(delivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update delivery status
export const updateDeliveryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, currentLocation } = req.body;

    const delivery = await Delivery.findById(id);
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }

    // Verify the delivery person is authorized
    if (delivery.deliveryPersonId !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this delivery' });
    }

    const updatedDelivery = await Delivery.findByIdAndUpdate(
      id,
      {
        status,
        ...(currentLocation && {
          currentLocation: {
            ...currentLocation,
            lastUpdated: new Date()
          }
        })
      },
      { new: true }
    );

    res.json(updatedDelivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get delivery by ID
export const getDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }

    // Verify user is authorized (customer or assigned delivery person)
    if (delivery.customerId !== req.user.userId && delivery.deliveryPersonId !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to view this delivery' });
    }

    res.json(delivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all active deliveries for a delivery person
export const getDeliveriesByDeliveryPerson = async (req, res) => {
  try {
    const deliveries = await Delivery.find({
      deliveryPersonId: req.user.userId,
      status: { $in: ['assigned', 'picked_up', 'in_transit'] }
    }).sort({ createdAt: -1 });

    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get active delivery for customer
export const getActiveDeliveryForCustomer = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const delivery = await Delivery.findOne({
      orderId,
      customerId: req.user.userId,
      status: { $in: ['pending', 'assigned', 'picked_up', 'in_transit'] }
    });
    
    if (!delivery) {
      return res.status(404).json({ message: 'No active delivery found' });
    }
    
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get available deliveries for delivery persons
export const getAvailableDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({
      deliveryPersonId: null,
      status: 'pending'
    }).sort({ createdAt: 1 });

    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept delivery
export const acceptDelivery = async (req, res) => {
  try {
    const { deliveryId } = req.params;

    const delivery = await Delivery.findOneAndUpdate(
      {
        _id: deliveryId,
        deliveryPersonId: null,
        status: 'pending'
      },
      {
        deliveryPersonId: req.user.userId,
        status: 'assigned'
      },
      { new: true }
    );

    if (!delivery) {
      return res.status(400).json({ message: 'Delivery not available' });
    }

    res.json(delivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};