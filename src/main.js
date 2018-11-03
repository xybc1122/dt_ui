/* eslint-disable no-new */

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {
  Button,
  Input,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Row,
  Col,
  Select,
  Option,
  OptionGroup,
  DatePicker,
  Pagination,
} from 'element-ui'
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Container.name, Container)
Vue.component(Header.name, Header)
Vue.component(Aside.name, Aside)
Vue.component(Main.name, Main)
Vue.component(Footer.name, Footer)
Vue.component(Menu.name, Menu)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(MenuItemGroup.name, MenuItemGroup)
Vue.component(Table.name, Table)
Vue.component(Checkbox.name, Checkbox)
Vue.component(CheckboxButton.name, CheckboxButton)
Vue.component(CheckboxGroup.name, CheckboxGroup)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(OptionGroup.name, OptionGroup)
Vue.component(DatePicker.name, DatePicker)
Vue.component(Pagination.name, Pagination)

Vue.prototype.setCookie = function(c_name,value,expiredays) {
  var exdate=new Date()
  exdate.setDate(exdate.getDate()+expiredays)
  document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
};
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
