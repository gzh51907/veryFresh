<template>
  <div>
    <el-row class="title">
       <el-col :span="20">购物车</el-col>
       <el-col :span="4">删除</el-col>
    </el-row>
    <div class="block" >
    <div  v-for="item in dataList" :key="item.shopId">
        <el-row class="store">
        <el-col :span="2"><input type="checkbox" name="" id=""></el-col>
        <el-col :span="22"><span class="storeName">{{item.shopName}}</span></el-col>
      </el-row >
      <el-row class="list" v-for="goods in item.shoppingCartVos" :key='goods.productId'>
        <el-col  :span="2"><input type="checkbox" name="" id=""></el-col>
        <el-col :span="22">
             <ul>
              <li>
                  <div class="goods">
                     <div class="con">
                        <img :src="goods.productImg" alt="">
                        <div class="con_right">
                            <h4>{{goods.productName}}</h4>
                            <div class="info">
                                <div class="left">
                                    <p class="price">
                                        <span>¥{{goods.unitPrice}}</span>
                                        <small>/{{goods.unitPriceUnit}}</small>
                                    </p>
                                    <span class="bottom">¥{{goods.salePrice}}/{{goods.salePriceUnit}}</span>
                                </div>
                                <div class="right">
                                    <span class="cut" @click='cut(goods.productId)'>-</span>
                                    <input type="number" value="1" v-model='goods.num'>
                                    <span class="add" @click='add(goods.productId)'>+</span>
                                     <!-- <el-input-number size="mini" v-model="goods.inducement"></el-input-number> -->
                                </div>
                            </div>
                        </div>
                     </div>
                  </div>
                  <div class="props"  v-for="details in goods.dynamicProperties" :key='details.name'>
                      <span>现货</span>
                      <span>{{details.propertieValue.enValue}}</span>
                      <span>{{details.propertieValue.Value}}</span>
                  </div>
              </li>
          </ul>
        </el-col>
      </el-row>
    </div>
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
      num4: 1,
      dataList: ""
    };
  },
  computed: {},
  methods: {
    add(id) {
      this.dataList.map(item => {
        item.shoppingCartVos.forEach(i => {
          if (i.productId === id) {
            i.num += 1;
            if (i.num >= i.stockQty) {
              i.num = i.stockQty;
            }
          }
        });
      });
    },
    cut(id) {
      this.dataList.map(item => {
        item.shoppingCartVos.forEach(i => {
          if (i.productId === id) {
            i.num -= 1;
            if (i.num <= 1) {
              i.num = 1;
            }
          }
        });
      });
    },
    goto() {
      console.log("1");
      this.$router.push("/cart_rules");
    }
  },
  async created() {
    let { data } = await this.$axios.get("http://10.3.133.72:10086/goods/cart");
    this.dataList = data;

    console.log(data);
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
  .el-col-2 {
    text-align: center;
  }
  .store {
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    border-bottom: 1px solid #ccc;
    .el-col-22 {
      font-weight: 900;
      padding-left: 10px;
      font-size: 16px;
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
                h4 {
                  font-weight: 600;
                  font-size: 12px;
                  margin: 5px 0;
                }
                .info {
                  position: relative;
                  .left {
                    height: 50px;
                    position: absolute;
                    left: 0;
                    width: 77px;
                    p {
                      margin-bottom: 6px;
                    }
                    .bottom {
                      color: rgb(136, 135, 135);
                    }
                  }
                  .right {
                    position: absolute;
                    right: 0;
                    width: 110px;
                    // /deep/ .el-input {
                    //   width: 100px;
                    //   input {
                    //     // width: 35px;
                    //     text-align: center;
                    //   }
                    // }
                    //  /deep/ .el-input-number__increase{
                    //   right: 30px;
                    // }

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
    height: 64px;
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
