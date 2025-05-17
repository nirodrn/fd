"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _orderController = require("../controllers/orderController.js");
var _authMiddleware = require("../middleware/authMiddleware.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/create-order", _authMiddleware.authMiddleware, _orderController.createOrder);
router.get("/my-orders", _authMiddleware.authMiddleware, _orderController.getOrdersByUser);
router.get("/orders-by-restaurant/:restaurantId", _authMiddleware.authMiddleware, _authMiddleware.restaurantAdminMiddleware, _orderController.getOrdersByRestaurant);
router.put("/update-status/:id", _authMiddleware.authMiddleware, _authMiddleware.restaurantAdminMiddleware, _orderController.updateOrderStatus);
var _default = exports["default"] = router;