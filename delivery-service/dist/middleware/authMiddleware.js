"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authMiddleware = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var authMiddleware = exports.authMiddleware = function authMiddleware(req, res, next) {
  try {
    var _req$header;
    var token = (_req$header = req.header('Authorization')) === null || _req$header === void 0 ? void 0 : _req$header.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }
    var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid token'
    });
  }
};