<template>
  <div class="block">
    <span><el-button type="primary" @click="saveMenuInfo">保存</el-button></span>
    <el-tree
      :data="menuList"
      show-checkbox
      node-key="menuId"
      default-expand-all
      :expand-on-click-node="false"
      :props="defaultProps">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label}}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
             <i class="el-icon-plus"></i>
          </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => update(data)">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
          <i class="el-icon-delete"></i>
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <el-input v-model="inputMenu" placeholder="请输入菜单名称"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addMenu">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import {repUpMenuInfo} from '../../api'
  import message from '../../utils/Message'
  import PubSub from 'pubsub-js'

  let id = 1000 //假菜单ID
  export default {
    data () {
      return {
        addNewMenu: [], //新添加传递到后台的数组
        menuIds: [],
        dataMenu: {}, //点击时获得数据
        inputMenu: '',
        menuList: [],
        centerDialogVisible: false,
        defaultProps: { //转换参数
          children: 'childMenus',
          label: 'name'
        }
      }
    },
    mounted () {
      PubSub.subscribe('menuList', (msg, menuList) => {
        console.log(menuList)
        this.menuList = menuList
      })
    },
    methods: {
      //添加 菜单
      append (data) {
        console.log(data)
        if (data.url !== null) {
          message.errorMessage('这目录下有url----->不能添加子目录')
          return
        }
        this.centerDialogVisible = true
        this.dataMenu = data
      },
      //设置菜单名称
      addMenu () {
        const newChild = {menuId: ++id, name: this.inputMenu, childMenus: []}
        if (!this.dataMenu.childMenus) {
          this.$set(this.dataMenu, 'childMenus', [])
        }
        this.dataMenu.childMenus.push(newChild)
        //拿到对象
        const menu = {menuId: id, parentId: this.dataMenu.parentId, name: this.inputMenu}
        //插入数组
        this.addNewMenu.push(menu)
        this.centerDialogVisible = false
      },
      //保存按钮
      saveMenuInfo () {
        message.messageBox('确认保存').then(() => {
          //如果都是空的 说明没有操作
          if (this.addNewMenu.length === 0 && this.menuIds.length === 0) {
            message.errorMessage('没有任何修改,不需要保存')
            return
          }
          const newMenu = this.addNewMenu
          const idsMenu = this.menuIds
          const menu = {newMenu, idsMenu}
          const result = repUpMenuInfo(menu)
          console.log(result)

        }).catch(() => {
          console.log('不保存')
        })

      },
      //删除菜单
      remove (node, data) {
        if (node.childNodes.length > 0) {
          message.messageNotDError('该节点下还有子菜单', '操作错误')
          return
        }
        const parent = node.parent
        const children = parent.data.childMenus || parent.data
        const index = children.findIndex(d => d.menuId === data.menuId)
        children.splice(index, 1)
        //删除数组里的数据
        for (let i = 0; i < this.addNewMenu.length; i++) {
          const item = this.addNewMenu[i]
          if (item.menuId === data.menuId) {
            this.addNewMenu.splice(i, 1)
          }
        }
        //获得删除的菜单ID
        this.menuIds.push(data.menuId)
      },
      //修改
      update (data) {
        console.log(data)
      }
    }
  }
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
