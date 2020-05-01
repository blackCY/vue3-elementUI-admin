"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _elementUi = require("element-ui");

var _default = function _default(_ref) {
  var message = _ref.message,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'info' : _ref$type,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 2000 : _ref$duration,
      center = _ref.center,
      iconClass = _ref.iconClass,
      showClose = _ref.showClose,
      onClose = _ref.onClose;
  (0, _elementUi.Message)({
    message: message,
    type: type,
    duration: duration,
    center: center,
    iconClass: iconClass,
    showClose: showClose,
    onClose: onClose
  });
};

exports["default"] = _default;