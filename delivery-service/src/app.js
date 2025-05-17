import { config } from 'dotenv';
config();

import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import logger from "./utils/logger.js";
import { connect } from "./utils/database.connection.js";
import deliveryRoutes from './routes/deliveryRoutes.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || "4002";

app.use(cors());
app.use(express.json({ limit: "20mb" }));

// Socket.IO connection handling
io.on("connection", (socket) => {
  logger.info(`Socket connected: ${socket.id}`);

  socket.on("location_update", (data) => {
    // Broadcast location update to relevant clients
    io.emit(`delivery_location_${data.deliveryId}`, data);
  });

  socket.on("disconnect", () => {
    logger.info(`Socket disconnected: ${socket.id}`);
  });
});

app.use('/api/delivery', deliveryRoutes);

httpServer.listen(PORT, () => {
  logger.info(`Delivery Server is running on PORT ${PORT}`);
  connect();
});