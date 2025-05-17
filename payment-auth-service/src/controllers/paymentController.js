import { config } from 'dotenv';
config();

import Stripe from 'stripe';
import Payment from '../models/paymentModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPayment = async (req, res) => {
    const { orderId, userId, amount } = req.body;

    if (!orderId || !userId || !amount) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "usd",
            metadata: { orderId, userId },
        });

        const payment = await Payment.create({
            orderId,
            userId,
            amount,
            paymentMethod: "Stripe",
            status: "pending",
            transactionId: paymentIntent.id,
        });

        res.status(201).json({
            message: "Payment intent created successfully",
            clientSecret: paymentIntent.client_secret,
            payment,
        });
    } catch (error) {
        console.error("Error creating payment intent:", error.message);
        res.status(500).json({ message: "Payment creation failed" });
    }
};

export const getPaymentStatus = async (req, res) => {
    const { orderId } = req.params;

    if (!orderId) {
        return res.status(400).json({ message: "Order ID is required" });
    }

    try {
        const payment = await Payment.findOne({ orderId });

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.status(200).json(payment);
    } catch (error) {
        console.error("Error fetching payment status:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const handleStripeWebhook = async (req, res) => {
    let event = req.body;
  
    try {
        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
            const transactionId = paymentIntent.id;
  
            console.log('Webhook received for PaymentIntent ID:', transactionId);
  
            const updatedPayment = await Payment.findOneAndUpdate(
                { transactionId },
                { status: "completed" },
                { new: true }
            );
  
            if (updatedPayment) {
                console.log('✅ Payment status updated in MongoDB!');
            } else {
                console.log('❌ No payment found with transactionId:', transactionId);
            }
        }
  
        res.json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error.message);
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
};

export default {
    createPayment,
    getPaymentStatus,
    handleStripeWebhook
};