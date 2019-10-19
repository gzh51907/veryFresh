<template>
  <div>
    <header>
      <div>
        <p>极鲜网</p>
        <h3>Gfresh</h3>
      </div>
    </header>
    <main>
      <van-tabs type="card" color="#c1c1c1" background="#ccc">
        <van-tab title="登录" style="height:50px">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="70px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checked">下次免登陆</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </van-tab>
        <van-tab title="注册">
          <el-form
            :model=" reg_ruleForm"
            status-icon
            :rules="reg_rules"
            ref="reg_ruleForm"
            label-width="70px"
            class="demo-ruleForm"
            style="  font-size: 12px;"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model=" reg_ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model=" reg_ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model=" reg_ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="reg_submitForm('reg_ruleForm')">注册</el-button>
              <el-button @click="reg_resetForm('reg_ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </van-tab>
      </van-tabs>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    //登录
    var checkUser = (rule, value, callback) => {
      //可以用rules里的message属性
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    //注册
    var reg_checkUser = async (rule, value, callback) => {
      //发送ajax进行用户名验证
      let res = await this.$axios.get("http://10.3.133.72:10086/user/check", {
        params: {
          username: this.reg_ruleForm.username
        }
      });

      // res = JSON.stringify(res);
      // console.log(res.data)
      //可以用rules里的message属性
      if (res.data.code == 0) {
        //后端传过来的数据都在data属性里面
        // console.log("res:" + res);
        return callback(new Error("用户名已存在"));
      } else {
        callback();
      }
    };

    var reg_validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.reg_ruleForm.checkPass !== "") {
          this.$refs.reg_ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var reg_validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.reg_ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      checked: true,
      ruleForm: {
        username: "",
        password: "",
        checkPass: ""
      },
      reg_ruleForm: {
        username: "",
        password: "",
        checkPass: ""
      },
      rules: {
        username: [{ validator: checkUser, trigger: "blur" }],
        password: [
          { validator: validatePass, trigger: "blur" },
          { min: 3, max: 10, message: "请输入密码为3-10位字符" }
        ]
      },
      reg_rules: {
        username: [
          { required: true, message: "亲，用户名必须填写哟", trigger: "blur" },
          { validator: reg_checkUser, trigger: "blur" }
        ],
        password: [
          { validator: reg_validatePass, trigger: "blur" },
          { min: 3, max: 10, message: "请输入密码为3-10位字符" }
        ],
        checkPass: [{ validator: reg_validatePass2, trigger: "blur" }]
      }
    };
  }, //====data===
  methods: {
    submitForm(formName) {
      let { username, password } = this.ruleForm;
      //登录提交
      this.$refs[formName].validate(async valid => {
        //登录验证
        let { data } = await this.$axios.get(
          "http://10.3.133.72:10086/user/login",
          {
            params: {
              username,
              password,
              mdl: this.checked
            }
          }
        );
        // console.log("返回的数据:", data.code);
        // console.log("存储token",data.data.Authorization)
        if (data.data.Authorization) {
          //读取本地的 token
          // console.log("存储token",data.data.Authorization)
          localStorage.setItem("Authorization", data.data.Authorization);
          localStorage.setItem("username", data.data.username);
        }
        // console.log("data:", data);
        if (data.code === 0) {
          alert("用户或者密码错误！");
          return false;
        } else {
          alert("登录成功！");
          // console.log(this.$route);
          if (this.$route.query.targetUrl) {
            // console.log(this.$route.query.targetUrl)
            this.$router.push(this.$route.query.targetUrl); //购物车或者mine需要登录，记录足迹并跳转（在全局路由里面做了配置）
          } else {
            this.$router.push("/mine");
          }
        }
      });
    },
    reg_submitForm(formName) {
      //注册提交
      // console.log("formName:" + formName);
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let { username, password } = this.reg_ruleForm;
          let data = { username, password };
          // console.log(this.reg_ruleForm.username);
          let res = await this.$axios.post(
            "http://10.3.133.72:10086/user/reg",
            data
          );
          alert("注册成功，确定后跳转到个人中心!");
          //由于存在路由拦截（根据 token 的有效性拦截），注册成功后需要进行自动登录才能不被拦截
          // this.$router.push("/mine");
          //自动登录
          let {
            data: { data: AutoLogin }
          } = await this.$axios.get("http://10.3.133.72:10086/user/login", {
            params: {
              username,
              password,
              mdl: true
            }
          });
          // console.log("AutoLogin:", AutoLogin);
          if (AutoLogin.Authorization) {
            //token 写入本地
            localStorage.setItem("Authorization", AutoLogin.Authorization);
            localStorage.setItem("username", AutoLogin.username);
            this.$router.push("/mine");
          } else {
            alert("登录失败，请重新登录");
          }
          // console.log("跳转");
        } else {
          // console.log("注册失败！");
          return false;
        }
      });
    },
    resetForm(formName) {
      //登录重置
      this.$refs[formName].resetFields();
    },
    reg_resetForm(formName) {
      //注册重置
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
header {
  width: 100%;
  height: 180px;
  background: url(../assets/mine/reg_login.png);
  background-size: 100%;
  position: relative;
  div {
    width: 100px;
    height: 100px;
    color: #fff;
    text-align: center;
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);

    p {
      font-size: 24px;
    }
    h3 {
      font-size: 28px;
    }
  }
}
main {
  width: 100%;
  height: 300px;
  position: relative;
  .van-tabs {
    width: 100%;
    position: absolute;
    top: -40px;
    left: 0;
    /deep/ .van-tabs__wrap {
      width: 100%;
      height: 50px;
      .van-tabs__nav {
        margin: 0;
        height: 50px;

        .van-ellipsis {
          color: #000;
          line-height: 50px;
          font-size: 16px;
        }
      }
    }
  }
}
// .el-form-item__label{

// }
</style>