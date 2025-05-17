import express from 'express';
import paymentController from '../controllers/paymentController.js';

const router = express.Router();

router.post('/pay', paymentController.createPayment);
router.get('/payment-status/:orderId', paymentController.getPaymentStatus);

// Add webhook endpoint
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handleStripeWebhook);

export default router;