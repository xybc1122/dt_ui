<template>
    <el-row type="flex"  justify="center">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="公司编号:" prop="id">
                <el-input placeholder="请输入公司编号" v-model="ruleForm.id"></el-input>
            </el-form-item>
            <el-form-item label="公司全称:" prop="name">
                <el-input placeholder="请输入公司全称" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="公司简称:" prop="name_abbr">
                <el-input placeholder="请输入公司简称" v-model="ruleForm.name_abbr"></el-input>
            </el-form-item>
            <el-form-item label="信用代码:" prop="code">
                <el-input placeholder="请输入信用代码" v-model="ruleForm.code"></el-input>
            </el-form-item>
            <el-form-item label="开 户 行:" prop="city">
                <el-input placeholder="请输入开户行" v-model="ruleForm.city"></el-input>
            </el-form-item>
            <el-form-item label="银行账号:" prop="bank_id">
                <el-input placeholder="请输入银行账号" v-model="ruleForm.bank_id"></el-input>
            </el-form-item>
            <el-form-item label="账户类型:" prop="bank_type">
                <el-input placeholder="请输入账户类型" v-model="ruleForm.bank_type"></el-input>
            </el-form-item>
            <el-form-item label="公司地址:" prop="room">
                <el-input placeholder="请输入公司地址" v-model="ruleForm.room"></el-input>
            </el-form-item>
            <el-form-item label="公司电话:" prop="iphone">
                <el-input placeholder="请输入公司电话" v-model="ruleForm.iphone"></el-input>
            </el-form-item>
            <el-form-item label="备注:" prop="it">
                <el-input placeholder="请输入备注" v-model="ruleForm.it"></el-input>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-row>



</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    id:'',
                    name: '',
                    name_abbr:'',
                    code:'',
                    city:'',
                    bank_id:'',
                    bank_type:'',
                    room:'',
                    iphone:'',
                    it:''
                },
                rules: {
                    id: [
                        { required: true, message: '公司编号必填', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '公司全称必填', trigger: 'blur' }
                    ],
                    name_abbr: [
                        { required: true, message: '公司简称必填', trigger: 'blur' }
                    ],

                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
