"use strict";

var _dotenv = require("dotenv");
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _http = require("http");
var _socket = require("socket.io");
var _logger = _interopRequireDefault(require("./utils/logger.js"));
var _databaseConnection = require("./utils/database.connection.js");
var _deliveryRoutes = _interopRequireDefault(require("./routes/deliveryRoutes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
(0, _dotenv.config)();
var app = (0, _express["default"])();
var httpServer = (0, _http.createServer)(app);
var io = new _socket.Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
var PORT = process.env.PORT || "4002";
app.use((0, _cors["default"])());
app.use(_express["default"].json({
  limit: "20mb"
}));

// Socket.IO connection handling
io.on("connection", function (socket) {
  _logger["default"].info("Socket connected: ".concat(socket.id));
  socket.on("location_update", function (data) {
    // Broadcast location update to relevant clients
    io.emit("delivery_location_".concat(data.deliveryId), data);
  });
  socket.on("disconnect", function () {
    _logger["default"].info("Socket disconnected: ".concat(socket.id));
  });
});
app.use('/api/delivery', _deliveryRoutes["default"]);
httpServer.listen(PORT, function () {
  _logger["default"].info("Delivery Server is running on PORT ".concat(PORT));
  (0, _databaseConnection.connect)();
});