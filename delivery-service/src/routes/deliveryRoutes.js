import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { deliveryPersonOnly, customerOnly } from '../middleware/roleMiddleware.js';
import {
  createDelivery,
  updateDeliveryStatus,
  getDeliveryById,
  getDeliveriesByDeliveryPerson,
  getActiveDeliveryForCustomer,
  getAvailableDeliveries,
  acceptDelivery,
  getDeliveryHistory,
  getCustomerDeliveries
} from '../controllers/deliveryController.js';

const router = express.Router();

// Delivery Person Routes
router.get('/delivery-person/active', authMiddleware, deliveryPersonOnly, getDeliveriesByDeliveryPerson);
router.get('/delivery-person/available', authMiddleware, deliveryPersonOnly, getAvailableDeliveries);
router.get('/delivery-person/history', authMiddleware, deliveryPersonOnly, getDeliveryHistory);
router.post('/delivery-person/accept/:deliveryId', authMiddleware, deliveryPersonOnly, acceptDelivery);
router.put('/:id/status', authMiddleware, deliveryPersonOnly, updateDeliveryStatus);

// Customer Routes
router.get('/customer/active', authMiddleware, customerOnly, getCustomerDeliveries);
router.get('/customer/:orderId', authMiddleware, customerOnly, getActiveDeliveryForCustomer);

// Shared Routes
router.post('/create', authMiddleware, createDelivery);
router.get('/:id', authMiddleware, getDeliveryById);

export default router;