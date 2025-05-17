"use strict";

require("dotenv/config");
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _logger = _interopRequireDefault(require("./utils/logger.js"));
var _databaseConnection = require("./utils/database.connection.js");
var _orderRoutes = _interopRequireDefault(require("./routes/orderRoutes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
var PORT = process.env.PORT || "5002";
app.use((0, _cors["default"])());
app.use(_express["default"].json({
  limit: "20mb"
}));
app.get("/", function (req, res, next) {
  res.send("<h2>Order Management API</h2>");
  next();
});
app.use('/', _orderRoutes["default"]);
app.listen(PORT, function () {
  _logger["default"].info("Order Server is up and running on PORT ".concat(PORT));
  (0, _databaseConnection.connect)();
});