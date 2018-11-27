/* eslint-disable no-new */

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './fiters' //加载过滤器
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
  Cascader,
  Tag,
  Popover,
  Form,
  FormItem,
  Switch,
  TimePicker,
  Radio,
  RadioGroup,
  Dialog,
  RadioButton,
  Transfer
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
Vue.component(Cascader.name, Cascader)
Vue.component(Tag.name, Tag)
Vue.component(Popover.name, Popover)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Switch.name, Switch)
Vue.component(TimePicker.name, TimePicker)
Vue.component(Radio.name, Radio)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(Dialog.name, Dialog)
Vue.component(RadioButton.name, RadioButton)
Vue.component(Transfer.name, Transfer)

// 设置Cookie
Vue.prototype.setCookie = function (c_name, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = c_name + '=' + encodeURI(value) +
    ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}
//获取cookie
Vue.prototype.getCookie = function (c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + '=')
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1
      var c_end = document.cookie.indexOf(';', c_start)
      if (c_end === -1) c_end = document.cookie.length
      return decodeURI(document.cookie.substring(c_start, c_end))
    }
  }
  return ''
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  template: '<App/>'
})
