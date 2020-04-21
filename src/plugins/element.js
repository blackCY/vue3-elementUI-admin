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

Vue.prototype.$message = Message;
