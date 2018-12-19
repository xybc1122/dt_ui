<template>
  <el-dialog title="区域信息修改" :visible.sync="Shop_up_Form" width="800px">
    <el-form :model="Shop_Form" ref="upForm" :rules="rules" label-width="92px">
      <template v-for="">

      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm('Shop_Form')">重置</el-button>
      <el-button @click="Shop_up_Form = false">取 消</el-button>
      <el-button type="primary" @click="saveUserInfo('Shop_Form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data(){
      return{
        Shop_Form:{

        }
      }
    }
  }
</script>

<style scoped>

</style>
