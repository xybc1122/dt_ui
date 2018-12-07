<template>
    <el-row type="flex"  justify="center">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" >
            <el-form-item label="产品类别名称:" prop="id">
                <el-input placeholder="请输入产品类别名称" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="上级类别名称" prop="class">
                <el-select v-model="ruleForm.class" placeholder="请选择">
                    <el-option label="类别一" value="1"></el-option>
                    <el-option label="类别二" value="2"></el-option>
                </el-select>
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
                    class:''
                },
                rules: {
                    id: [
                        { required: true, message: '产品类别名称必填', trigger: 'blur' }
                    ],
                    class: [
                        { required: true, message: '上级类别必填', trigger: 'blur' }
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



