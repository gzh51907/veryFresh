<template>
  <div>
    <div class="header">
      <div class="user-header">
          <h1>添加商品</h1>
      </div>
    </div>
    <div class="main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="goodname">
          <el-input v-model="ruleForm.goodname"></el-input>
        </el-form-item>
        <el-form-item label="原价" prop="old_name">
          <el-input v-model="ruleForm.old_name"></el-input>
        </el-form-item>
        <el-form-item label="现价" prop="sale_namename">
          <el-input v-model="ruleForm.sale_name"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="store">
          <el-input v-model="store"></el-input>
        </el-form-item>
        <el-form-item label="添加日期" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button type="success" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
   data() {
      return {
        ruleForm: {
          goodname: '',
          old_price: '',
          sale_price: '',
          store: '',
          date1: '',
        },
        rules: {
          goodname: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          old_price: [
            { required: true, message: '请输入商品原价', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个数字', trigger: 'blur' }
          ],
          sale_price: [
            { required: true, message: '请输入商品现价', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个数字', trigger: 'blur' }
          ],
          store: [
            { required: true, message: '请输入商品库存量', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 1 到 5 个数字', trigger: 'blur' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
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
};
</script>
<style lang="scss" scoped>
.user-header{
    height:50px;
    width:100%;
    h1{
        height:50px;
        width:1100px;
        line-height: 50px;
        font-size:20px;
        color:#000;
        margin:auto;
        border-bottom:2px solid orangered;
    }
}
.main{
  padding: 100px 300px;
}
</style>