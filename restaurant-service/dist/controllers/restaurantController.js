"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRestaurant = exports.rejectRestaurant = exports.getRestaurantsByUserId = exports.getNearbyRestaurants = exports.getAllRestaurants = exports.checkRestaurantExists = exports.approveRestaurant = exports.addRestaurant = void 0;
var _Restaurant = _interopRequireDefault(require("../models/Restaurant.js"));
var _userService = require("../utils/userService.js");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _geocodingService = require("../utils/geocodingService.js");
var _validator = _interopRequireDefault(require("validator"));
var _cloudinaryConfig = _interopRequireDefault(require("../utils/cloudinaryConfig.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
_dotenv["default"].config();

// Extract user ID from JWT token
var extractUserIdFromToken = function extractUserIdFromToken(token) {
  try {
    var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (err) {
    return null;
  }
};

// ✅ Add Restaurant
var addRestaurant = exports.addRestaurant = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$headers$authoriz, token, ownerId, user, _req$body, name, email, phone, address, cuisineType, description, openingHours, closingHours, phoneRegex, existingRestaurant, location, uploadedImages, _iterator, _step, file, base64Str, uploadResult, newRestaurant;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = (_req$headers$authoriz = req.headers.authorization) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(" ")[1];
          if (token) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(401).json({
            message: "Authorization token required"
          }));
        case 4:
          ownerId = extractUserIdFromToken(token);
          if (ownerId) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(401).json({
            message: "Invalid or expired token"
          }));
        case 7:
          _context.next = 9;
          return (0, _userService.getUserById)(ownerId, token);
        case 9:
          user = _context.sent;
          if (!(!user || user.role !== "restaurant_admin")) {
            _context.next = 12;
            break;
          }
          return _context.abrupt("return", res.status(403).json({
            message: "Forbidden: Only restaurant admins can add restaurants"
          }));
        case 12:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, phone = _req$body.phone, address = _req$body.address, cuisineType = _req$body.cuisineType, description = _req$body.description, openingHours = _req$body.openingHours, closingHours = _req$body.closingHours;
          if (!(!name || !email || !phone || !address || !cuisineType)) {
            _context.next = 15;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "All fields are required"
          }));
        case 15:
          if (_validator["default"].isEmail(email)) {
            _context.next = 17;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "Invalid email format"
          }));
        case 17:
          phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
          if (phoneRegex.test(phone)) {
            _context.next = 20;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "Invalid phone number format"
          }));
        case 20:
          _context.next = 22;
          return _Restaurant["default"].findOne({
            $or: [{
              email: email
            }, {
              phone: phone
            }]
          });
        case 22:
          existingRestaurant = _context.sent;
          if (!existingRestaurant) {
            _context.next = 25;
            break;
          }
          return _context.abrupt("return", res.status(409).json({
            message: "Restaurant with this email or phone already exists"
          }));
        case 25:
          location = req.body.location;
          if (location) {
            _context.next = 36;
            break;
          }
          _context.prev = 27;
          _context.next = 30;
          return (0, _geocodingService.geocodeAddress)(address);
        case 30:
          location = _context.sent;
          _context.next = 36;
          break;
        case 33:
          _context.prev = 33;
          _context.t0 = _context["catch"](27);
          return _context.abrupt("return", res.status(400).json({
            message: "Could not determine location from address",
            error: _context.t0.message
          }));
        case 36:
          uploadedImages = [];
          if (!(req.files && req.files.length > 0)) {
            _context.next = 58;
            break;
          }
          _iterator = _createForOfIteratorHelper(req.files);
          _context.prev = 39;
          _iterator.s();
        case 41:
          if ((_step = _iterator.n()).done) {
            _context.next = 50;
            break;
          }
          file = _step.value;
          base64Str = "data:".concat(file.mimetype, ";base64,").concat(file.buffer.toString("base64"));
          _context.next = 46;
          return _cloudinaryConfig["default"].uploader.upload(base64Str, {
            folder: "restaurants"
          });
        case 46:
          uploadResult = _context.sent;
          uploadedImages.push({
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id
          });
        case 48:
          _context.next = 41;
          break;
        case 50:
          _context.next = 55;
          break;
        case 52:
          _context.prev = 52;
          _context.t1 = _context["catch"](39);
          _iterator.e(_context.t1);
        case 55:
          _context.prev = 55;
          _iterator.f();
          return _context.finish(55);
        case 58:
          newRestaurant = new _Restaurant["default"]({
            name: name,
            ownerId: ownerId,
            email: email,
            phone: phone,
            address: address,
            cuisineType: cuisineType,
            description: description,
            openingHours: openingHours,
            closingHours: closingHours,
            location: location,
            images: uploadedImages,
            approved: false,
            status: "pending"
          });
          _context.next = 61;
          return newRestaurant.save();
        case 61:
          res.status(201).json({
            message: "Restaurant submitted for admin approval",
            restaurant: {
              id: newRestaurant._id,
              ownerId: ownerId,
              name: name,
              email: email,
              phone: phone,
              address: address,
              cuisineType: cuisineType,
              description: description,
              openingHours: openingHours,
              closingHours: closingHours,
              location: location,
              images: uploadedImages,
              status: newRestaurant.status
            }
          });
          _context.next = 70;
          break;
        case 64:
          _context.prev = 64;
          _context.t2 = _context["catch"](0);
          console.error("Restaurant creation error:", _context.t2);
          if (!(_context.t2.code === 11000)) {
            _context.next = 69;
            break;
          }
          return _context.abrupt("return", res.status(409).json({
            message: "Duplicate entry",
            error: "Restaurant with this email or phone already exists"
          }));
        case 69:
          res.status(500).json({
            message: "Server error during restaurant creation",
            error: _context.t2.message
          });
        case 70:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 64], [27, 33], [39, 52, 55, 58]]);
  }));
  return function addRestaurant(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// ✅ Get All Restaurants
var getAllRestaurants = exports.getAllRestaurants = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var allRestaurants;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _Restaurant["default"].find({});
        case 3:
          allRestaurants = _context2.sent;
          res.status(200).json({
            restaurants: allRestaurants
          });
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: "Failed to fetch restaurants",
            error: _context2.t0.message
          });
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function getAllRestaurants(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// ✅ Approve a Restaurant
var approveRestaurant = exports.approveRestaurant = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$headers$authoriz2, token, userId, user, restaurantId, updatedRestaurant;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          token = (_req$headers$authoriz2 = req.headers.authorization) === null || _req$headers$authoriz2 === void 0 ? void 0 : _req$headers$authoriz2.split(" ")[1];
          userId = extractUserIdFromToken(token);
          _context3.next = 5;
          return (0, _userService.getUserById)(userId, token);
        case 5:
          user = _context3.sent;
          if (!(!user || user.role !== "admin")) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", res.status(403).json({
            message: "Forbidden: Admins only"
          }));
        case 8:
          restaurantId = req.params.restaurantId;
          _context3.next = 11;
          return _Restaurant["default"].findByIdAndUpdate(restaurantId, {
            approved: true,
            status: "approved"
          }, {
            "new": true
          });
        case 11:
          updatedRestaurant = _context3.sent;
          if (updatedRestaurant) {
            _context3.next = 14;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: "Restaurant not found"
          }));
        case 14:
          res.status(200).json({
            message: "Restaurant approved successfully",
            restaurant: updatedRestaurant
          });
          _context3.next = 20;
          break;
        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: "Failed to approve restaurant",
            error: _context3.t0.message
          });
        case 20:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 17]]);
  }));
  return function approveRestaurant(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// ✅ Reject a Restaurant
var rejectRestaurant = exports.rejectRestaurant = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$headers$authoriz3, token, userId, user, restaurantId, updatedRestaurant;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          token = (_req$headers$authoriz3 = req.headers.authorization) === null || _req$headers$authoriz3 === void 0 ? void 0 : _req$headers$authoriz3.split(" ")[1];
          userId = extractUserIdFromToken(token);
          _context4.next = 5;
          return (0, _userService.getUserById)(userId, token);
        case 5:
          user = _context4.sent;
          if (!(!user || user.role !== "admin")) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(403).json({
            message: "Forbidden: Admins only"
          }));
        case 8:
          restaurantId = req.params.restaurantId;
          _context4.next = 11;
          return _Restaurant["default"].findByIdAndUpdate(restaurantId, {
            approved: false,
            status: "rejected"
          }, {
            "new": true
          });
        case 11:
          updatedRestaurant = _context4.sent;
          if (updatedRestaurant) {
            _context4.next = 14;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: "Restaurant not found"
          }));
        case 14:
          res.status(200).json({
            message: "Restaurant rejected successfully",
            restaurant: updatedRestaurant
          });
          _context4.next = 20;
          break;
        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            message: "Failed to reject restaurant",
            error: _context4.t0.message
          });
        case 20:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 17]]);
  }));
  return function rejectRestaurant(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

//  View Restaurant(s) by Logged-in Restaurant Admin
var getRestaurantsByUserId = exports.getRestaurantsByUserId = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$headers$authoriz4, token, userId, user, restaurants;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          token = (_req$headers$authoriz4 = req.headers.authorization) === null || _req$headers$authoriz4 === void 0 ? void 0 : _req$headers$authoriz4.split(" ")[1];
          if (token) {
            _context5.next = 4;
            break;
          }
          return _context5.abrupt("return", res.status(401).json({
            message: "Authorization token required"
          }));
        case 4:
          userId = extractUserIdFromToken(token);
          if (userId) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(401).json({
            message: "Invalid or expired token"
          }));
        case 7:
          _context5.next = 9;
          return (0, _userService.getUserById)(userId, token);
        case 9:
          user = _context5.sent;
          if (!(!user || user.role !== "restaurant_admin")) {
            _context5.next = 12;
            break;
          }
          return _context5.abrupt("return", res.status(403).json({
            message: "Access denied: Only restaurant admins can view their restaurants"
          }));
        case 12:
          _context5.next = 14;
          return _Restaurant["default"].find({
            ownerId: userId
          });
        case 14:
          restaurants = _context5.sent;
          res.status(200).json({
            message: "Your restaurants retrieved successfully",
            restaurants: restaurants
          });
          _context5.next = 22;
          break;
        case 18:
          _context5.prev = 18;
          _context5.t0 = _context5["catch"](0);
          console.error("Error fetching restaurants:", _context5.t0);
          res.status(500).json({
            message: "Server error while fetching restaurants",
            error: _context5.t0.message
          });
        case 22:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 18]]);
  }));
  return function getRestaurantsByUserId(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// Check if a Restaurant exists
var checkRestaurantExists = exports.checkRestaurantExists = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$headers$authoriz5, token, ownerId, restaurant;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          token = (_req$headers$authoriz5 = req.headers.authorization) === null || _req$headers$authoriz5 === void 0 ? void 0 : _req$headers$authoriz5.split(" ")[1];
          if (token) {
            _context6.next = 4;
            break;
          }
          return _context6.abrupt("return", res.status(401).json({
            message: "Authorization token required"
          }));
        case 4:
          ownerId = extractUserIdFromToken(token);
          if (ownerId) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(401).json({
            message: "Invalid or expired token"
          }));
        case 7:
          _context6.next = 9;
          return _Restaurant["default"].findOne({
            ownerId: ownerId
          });
        case 9:
          restaurant = _context6.sent;
          if (!restaurant) {
            _context6.next = 14;
            break;
          }
          return _context6.abrupt("return", res.status(200).json({
            exists: true
          }));
        case 14:
          return _context6.abrupt("return", res.status(200).json({
            exists: false
          }));
        case 15:
          _context6.next = 21;
          break;
        case 17:
          _context6.prev = 17;
          _context6.t0 = _context6["catch"](0);
          console.error("Error checking restaurant existence:", _context6.t0);
          return _context6.abrupt("return", res.status(500).json({
            message: "Internal server error"
          }));
        case 21:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 17]]);
  }));
  return function checkRestaurantExists(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

//Update Restaurant Details
var updateRestaurant = exports.updateRestaurant = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$headers$authoriz6, token, ownerId, updatedRestaurant;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          token = (_req$headers$authoriz6 = req.headers.authorization) === null || _req$headers$authoriz6 === void 0 ? void 0 : _req$headers$authoriz6.split(" ")[1];
          if (token) {
            _context7.next = 4;
            break;
          }
          return _context7.abrupt("return", res.status(401).json({
            message: "Authorization token required"
          }));
        case 4:
          ownerId = extractUserIdFromToken(token);
          if (ownerId) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", res.status(401).json({
            message: "Invalid or expired token"
          }));
        case 7:
          _context7.next = 9;
          return _Restaurant["default"].findOneAndUpdate({
            ownerId: ownerId
          }, req.body, {
            "new": true,
            upsert: true
          });
        case 9:
          updatedRestaurant = _context7.sent;
          if (updatedRestaurant) {
            _context7.next = 12;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: "Restaurant not found"
          }));
        case 12:
          res.status(200).json({
            message: "Restaurant details updated successfully",
            restaurant: updatedRestaurant
          });
          _context7.next = 19;
          break;
        case 15:
          _context7.prev = 15;
          _context7.t0 = _context7["catch"](0);
          console.error("Error updating restaurant details:", _context7.t0);
          res.status(500).json({
            message: "Server error while updating restaurant details",
            error: _context7.t0.message
          });
        case 19:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 15]]);
  }));
  return function updateRestaurant(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

// Haversine distance calculation
function calculateDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Earth radius in km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}
function toRad(value) {
  return value * Math.PI / 180;
}

// ✅ Get Nearby Restaurants (with microservice integration)
var getNearbyRestaurants = exports.getNearbyRestaurants = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$headers$authoriz7, token, userId, userLocation, maxDistance, latitude, longitude, restaurants, nearbyRestaurants, _error$response;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          // 1. Extract and verify token
          token = (_req$headers$authoriz7 = req.headers.authorization) === null || _req$headers$authoriz7 === void 0 ? void 0 : _req$headers$authoriz7.split(" ")[1];
          if (token) {
            _context8.next = 4;
            break;
          }
          return _context8.abrupt("return", res.status(401).json({
            success: false,
            message: "Authorization token required"
          }));
        case 4:
          // 2. Get user ID from token
          userId = extractUserIdFromToken(token);
          if (userId) {
            _context8.next = 7;
            break;
          }
          return _context8.abrupt("return", res.status(401).json({
            success: false,
            message: "Invalid or expired token"
          }));
        case 7:
          _context8.next = 9;
          return (0, _userService.getUserLocation)(userId, token);
        case 9:
          userLocation = _context8.sent;
          if (userLocation) {
            _context8.next = 12;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            success: false,
            message: "Location data not available",
            solutions: ["Update your profile with your address in the user service", "Provide coordinates manually via ?latitude=X&longitude=Y"]
          }));
        case 12:
          // 4. Get search parameters
          maxDistance = parseFloat(req.query.maxDistance) || 5; // Default 5km
          latitude = userLocation.latitude, longitude = userLocation.longitude; // 5. Find all approved restaurants with location data
          _context8.next = 16;
          return _Restaurant["default"].find({
            approved: true,
            status: "approved",
            isOpen: true,
            "location.latitude": {
              $exists: true,
              $ne: null
            },
            "location.longitude": {
              $exists: true,
              $ne: null
            }
          });
        case 16:
          restaurants = _context8.sent;
          // 6. Calculate distances and filter
          nearbyRestaurants = restaurants.map(function (restaurant) {
            var distance = calculateDistance(latitude, longitude, restaurant.location.latitude, restaurant.location.longitude);
            return _objectSpread(_objectSpread({}, restaurant.toObject()), {}, {
              distance: parseFloat(distance.toFixed(2)) // Round to 2 decimal places
            });
          }).filter(function (restaurant) {
            return restaurant.distance <= maxDistance;
          }).sort(function (a, b) {
            return a.distance - b.distance;
          }); // 7. Return results
          res.status(200).json({
            success: true,
            message: "Nearby restaurants retrieved successfully",
            userLocation: {
              latitude: latitude,
              longitude: longitude
            },
            searchRadius: maxDistance,
            count: nearbyRestaurants.length,
            restaurants: nearbyRestaurants
          });
          _context8.next = 31;
          break;
        case 21:
          _context8.prev = 21;
          _context8.t0 = _context8["catch"](0);
          console.error("Error in getNearbyRestaurants:", _context8.t0);

          // Handle specific microservice errors
          if (!(((_error$response = _context8.t0.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 404)) {
            _context8.next = 26;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            success: false,
            message: "User not found in user service"
          }));
        case 26:
          if (!(_context8.t0.name === "JsonWebTokenError")) {
            _context8.next = 28;
            break;
          }
          return _context8.abrupt("return", res.status(401).json({
            success: false,
            message: "Invalid token"
          }));
        case 28:
          if (!(_context8.t0.name === "TokenExpiredError")) {
            _context8.next = 30;
            break;
          }
          return _context8.abrupt("return", res.status(401).json({
            success: false,
            message: "Token expired"
          }));
        case 30:
          res.status(500).json({
            success: false,
            message: "Server error while fetching nearby restaurants",
            error: _context8.t0.message
          });
        case 31:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 21]]);
  }));
  return function getNearbyRestaurants(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();