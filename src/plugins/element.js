import {
  Button,
  Col,
  Form,
  FormItem,
  Input,
  Message,
  Row,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Icon,
  Avatar,
  Popconfirm,
  Option,
  Select,
  DatePicker,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  MessageBox,
  Divider,
  Loading,
  TimePicker,
} from 'element-ui';
import Vue from 'vue';

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Icon);
Vue.use(Avatar);
Vue.use(Popconfirm);
Vue.use(Option);
Vue.use(Select);
Vue.use(DatePicker);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Divider);
Vue.use(Loading.directive);
Vue.use(TimePicker);
// Vue.use(Radio);
// Vue.use(RadioGroup);
// Vue.use(Switch);
// Vue.use(Checkbox);
// Vue.use(CheckboxGroup);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
