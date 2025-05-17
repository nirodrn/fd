"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _restaurantController = require("../controllers/restaurantController.js");
var _multerMiddleware = _interopRequireDefault(require("../middleware/multerMiddleware.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/add-restaurant", _multerMiddleware["default"].array("images"), _restaurantController.addRestaurant);
router.get("/my-restaurants", _restaurantController.getRestaurantsByUserId);
router.get("/check-owner", _restaurantController.checkRestaurantExists);
router.put("/update-restaurant/:id", _multerMiddleware["default"].array("images"), _restaurantController.updateRestaurant);
router.put("/approve/:restaurantId", _restaurantController.approveRestaurant);
router.get("/all-restaurants", _restaurantController.getAllRestaurants);
router.get("/nearby-restaurants", _restaurantController.getNearbyRestaurants);
var _default = exports["default"] = router;