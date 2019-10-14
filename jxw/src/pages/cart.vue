<template>
  <div>
    <el-row class="title">
       <el-col :span="20">购物车</el-col>
       <el-col :span="4">删除</el-col>
    </el-row>
    <div class="block">
      <el-row class="store">
        <el-col :span="2"><input type="checkbox" name="" id=""></el-col>
        <el-col :span="22"><span class="storeName">极鲜仓配</span></el-col>
      </el-row >
      <el-row class="list" v-for="(item,index) in 3" :key='index' >
        <el-col  :span="2"><input type="checkbox" name="" id=""></el-col>
        <el-col :span="22">
             <ul>
              <li>
                  <div class="goods">
                     <div class="con">
                        <img src="https://file.gfresh.cn/product/2018/1/4ca32455-bda2-4c75-befb-4955c5cbff54/1515132584343.4313D99D7F7-0B1F-427B-A286-DEC881100611.jpeg" alt="">
                        <div class="con_right">
                            <h4>极鲜仓配 印尼 青龙 野生</h4>
                            <div class="info">
                                <div class="left">
                                    <p class="price">
                                        <span>¥141.00</span>
                                        <small>/500克</small>
                                        </p>
                                    <span>¥1410.00/箱</span>
                                </div>
                                <div class="right">
                                    <span class="cut">-</span>
                                    <input type="number" v-model='value' value="1" >
                                    <span class="add" @click='add(number)'>+</span>
                                </div>
                            </div>
                        </div>
                     </div>
                  </div>
                  <div class="props">
                      <span>现货</span>
                      <span>200~300g</span>
                      <span>5千克/箱</span>
                  </div>
              </li>
          </ul>
        </el-col>
      </el-row>
      <el-row class="rule" @click.native='goto'>
        <el-col :span="18">购物车或订单合并支付，运费可以合并计算节省运费</el-col>
        <el-col :span="6">规则详情></el-col>
      </el-row>
       <el-row class="count">
        <el-col :span="12">
          <input type="checkbox" name="" id="">
          <label for="">全选</label>
        </el-col>
        <el-col :span="12">
          <span class="dis">￥<b>0.00</b></span>
          <span class="goAccount">去结算（<strong>0</strong>）</span>
        </el-col>
      </el-row>
    
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
     value:"1"
    };
  },
  computed: {
    number: 1
  },
  methods: {
    add(val) {
      ++val;
      console.log(val);
      return val;
    },
    goto() {
      console.log("1");
      this.$router.push("/cart_rules");
    }
  }
};
</script>


<style lang='scss' scoped>
.title {
  height: 125px;
  border-bottom: 1px solid #000;
  line-height: 125px;
  .el-col-20 {
    font-size: 24px;
    padding-left: 20px;
    color: #333;
  }
  .el-col-4 {
    font-size: 16px;
    color: #777;
  }
}
.block {
  margin-bottom: 48px;
  .el-col-2 {
    text-align: center;
  }
  .store {
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    border-bottom: 1px solid #ccc;
    .el-col-22 {
      padding-left: 10px;
    }
  }
  .list {
    .el-col-2 {
      height: 73px;
      line-height: 73px;
    }
    .el-col-22 {
      ul {
        width: 100%;

        li {
          list-style: none;
          .goods {
            position: relative;

            .goods_check {
              position: absolute;
              top: 50%;
            }
            .con {
              display: flex;
              margin-left: 8px;
              border-bottom: 1px solid #ccc;
              img {
                width: 72px;
                margin-right: 10px;
              }
              .con_right {
                width: calc(100% - 72px);
                .info {
                  position: relative;
                  .left {
                    position: absolute;
                    left: 0;
                    width: 77px;
                  }
                  .right {
                    position: absolute;
                    right: 0;
                    width: 110px;
                    input {
                      width: 35px;
                      border: none;
                      text-align: center;
                    }
                    span {
                      display: inline-block;
                      width: 26px;
                      height: 26px;
                      text-align: center;
                      line-height: 26px;
                      border: 1px solid #000;
                      border-radius: 50%;
                      font-weight: 900;
                    }
                  }
                }
              }
            }
          }
          .props {
            height: 36px;
            margin: 8px 0 0 0px;
            border-bottom: 1px solid #cccc;
            span {
              font-size: 12px;
              margin-left: 8px;
              color: #33333399;
            }
          }
        }
      }
    }
  }
}

.rule {
  background-color: #ffa219;
  height: 50px;
  text-align: center;
  color: #fff;
  line-height: 50px;
}
.count {
  height: 64px;
  line-height: 64px;
  position: relative;
  .el-col-12 {
    padding-left: 10px;
  }
  span {
    display: inline-block;
  }
  .dis {
    height: 80px;
    font-size: 22px;
    position: absolute;
    right: 120px;
  }
  .goAccount {
    position: absolute;
    right: 0;
    width: 120px;
    height: 64px;
    background-image: -webkit-linear-gradient(left, #4334ab, #0091f3);
    font-size: 16px;
    text-align: center;
  }
}
</style>
