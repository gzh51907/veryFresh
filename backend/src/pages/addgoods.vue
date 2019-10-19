<template>
  <div>
    <div class="header">
      <div class="user-header">
          <h1>添加商品</h1>
      </div>
    </div>
    <div class="main">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
         <el-form-item label="店铺名" prop="shopName">
          <el-input v-model="ruleForm.shopName"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="unitPrice">
          <el-input v-model="ruleForm.unitPrice"></el-input>
        </el-form-item>
         <el-form-item label="单位" prop="unitName">
          <el-input v-model="ruleForm.unitName"></el-input>
        </el-form-item>
       <el-form-item label="库存" prop="stockQty">
          <el-input v-model="ruleForm.stockQty"></el-input>
        </el-form-item>
        <el-form-item label="属于专区" prop="areaName">
          <el-input v-model="ruleForm.areaName"></el-input>
        </el-form-item>
        <el-form-item label="到货状态" prop="sendDate">
          <el-input v-model="ruleForm.sendDate"></el-input>
        </el-form-item>
        <el-form-item label="已售数量" prop="saledQty">
          <el-input v-model="ruleForm.saledQty"></el-input>
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
          name: '大海虾',
          shopName: '极鲜仓配',
          unitPrice: '78',
          unitName:'500g',
          areaName:'龙虾专区',
          stockQty: '12',
          saledQty: '243',
          sendDate:'现货',
        },
        rules: {
          goodname: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          shopName: [
            { required: true, message: '请输入店铺名称', trigger: 'blur' },
          ],
          saledNum: [
            { required: true, message: '请输入已售商品数量', trigger: 'blur' },
          ],
          store: [
            { required: true, message: '请输入商品库存量', trigger: 'blur' },
          ],
          unitPrice: [
             { required: true, message: '请输入商品单价', trigger: 'blur' },
          ],
           unit: [
             { required: true, message: '请输入商品单位', trigger: 'blur' },
          ],
          belongto: [
             { required: true, message: '请输入商品专区', trigger: 'blur' },
          ],
          status: [
             { required: true, message: '请输入商品到货状态', trigger: 'blur' },
          ],
        }
      };
    },
      
    methods: {
      submitForm(formName) {
        // 校验整个表单
        this.$refs[formName].validate(async valid => {
          if (valid) {
             // 发起ajax请求，等待服务器返回结果
             let {data}=await this.$backend_axios.post("/admin/AddGoods",{data:this.ruleForm});
            alert('添加商品成功!');
          } else {
            console.log('添加商品失败!');
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
  padding: 50px 300px;
}
</style>