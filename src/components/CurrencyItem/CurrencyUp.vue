<template>
  <el-dialog title="用户信息修改" :visible.sync="currencyUp_Form" width="800px">
    <el-form :model="currency_upForm" ref="currency_upForm" :rules="rules" label-width="92px">

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="currencyForm('currency_upForm')">重置</el-button>
      <el-button @click="currencyUp_Form = false">取 消</el-button>
      <el-button type="primary" @click="currencyInfo('currency_upForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import PubSubcurr_Up from 'pubsub-js'
  import {repHead, repGetCurrencyInfo} from '../../api'
  export default {
    data(){
      return{
        currencyUp_Form:false,
        currency_upForm:{

        },
        rules:{

        }
      }
    },
    async mounted(){
      PubSubcurr_Up.subscribe('CurrencyUp',(msg,multipleSelection_cur_Up)=>{
        this.currencyUp_Form=true
      })
    },
    methods:{
      currencyForm(formName) {
        this.$refs[formName].resetFields();
      },
      currencyInfo(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>
