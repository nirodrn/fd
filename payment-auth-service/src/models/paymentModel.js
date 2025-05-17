import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["PayHere", "Stripe", "PayPal"], required: true },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "completed" },
    transactionId: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Payment', PaymentSchema);