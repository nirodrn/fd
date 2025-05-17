"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restaurantAdminMiddleware = exports.authMiddleware = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var authMiddleware = exports.authMiddleware = function authMiddleware(req, res, next) {
  var _req$header;
  var token = (_req$header = req.header("Authorization")) === null || _req$header === void 0 ? void 0 : _req$header.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({
      message: "No token provided"
    });
  }
  try {
    var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: decoded.userId,
      role: decoded.role
    };
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token"
    });
  }
};

// Restaurant Admin Access Middleware
var restaurantAdminMiddleware = exports.restaurantAdminMiddleware = function restaurantAdminMiddleware(req, res, next) {
  if (req.user.role !== "restaurant_admin") {
    return res.status(403).json({
      message: "Access denied. Restaurant Admin only."
    });
  }
  next();
};