import { config } from 'dotenv';
config();

import express from "express";
import cors from "cors";
import logger from "./utils/logger.js";
import { connect } from "./utils/database.connection.js";
import restaurantRoutes from './routes/restaurantRoutes.js';
import menuRoutes from './routes/menuRoutes.js';

const app = express();
const PORT = process.env.PORT || "5001";

app.use(cors());
app.use(express.json({limit:"20mb"}));

app.get("/", (req, res, next) => {
    res.send("<h2>Restaurant system API</h2>");
    next();
});

app.use("/", restaurantRoutes);
app.use("/", menuRoutes);

app.listen(PORT, () => {
    logger.info(`Restaurant Server is up and running on PORT ${PORT}`);
    connect();
});