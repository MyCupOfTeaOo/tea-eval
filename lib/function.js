"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.safeFunc = safeFunc;
exports.createFunc = createFunc;

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/* eslint-disable no-new-func */
function safeFunc(expr) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return _construct(Function, _toConsumableArray(args).concat([expr]));
}

function createFunc(expr) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var ctx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return safeFunc.apply(void 0, [expr].concat(_toConsumableArray(args))).bind(ctx);
}