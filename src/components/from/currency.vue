<template>
    <el-row type="flex"  justify="center">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
            <el-form-item label="币别编号:" prop="id">
                <el-input placeholder="请输入币别编号" v-model="ruleForm.id"></el-input>
            </el-form-item>
            <el-form-item label="币别名称:" prop="name">
                <el-input placeholder="请输入币别名称" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="币别简写:" prop="en">
                <el-input placeholder="请输入币别简写" v-model="ruleForm.en"></el-input>
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
                        { required: true, message: '币别编号必填', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '币别名称必填', trigger: 'blur' }
                    ],
                    en: [
                        { required: true, message: '币别简写必填', trigger: 'blur' }
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



