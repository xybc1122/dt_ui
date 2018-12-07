<template>
    <el-row type="flex"  justify="center">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
            <el-form-item label="店铺编号:" prop="id" placeholder="请输入店铺编号">
                <el-input v-model="ruleForm.id"></el-input>
            </el-form-item>
            <el-form-item label="店铺名称:" prop="store" placeholder="请输入店铺名称">
                <el-input v-model="ruleForm.store"></el-input>
            </el-form-item>
            <el-form-item label="英文名称:" prop="es" placeholder="请输入英文名称">
                <el-input v-model="ruleForm.es"></el-input>
            </el-form-item>
            <el-form-item label="公司名称" prop="name">
                <el-select v-model="ruleForm.name" placeholder="请选择">
                    <el-option label="公司一" value="1"></el-option>
                    <el-option label="公司二" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="责任人:" prop="person" placeholder="请输入开户行">
                <el-input v-model="ruleForm.es"></el-input>
            </el-form-item>
            <el-form-item label="备注:" prop="it" placeholder="请输入备注">
                <el-input v-model="ruleForm.es"></el-input>
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
                    id: '',
                    store:'',
                    es:'',
                    name:''
                },
                rules: {
                    id: [
                        { required: true, message: '店铺编号必填', trigger: 'blur' },
                    ],
                    store: [
                        { required: true, message: '店铺名称必填', trigger: 'blur' },
                    ],
                    es: [
                        { required: true, message: '英文名称必填', trigger: 'blur' },
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