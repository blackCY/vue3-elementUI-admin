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

_vue["default"].use(_elementUi.Option);

_vue["default"].use(_elementUi.Select);

_vue["default"].use(_elementUi.DatePicker);

_vue["default"].use(_elementUi.Table);

_vue["default"].use(_elementUi.TableColumn);

_vue["default"].use(_elementUi.Pagination);

_vue["default"].use(_elementUi.Dialog);

_vue["default"].use(_elementUi.Divider);

_vue["default"].use(_elementUi.Loading.directive);

_vue["default"].use(_elementUi.TimePicker); // Vue.use(Radio);
// Vue.use(RadioGroup);
// Vue.use(Switch);
// Vue.use(Checkbox);
// Vue.use(CheckboxGroup);


_vue["default"].prototype.$loading = _elementUi.Loading.service;
_vue["default"].prototype.$message = _elementUi.Message;
_vue["default"].prototype.$msgbox = _elementUi.MessageBox;
_vue["default"].prototype.$confirm = _elementUi.MessageBox.confirm;