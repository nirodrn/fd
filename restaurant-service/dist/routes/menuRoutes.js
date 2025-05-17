"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _menuController = require("../controllers/menuController.js");
var _verifyRestaurantOwner = require("../middleware/verifyRestaurantOwner.js");
var _multerMiddleware = _interopRequireDefault(require("../middleware/multerMiddleware.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/add-menu/:restaurantId", _multerMiddleware["default"].array("images"), _verifyRestaurantOwner.verifyRestaurantOwner, _menuController.addMenuItem);
router.put("/update-menu/:id", _verifyRestaurantOwner.verifyRestaurantOwner, _menuController.updateMenuItem);
router["delete"]("/delete-menu/:id", _verifyRestaurantOwner.verifyRestaurantOwner, _menuController.deleteMenuItem);

// View routes

router.get("/menu/:restaurantId", _menuController.getMenuItemsByRestaurantId);
router.get("/item/:id", _menuController.getMenuItemById); // Single menu item by ID
router.get("/all-menu", _menuController.getAllMenuItems);
var _default = exports["default"] = router;