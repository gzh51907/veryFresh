<template>
  <div class="detail">
    <div class="del_header">
      <p class="title_icon el-icon-arrow-left" @click="goback()"></p>
      <div class="del_img">
        <img :src="gooddata.imgUrl" />
      </div>
      <div class="del_tag">
        <span class="abroad-style" v-if="gooddata.abroad === 2">国内精品</span>
        <span class="abroad-style" v-if="gooddata.abroad === 1">海外原包</span>
        <span class="num-style">4</span>
      </div>
    </div>
    <div class="del_con">
      <div class="good_name">
        <i class="Self-support1" style="margin-top:7px;" v-if="gooddata.isProprietary==='1'">自营</i>
        {{gooddata.name}}
      </div>
      <div class="good_price">
        <div class="row01">
          <div class="pro_price">
            <p class="p_priceA">
              <!-- ￥{{gooddata.}} -->
              <span v-if="gooddata.unitPrice == null">￥__.__</span>
                <span  v-else>￥{{(gooddata.unitPrice-0).toFixed(2)}}</span>
              <span class="s_weight">&nbsp;&nbsp;&nbsp;{{gooddata.unitName}}</span>
            </p>
            <p>
              ￥{{gooddata.specName}}
              <span class="trans_price">(运费每￥10/箱)</span>
            </p>
          </div>
          <div class="pro_logo">
            <img src="../assets/goods/3441455.jpg" alt />
          </div>
        </div>
        <div class="row02">
          <p class="p1">温馨提示：请注意龙虾验货不验软硬壳、弱品。因舱位紧张导致的拉货,调剂，无赔偿。</p>
          <p class="p2">极鲜网提供验货服务</p>
        </div>
      </div>
      <div class="line-css"></div>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
        style="padding-bottom:100px;"
      >
        <el-form-item label="总销量:">
          <p class="sale_num">{{gooddata.saledQty}}{{gooddata.salePriceUnitName}}</p>
        </el-form-item>
        <el-form-item label="起发量:">
          <p class="sale_num">1{{gooddata.salePriceUnitName}}</p>
        </el-form-item>
        <el-form-item label="到港日期:">
          <van-button plain type="info">{{gooddata.sendDate}}</van-button>
        </el-form-item>
        <el-form-item label="包装规格">
          <van-button plain type="info">{{gooddata.packName}}</van-button>
        </el-form-item>
        <el-form-item label="产品规格:">
          <van-button plain type="info">{{gooddata.propertieValue}}({{gooddata.cityName}}发货)</van-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="del_car">
      <div class="car_add">
        <div class="add_flex">
          <div class="flex_up">
            <span>死亡率：10.0%</span>
            <span>失水率：4.0%</span>
            <span>破壳率：免赔</span>
          </div>
          <div class="flex_down">库存：有库存</div>
        </div>
        <div class="add_number">
          <span class="icon_mins showOpacity" @click="cut">-</span>
          <input type="text"  v-model="default_num"/>
          <span class="icon_plus"  @click="add">+</span>
        </div>
      </div>
      <div class="car_shop">
        <div class="shop_left">
          <a href="#">
            <van-icon name="like-o" />
          </a>
          <a href="#">
            <van-icon name="service-o" />
          </a>
          <a href="#" @click="goto_cart">
            <van-icon name="cart-o" />
          </a>
        </div>
        <div class="shop_right">
          <div class="shop_flex" @click="add2cart">加入购物车</div>
          <div class="shop_flex now_shop">立即购买</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  data() {
    return {
      labelPosition: "left",
      subPage: "",
      url: "",
      refer: "",
      gooddata: "",
      default_num: 1,
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      }
    };
  },
  methods: {
    goback() {
      this.$router.push({ path: this.subPage });
      // console.log(this.url)
    },
    goto_cart() {
      console.log("111");
      this.$router.push("/cart");
    },
    add() {
      this.default_num++;
      if (this.default_num >= this.gooddata.stockQty) {
        this.default_num = this.gooddata.stockQty;
        Message.error("库存不足，不要在点我啦！");
      }
    },
    cut() {
      this.default_num--;
      if (this.default_num < 1) {
        this.default_num = 1;
        Message("还想不想买啦！");
      }
    },
    async add2cart() {
      this.gooddata.qty = this.default_num;
      this.gooddata.username = localStorage.getItem("username");
      // console.log(this.gooddata)
      let { data: { code } } = await this.$axios.post(
        "http://10.3.133.72:10086/cart/AddToCart",
        this.gooddata
      );
      if (code === 1) {
        alert("加入成功！");
      }
    }
  },
  async created() {
    let productId = this.$route.params.gid;
    let { data: { data: goodsDetail } } = await this.$axios.get(
      `http://10.3.133.72:10086/goods/queryByPid?productId=${productId}`
    );
    this.gooddata = goodsDetail[0];
  },
  //路由守卫，进入路由时监听路由，目的为了回到上一页
  beforeRouteEnter(to, from, next) {
    //进入路由
    // console.log("beforeRouteEnter:to --> from", to, from);
    let prePage = from.fullPath;
    next(vm => {
      //回到上一页
      vm.subPage = prePage;
    });
  }
};
</script>

<style lang="scss" scoped>
.detail {
  .del_header {
    width: 100%;
    position: relative;
    background: #f5f5f5;
    height: 150px;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    overflow: hidden;
    .del_img {
      width: 70%;
      height: 200px;
      display: flex;
      overflow: hidden;
      align-items: center;
      -webkit-box-align: center;
      img {
        width: 100%;
        margin-right: 100%;
      }
    }
    .del_tag {
      position: absolute;
      left: 0;
      bottom: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 10px;
    }
    .title_icon {
      font-size: 25px;
      font-weight: 400;
      position: absolute;
      color: gray;
      left: 10px;
      top: 10px;
    }
  }
  .del_con {
    box-sizing: border-box;
    padding: 0 16px;
    .good_name {
      width: 100%;
      position: relative;
      box-sizing: border-box;
      padding: 10px 0 8px;
      font-size: 18px;
      font-weight: 700;
      .Self-support1 {
        margin-right: 5px;
        background: #ff4081;
        border-radius: 2px;
        height: 15px;
        line-height: 15px;
        width: 26px;
        text-align: center;
        font-size: 10px;
        color: #fff;
        font-style: normal;
        display: inline-block;
        position: relative;
        // float: left;
      }
    }
    .good_price {
      width: 100%;
      position: relative;
      margin-top: 8px;
      padding-bottom: 15px;
      .row01 {
        width: 100%;
        position: relative;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: justify;

        .pro_price {
          width: 100%;
          position: relative;
          -webkit-box-flex: 1;
          flex: 1;
          .p_priceA {
            font-size: 22px;
            line-height: 28px;
            font-weight: 700;
            .s_weight {
              font-size: 16px;
            }
          }
        }
        .pro_logo {
          width: 48px;
          height: 48px;
          overflow: hidden;
          border-radius: 4px;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-pack: center;
          justify-content: center;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .row02 {
        background: rgba(255, 152, 0, 0.05);
        padding: 6px 10px;
        box-sizing: border-box;
        color: #ff9800;
        font-size: 12px;
        margin: 16px 0 0;
      }
    }
    .line-css {
      margin-top: 8px;
      border-bottom: 1px solid #f5f5f5;
    }
    .el-form /deep/ .el-form-item {
      margin-bottom: 8px;
    }
  }
  .del_car {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 128px;
    z-index: 100;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    .car_add {
      width: 100%;
      position: relative;
      height: 64px;
      padding: 10px 16px;
      box-sizing: border-box;
      display: flex;
      -webkit-box-align: center;
      align-items: center;

      .add_flex {
        -webkit-box-flex: 1;
        flex: 1;
        overflow: hidden;
        margin-right: 10px;
        .flex_up {
          width: 100%;
          position: relative;
          font-size: 12px;
          span {
            margin-right: 10px;
          }
        }
        .flex_down {
          width: 100%;
          position: relative;
          font-size: 12px;
        }
      }

      .add_number {
        width: 106px;
        position: relative;
        text-align: right;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        -webkit-box-pack: end;
        justify-content: flex-end;
        span {
          width: 28px;
          height: 28px;
          font-size: 26px;
          color: #333;
          border: 1px solid #333;
          border-radius: 100%;
          text-align: center;
          line-height: 26px;
          display: inline-block;
        }
        // .showOpacity {
        //   opacity: 0.4;
        // }
        input {
          width: 40px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          border: 0;
          font-size: 16px;
          display: inline-block;
          margin: 0 5px;
        }
      }
    }
    .car_shop {
      position: relative;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      width: 100%;
      padding: 10px 0;
      height: 64px;
      box-sizing: border-box;
      .shop_left {
        width: 30%;
        justify-content: space-around;
        line-height: 60px;
        padding: 0 10px;
        position: relative;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        border-top: 1px solid #f5f5f5;
        border-right: 1px solid #f5f5f5;
        a {
          text-decoration: none;
          border-radius: 0;
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
          /deep/ .van-icon {
            font-size: 24px;
          }
        }
      }
      .shop_right {
        position: relative;
        -webkit-box-flex: 1;
        display: flex;
        flex: 1;
        height: 64px;
        .shop_flex {
          font-size: 16px;
          line-height: 64px;
          text-align: center;
          position: relative;
          -webkit-box-flex: 1;
          flex: 1;
          height: 64px;
          box-sizing: border-box;
          border-top: 1px solid #f5f5f5;
          border-right: 1px solid #f5f5f5;
        }
        .now_shop {
          color: #fff;
          background: linear-gradient(270deg, #0091f3, #4334ab);
        }
      }
    }
  }
}
</style>