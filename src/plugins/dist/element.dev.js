"use strict";

var _elementUi = require("element-ui");

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_elementUi.Button);

_vue["default"].use(_elementUi.Form);

_vue["default"].use(_elementUi.FormItem);

_vue["default"].use(_elementUi.Input);

_vue["default"].use(_elementUi.Row);

_vue["default"].use(_elementUi.Col);

_vue["default"].use(_elementUi.Menu);

_vue["default"].use(_elementUi.Submenu);

_vue["default"].use(_elementUi.MenuItem);

_vue["default"].use(_elementUi.MenuItemGroup);

_vue["default"].use(_elementUi.Icon);

_vue["default"].use(_elementUi.Avatar);

_vue["default"].use(_elementUi.Popconfirm);

_vue["default"].prototype.$message = _elementUi.Message;