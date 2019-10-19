<template>
  <el-container>
    <el-header style="height: 145px;">
      <el-row>
        <el-col :span="16" @click.native="goto()">
          <img src="../assets/mine/mine.jpg" alt />
          <div class="me">
            <h3>{{username}}</h3>
            <p>个人设置</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="top">
            <div class="block">
              <van-icon name="cash-back-record" />
              <span>提现</span>
            </div>
            <div class="block">
              <van-icon name="after-sale" />
              <span>充值</span>
            </div>
          </div>
          <div class="fast">专属号极速充值</div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row class="money">
        <el-col :span="8">
          <span>0.00</span>
          <p>我的余额</p>
        </el-col>
        <el-col :span="8">
          <span>0.00</span>
          <p>保证金</p>
        </el-col>
        <el-col :span="8">
          <span>0</span>
          <p>我的积分</p>
        </el-col>
      </el-row>
      <el-row class="contolal">
        <el-col :span="6">
          <img src="../assets/mine/1.png" alt />
          <p>待付款</p>
        </el-col>
        <el-col :span="6">
          <img src="../assets/mine/2.png" alt />
          <p>待发货</p>
        </el-col>
        <el-col :span="6">
          <img src="../assets/mine/3.png" alt />
          <p>已发货</p>
        </el-col>
        <el-col :span="6">
          <img src="../assets/mine/4.png" alt />
          <p>已结束</p>
        </el-col>
      </el-row>
      <div class="last">
        <el-row>
          <el-col :span="22">发票管理</el-col>
          <el-col :span="2">&gt;</el-col>
        </el-row>
        <el-row>
          <el-col :span="22">地址管理</el-col>
          <el-col :span="2">&gt;</el-col>
        </el-row>
        <el-row>
          <el-col :span="22">极鲜白条</el-col>
          <el-col :span="2">&gt;</el-col>
        </el-row>
        <el-row>
          <el-col :span="22">银行卡管理</el-col>
          <el-col :span="2">&gt;</el-col>
        </el-row>
        <el-row>
          <el-col :span="14">客服中心</el-col>
          <el-col :span="8">400-628-1818</el-col>
          <el-col :span="2">&gt;</el-col>
        </el-row>
        <el-row>
          <el-col :span="22">我的收藏</el-col>
          <el-col :span="2">&gt;</el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      username: ""
    };
  },
  async created() {
    this.$store.state.footer = 1;
    //获取 token 到后天解密出 用户名渲染数据
    let token = localStorage.getItem("Authorization");
    let { data: res } = await this.$axios.get(
      "http://10.3.133.72:10086/token/verify",
      {
        params: {
          Authorization: token
        }
      }
    );
    this.username = res.data.username;
  },
  methods: {
    goto() {
      // console.log("去修改信息");
      this.$router.push("/quit");
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  .el-header {
    padding: 0 0 0 20px;
    .el-row {
      margin-top: 46px;
      .el-col-16 {
        display: flex;

        img {
          width: 67px;
          height: 67px;
          border-radius: 50%;
        }

        .me {
          margin-left: 12px;
          width: 130px;
          h3 {
            font-size: 24px;
            font-weight: 900;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          p {
            color: #777;
          }
        }
      }
      .el-col-8 {
        padding-left: 20px;
        text-align: center;
        position: relative;
        .top {
          display: flex;
          .block {
            width: 46px;
            display: flex;
            flex-direction: column;
            font-size: 15px;
            .van-icon {
              font-size: 15px;
            }
          }
        }
        .fast {
          font-size: 9px;
          background: linear-gradient(270deg, #ff4081, #ff9800);
          color: #fff;
          width: 70px;
          margin-top: 20px;
          position: absolute;
          right: 0;
        }
      }
    }
  }
  .el-main {
    padding-top: 0;
    .money {
      height: 76px;
      display: flex;
      align-items: center;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      .el-col-8 {
        text-align: center;
        span {
          text-align: center;
          display: inline-block;
          width: 62px;
          font-size: 16px;
          font-weight: 700;
        }
        p {
          margin: auto;
          width: 62px;
          height: 24px;
          border: 1px solid #302c2c;
          font-size: 12px;
          line-height: 24px;
          text-align: center;
          color: #858585;
          border-radius: 30px;
        }
      }
    }
    .contolal {
      border-bottom: 1px solid #ccc;
      height: 76px;
      color: #858585;
      display: flex;
      align-items: center;
      .el-col-6 {
        // height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 20px;
        }
        p {
          // margin: auto;
        }
      }
    }
    .last {
      .el-row {
        height: 46px;
        border-bottom: 1px solid #ccc;
        line-height: 46px;
        font-size: 14px;
        color: #1b2d3e;
        .el-col-2 {
          color: #b1aaaa;
          text-align: right;
          font-size: 18px;
        }
        .el-col-8 {
          padding-right: 3px;
          text-align: right;
          font-size: 13px;
          color: #938d8d;
        }
      }
    }
  }
}
</style>