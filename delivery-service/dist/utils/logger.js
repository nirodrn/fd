"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _pino = _interopRequireDefault(require("pino"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var logger = (0, _pino["default"])({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS: yyyy-mm-dd HH:MM:ss",
      ignore: "pid,hostname"
    }
  }
});
var _default = exports["default"] = logger;