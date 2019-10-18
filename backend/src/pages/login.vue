<template>
  <div class="login">
    <div class="header">
      <div class="user-header">
          <h1>管理员登陆</h1>
      </div>
    </div>
    <div class="main">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button type="success" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      //用户名非空和正则校验
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          if (this.ruleForm.password !== '') {
            this.$refs.ruleForm.validateField('password');
          }
          callback();
        }
      };
      //密码非空和正则校验
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { validator: validatePass, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        
        this.$refs[formName].validate(async valid => {
          if (valid) {
            //发起请求，等待服务器返回结果
            //根据服务器返回结果：登陆成功-->跳到商品列表页
            let {username,password}=this.ruleForm;

            //发送请求查询数据库
            let {data}=await this.$axios.post("http://10.3.133.72:10086/admin/login",{username,password});
            console.log(data);

            //判断返回数据的状态，然后进行相应的跳转操作
            if(data.code===1){
                let {targetUrl} =this.$route.query;
                // console.log(targetUrl);
                // this.$router.replace({
                //   path:targetUrl || "/goods"
                // });
                alert('登录成功！');
                localStorage.setItem('admin',1)
                this.$emit('addHandel',1)

              } else{
                alert("用户名或密码不正确");
            };  
          } else {
            // alert("请输入用户名和密码");
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
<style lang="scss" scoped>
// html,body{
//   height:100%;
  
// }
.login{
   width: 450px;
  margin: 120px auto;
  background-color:#fff;
}
.user-header{
    height:50px;
    width:100%;
    text-align:center;
    background-color:#08c;
    h1{
        height:50px;
        line-height: 50px;
        font-size:20px;
        color:#000;
        border-bottom:2px solid orangered;
    }
}
.main{
  height:250px;
  padding-top:50px;
}

.el-form-item /deep/ .el-form-item__content{
  margin-right:40px;
} 
</style>