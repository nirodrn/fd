"use strict";

var _dotenv = require("dotenv");
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _logger = _interopRequireDefault(require("./utils/logger.js"));
var _databaseConnection = require("./utils/database.connection.js");
var _restaurantRoutes = _interopRequireDefault(require("./routes/restaurantRoutes.js"));
var _menuRoutes = _interopRequireDefault(require("./routes/menuRoutes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
(0, _dotenv.config)();
var app = (0, _express["default"])();
var PORT = process.env.PORT || "5001";
app.use((0, _cors["default"])());
app.use(_express["default"].json({
  limit: "20mb"
}));
app.get("/", function (req, res, next) {
  res.send("<h2>Restaurant system API</h2>");
  next();
});
app.use("/", _restaurantRoutes["default"]);
app.use("/", _menuRoutes["default"]);
app.listen(PORT, function () {
  _logger["default"].info("Restaurant Server is up and running on PORT ".concat(PORT));
  (0, _databaseConnection.connect)();
});