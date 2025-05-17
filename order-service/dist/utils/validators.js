"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRegistration = exports.validateProfileUpdate = exports.validatePhone = exports.validatePassword = exports.validateNIC = exports.validateLogin = exports.validateEmail = exports.validateCoordinates = exports["default"] = void 0;
var _validator = _interopRequireDefault(require("validator"));
var _User = _interopRequireDefault(require("../models/User.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, "catch": function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
//Validation utility functions

// Common validation patterns
var patterns = {
  phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  nic: {
    old: /^[0-9]{9}[VX]$/i,
    // Old NIC format (9 digits + V/X)
    "new": /^[0-9]{12}$/ // New NIC format (12 digits)
  },
  password: {
    min: 8,
    max: 128,
    strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  }
};

//Validate user registration data

var validateRegistration = exports.validateRegistration = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
    var errors, exists, _exists, validRoles;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          errors = {}; // Name validation
          if (!data.name || !_validator["default"].isLength(data.name, {
            min: 2,
            max: 50
          })) {
            errors.name = 'Name must be between 2-50 characters';
          }

          // Email validation
          if (!(!data.email || !_validator["default"].isEmail(data.email))) {
            _context.next = 6;
            break;
          }
          errors.email = 'Please provide a valid email';
          _context.next = 10;
          break;
        case 6:
          _context.next = 8;
          return _User["default"].findOne({
            email: data.email
          });
        case 8:
          exists = _context.sent;
          if (exists) errors.email = 'Email already in use';
        case 10:
          // Password validation
          if (!data.password || !_validator["default"].isLength(data.password, {
            min: patterns.password.min
          })) {
            errors.password = "Password must be at least ".concat(patterns.password.min, " characters");
          } else if (!patterns.password.strong.test(data.password)) {
            errors.password = 'Password must contain at least one uppercase, one lowercase, one number and one special character';
          }

          // Phone validation
          if (!data.phone || !patterns.phone.test(data.phone)) {
            errors.phone = 'Please provide a valid phone number';
          }

          // Address validation
          if (!data.address || !_validator["default"].isLength(data.address, {
            min: 5,
            max: 255
          })) {
            errors.address = 'Address must be between 5-255 characters';
          }

          // NIC validation
          if (!(!data.nic || !patterns.nic.old.test(data.nic) && !patterns.nic["new"].test(data.nic))) {
            _context.next = 17;
            break;
          }
          errors.nic = 'Please provide a valid NIC number';
          _context.next = 21;
          break;
        case 17:
          _context.next = 19;
          return _User["default"].findOne({
            nic: data.nic.toUpperCase()
          });
        case 19:
          _exists = _context.sent;
          if (_exists) errors.nic = 'NIC already registered';
        case 21:
          // Role validation
          validRoles = ['customer', 'restaurant_admin', 'delivery_person', 'admin'];
          if (!data.role || !validRoles.includes(data.role)) {
            errors.role = 'Please select a valid role';
          }
          return _context.abrupt("return", {
            isValid: Object.keys(errors).length === 0,
            errors: errors
          });
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function validateRegistration(_x) {
    return _ref.apply(this, arguments);
  };
}();

//Validate user login data

var validateLogin = exports.validateLogin = function validateLogin(data) {
  var errors = {};
  if (!data.email || !_validator["default"].isEmail(data.email)) {
    errors.email = 'Please provide a valid email';
  }
  if (!data.password) {
    errors.password = 'Password is required';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  };
};

// Validate password strength
var validatePassword = exports.validatePassword = function validatePassword(password) {
  var errors = [];
  if (password.length < patterns.password.min) {
    errors.push("Password must be at least ".concat(patterns.password.min, " characters"));
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

// Validate email address

var validateEmail = exports.validateEmail = function validateEmail(email) {
  return _validator["default"].isEmail(email);
};

//Validate phone number

var validatePhone = exports.validatePhone = function validatePhone(phone) {
  return patterns.phone.test(phone);
};

//Validate NIC number ( both old and new formats)

var validateNIC = exports.validateNIC = function validateNIC(nic) {
  var normalizedNIC = nic.toUpperCase();
  return patterns.nic.old.test(normalizedNIC) || patterns.nic["new"].test(normalizedNIC);
};

//Validate location coordinates

var validateCoordinates = exports.validateCoordinates = function validateCoordinates(coordinates) {
  return Array.isArray(coordinates) && coordinates.length === 2 && coordinates[0] >= -180 && coordinates[0] <= 180 && coordinates[1] >= -90 && coordinates[1] <= 90;
};

//Validate user profile update data

var validateProfileUpdate = exports.validateProfileUpdate = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(userId, data) {
    var errors, exists;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          errors = {}; // Name validation
          if (data.name && !_validator["default"].isLength(data.name, {
            min: 2,
            max: 50
          })) {
            errors.name = 'Name must be between 2-50 characters';
          }

          // Email validation (if changing email)
          if (!data.email) {
            _context2.next = 11;
            break;
          }
          if (_validator["default"].isEmail(data.email)) {
            _context2.next = 7;
            break;
          }
          errors.email = 'Please provide a valid email';
          _context2.next = 11;
          break;
        case 7:
          _context2.next = 9;
          return _User["default"].findOne({
            email: data.email,
            _id: {
              $ne: userId
            }
          });
        case 9:
          exists = _context2.sent;
          if (exists) errors.email = 'Email already in use';
        case 11:
          // Phone validation
          if (data.phone && !patterns.phone.test(data.phone)) {
            errors.phone = 'Please provide a valid phone number';
          }

          // Address validation
          if (data.address && !_validator["default"].isLength(data.address, {
            min: 5,
            max: 255
          })) {
            errors.address = 'Address must be between 5-255 characters';
          }
          return _context2.abrupt("return", {
            isValid: Object.keys(errors).length === 0,
            errors: errors
          });
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function validateProfileUpdate(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  validateRegistration: validateRegistration,
  validateLogin: validateLogin,
  validatePassword: validatePassword,
  validateEmail: validateEmail,
  validatePhone: validatePhone,
  validateNIC: validateNIC,
  validateCoordinates: validateCoordinates,
  validateProfileUpdate: validateProfileUpdate
};