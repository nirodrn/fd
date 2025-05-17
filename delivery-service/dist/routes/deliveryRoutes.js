"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authMiddleware = require("../middleware/authMiddleware.js");
var _roleMiddleware = require("../middleware/roleMiddleware.js");
var _deliveryController = require("../controllers/deliveryController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

// Delivery Person Routes
router.get('/delivery-person/active', _authMiddleware.authMiddleware, _roleMiddleware.deliveryPersonOnly, _deliveryController.getDeliveriesByDeliveryPerson);
router.get('/delivery-person/available', _authMiddleware.authMiddleware, _roleMiddleware.deliveryPersonOnly, _deliveryController.getAvailableDeliveries);
router.get('/delivery-person/history', _authMiddleware.authMiddleware, _roleMiddleware.deliveryPersonOnly, _deliveryController.getDeliveryHistory);
router.post('/delivery-person/accept/:deliveryId', _authMiddleware.authMiddleware, _roleMiddleware.deliveryPersonOnly, _deliveryController.acceptDelivery);
router.put('/:id/status', _authMiddleware.authMiddleware, _roleMiddleware.deliveryPersonOnly, _deliveryController.updateDeliveryStatus);

// Customer Routes
router.get('/customer/active', _authMiddleware.authMiddleware, _roleMiddleware.customerOnly, _deliveryController.getCustomerDeliveries);
router.get('/customer/:orderId', _authMiddleware.authMiddleware, _roleMiddleware.customerOnly, _deliveryController.getActiveDeliveryForCustomer);

// Shared Routes
router.post('/create', _authMiddleware.authMiddleware, _deliveryController.createDelivery);
router.get('/:id', _authMiddleware.authMiddleware, _deliveryController.getDeliveryById);
var _default = exports["default"] = router;