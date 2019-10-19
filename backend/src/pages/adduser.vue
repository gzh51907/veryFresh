<template>
  <div>
    <div class="header">
      <div class="user-header">
          <h1>添加用户</h1>
      </div>
    </div>
    <div class="main">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm2.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">确认</el-button>
          <el-button type="success" @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
   data(){
      // 校验用户名是否存在
      const checkUsername = async (rule, value, callback) => {
        let {data} = await this.$backend_axios.get('/user/check',{
          params:{
            username:this.ruleForm2.username
          }
        })
        console.log(data);
        
        if(data.code === 0){
          callback(new Error("用户名已存在"));
        }else{
          callback();
        }
      }; 

      //校验密码是否存在
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };

      //校验两次密码是否一致
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

     return {
        ruleForm2: {
            username:'',
            password: '',
            checkPass: ''
        },
        //设置正则校验规则要求
        rules2: {
          username: [
            { required: true, message: "用户名不能为空", trigger: "blur" },
            { validator: checkUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' },
            {
              min: 6,
              max: 12,
              message: "密码长度必须为 6 到 12 个字符",
              trigger: "blur"
            }
          ],
          checkPass: [
            { required: true, message: "请再次确认密码", trigger: "blur" },
            { validator: validatePass2, trigger: 'blur' }
          ], 
        }
      };  
    },
    methods:{
        submitForm(formName) {
        //校验整个表单
        this.$refs[formName].validate(async valid => {
            //valid:所有校验规则都通过后，得到true，只要有一个表单元素校验不通过则得到form
          if (valid) {
            // alert('submit!');
             // 发起ajax请求，等待服务器返回结果
            let {username,password}=this.ruleForm2;
            let {data}=await this.$backend_axios.post("/user/reg",{username,password});

            if(data.code===1){
              alert("恭喜你，添加用户成功！");
            }else{
              alert("真可惜，添加用户失败！")
            }
 
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
        },
        //重置
        resetForm(formName) {
        this.$refs[formName].resetFields();
        }
    },

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