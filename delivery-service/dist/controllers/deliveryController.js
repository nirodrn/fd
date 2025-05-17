"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDeliveryStatus = exports.getDeliveryHistory = exports.getDeliveryById = exports.getDeliveriesByDeliveryPerson = exports.getCustomerDeliveries = exports.getAvailableDeliveries = exports.getActiveDeliveryForCustomer = exports.createDelivery = exports.acceptDelivery = void 0;
var _Delivery = _interopRequireDefault(require("../models/Delivery.js"));
var _mapboxService = require("../utils/mapboxService.js");
var _geocodingService = require("../utils/geocodingService.js");
var _userService = require("../utils/userService.js");
var _orderService = require("../utils/orderService.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, "catch": function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Get delivery history for delivery person
var getDeliveryHistory = exports.getDeliveryHistory = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var deliveries;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _Delivery["default"].find({
            deliveryPersonId: req.user.userId,
            status: {
              $in: ['delivered', 'cancelled']
            }
          }).sort({
            createdAt: -1
          }).limit(20);
        case 3:
          deliveries = _context.sent;
          res.json(deliveries);
          _context.next = 10;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: _context.t0.message
          });
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function getDeliveryHistory(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Get all deliveries for a customer
var getCustomerDeliveries = exports.getCustomerDeliveries = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var deliveries;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _Delivery["default"].find({
            customerId: req.user.userId
          }).sort({
            createdAt: -1
          }).limit(20);
        case 3:
          deliveries = _context2.sent;
          res.json(deliveries);
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: _context2.t0.message
          });
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function getCustomerDeliveries(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Create new delivery
var createDelivery = exports.createDelivery = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body, orderId, pickupAddress, dropoffAddress, order, pickupLocation, dropoffLocation, route, delivery;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, orderId = _req$body.orderId, pickupAddress = _req$body.pickupAddress, dropoffAddress = _req$body.dropoffAddress; // Verify order exists and belongs to customer
          _context3.next = 4;
          return (0, _orderService.getOrderById)(orderId, req.headers.authorization);
        case 4:
          order = _context3.sent;
          if (order) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'Order not found'
          }));
        case 7:
          if (!(order.userId !== req.user.userId)) {
            _context3.next = 9;
            break;
          }
          return _context3.abrupt("return", res.status(403).json({
            message: 'Not authorized to create delivery for this order'
          }));
        case 9:
          _context3.next = 11;
          return (0, _geocodingService.geocodeAddress)(pickupAddress);
        case 11:
          pickupLocation = _context3.sent;
          _context3.next = 14;
          return (0, _geocodingService.geocodeAddress)(dropoffAddress);
        case 14:
          dropoffLocation = _context3.sent;
          _context3.next = 17;
          return (0, _mapboxService.getDirections)([pickupLocation.longitude, pickupLocation.latitude], [dropoffLocation.longitude, dropoffLocation.latitude]);
        case 17:
          route = _context3.sent;
          delivery = new _Delivery["default"]({
            orderId: orderId,
            customerId: req.user.userId,
            pickupLocation: _objectSpread({
              address: pickupAddress
            }, pickupLocation),
            dropoffLocation: _objectSpread({
              address: dropoffAddress
            }, dropoffLocation),
            route: route,
            status: 'pending',
            estimatedDeliveryTime: new Date(Date.now() + route.duration * 1000)
          });
          _context3.next = 21;
          return delivery.save();
        case 21:
          res.status(201).json(delivery);
          _context3.next = 27;
          break;
        case 24:
          _context3.prev = 24;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: _context3.t0.message
          });
        case 27:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 24]]);
  }));
  return function createDelivery(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Update delivery status
var updateDeliveryStatus = exports.updateDeliveryStatus = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, _req$body2, status, currentLocation, delivery, updatedDelivery;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _req$body2 = req.body, status = _req$body2.status, currentLocation = _req$body2.currentLocation;
          _context4.next = 5;
          return _Delivery["default"].findById(id);
        case 5:
          delivery = _context4.sent;
          if (delivery) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Delivery not found'
          }));
        case 8:
          if (!(delivery.deliveryPersonId !== req.user.userId)) {
            _context4.next = 10;
            break;
          }
          return _context4.abrupt("return", res.status(403).json({
            message: 'Not authorized to update this delivery'
          }));
        case 10:
          _context4.next = 12;
          return _Delivery["default"].findByIdAndUpdate(id, _objectSpread({
            status: status
          }, currentLocation && {
            currentLocation: _objectSpread(_objectSpread({}, currentLocation), {}, {
              lastUpdated: new Date()
            })
          }), {
            "new": true
          });
        case 12:
          updatedDelivery = _context4.sent;
          res.json(updatedDelivery);
          _context4.next = 19;
          break;
        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            message: _context4.t0.message
          });
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 16]]);
  }));
  return function updateDeliveryStatus(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// Get delivery by ID
var getDeliveryById = exports.getDeliveryById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var delivery;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _Delivery["default"].findById(req.params.id);
        case 3:
          delivery = _context5.sent;
          if (delivery) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Delivery not found'
          }));
        case 6:
          if (!(delivery.customerId !== req.user.userId && delivery.deliveryPersonId !== req.user.userId)) {
            _context5.next = 8;
            break;
          }
          return _context5.abrupt("return", res.status(403).json({
            message: 'Not authorized to view this delivery'
          }));
        case 8:
          res.json(delivery);
          _context5.next = 14;
          break;
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: _context5.t0.message
          });
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 11]]);
  }));
  return function getDeliveryById(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();

// Get all active deliveries for a delivery person
var getDeliveriesByDeliveryPerson = exports.getDeliveriesByDeliveryPerson = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var deliveries;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _Delivery["default"].find({
            deliveryPersonId: req.user.userId,
            status: {
              $in: ['assigned', 'picked_up', 'in_transit']
            }
          }).sort({
            createdAt: -1
          });
        case 3:
          deliveries = _context6.sent;
          res.json(deliveries);
          _context6.next = 10;
          break;
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            message: _context6.t0.message
          });
        case 10:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function getDeliveriesByDeliveryPerson(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

// Get active delivery for customer
var getActiveDeliveryForCustomer = exports.getActiveDeliveryForCustomer = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var orderId, delivery;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          orderId = req.params.orderId;
          _context7.next = 4;
          return _Delivery["default"].findOne({
            orderId: orderId,
            customerId: req.user.userId,
            status: {
              $in: ['pending', 'assigned', 'picked_up', 'in_transit']
            }
          });
        case 4:
          delivery = _context7.sent;
          if (delivery) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: 'No active delivery found'
          }));
        case 7:
          res.json(delivery);
          _context7.next = 13;
          break;
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json({
            message: _context7.t0.message
          });
        case 13:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return function getActiveDeliveryForCustomer(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();

// Get available deliveries for delivery persons
var getAvailableDeliveries = exports.getAvailableDeliveries = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var deliveries;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _Delivery["default"].find({
            deliveryPersonId: null,
            status: 'pending'
          }).sort({
            createdAt: 1
          });
        case 3:
          deliveries = _context8.sent;
          res.json(deliveries);
          _context8.next = 10;
          break;
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          res.status(500).json({
            message: _context8.t0.message
          });
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return function getAvailableDeliveries(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();

// Accept delivery
var acceptDelivery = exports.acceptDelivery = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var deliveryId, delivery;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          deliveryId = req.params.deliveryId;
          _context9.next = 4;
          return _Delivery["default"].findOneAndUpdate({
            _id: deliveryId,
            deliveryPersonId: null,
            status: 'pending'
          }, {
            deliveryPersonId: req.user.userId,
            status: 'assigned'
          }, {
            "new": true
          });
        case 4:
          delivery = _context9.sent;
          if (delivery) {
            _context9.next = 7;
            break;
          }
          return _context9.abrupt("return", res.status(400).json({
            message: 'Delivery not available'
          }));
        case 7:
          res.json(delivery);
          _context9.next = 13;
          break;
        case 10:
          _context9.prev = 10;
          _context9.t0 = _context9["catch"](0);
          res.status(500).json({
            message: _context9.t0.message
          });
        case 13:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 10]]);
  }));
  return function acceptDelivery(_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();