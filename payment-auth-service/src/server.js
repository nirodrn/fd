import { config } from 'dotenv';
config();

import app from './app.js';
import connectDB from './config/db.js';

connectDB();

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Payment Service running on port ${PORT}`));