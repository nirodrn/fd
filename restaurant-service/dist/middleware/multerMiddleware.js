"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var storage = _multer["default"].memoryStorage();
var upload = (0, _multer["default"])({
  storage: storage
});
var _default = exports["default"] = upload;