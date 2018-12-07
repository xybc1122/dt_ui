<template>
    <el-row type="flex"  justify="center">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
            <el-form-item label="区域编号:" prop="id">
                <el-input placeholder="请输入区域编号" v-model="ruleForm.id"></el-input>
            </el-form-item>
            <el-form-item label="区域名称:" prop="name">
                <el-input placeholder="请输入区域名称" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="区域英文:" prop="en">
                <el-input placeholder="请输入区域英文" v-model="ruleForm.en"></el-input>
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
                    en:'',
                    it:''
                },
                rules: {
                    id: [
                        { required: true, message: '区域编号必填', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '区域名称必填', trigger: 'blur' }
                    ],
                    en: [
                        { required: true, message: '区域英文必填', trigger: 'blur' }
                    ]

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



