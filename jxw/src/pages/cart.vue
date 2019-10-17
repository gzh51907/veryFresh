<template>
  <div>
    <el-row class="title">
      <el-col :span="20">购物车</el-col>
      <el-col :span="4" @click.native="remove" v-model="dataList">删除</el-col>
    </el-row>
    <div class="block">
      <div v-for="item in dataList" :key="item.shopId">
        <!-- 店铺复选框 -->
        <el-row class="store">
          <el-col :span="2">
            <input
              type="checkbox"
              name
              id
              v-model="item.store_checked"
              @click="store_check(item.store_checked,item.shopId)"
            />
          </el-col>
          <el-col :span="22">
            <span class="storeName">{{item.shopName}}</span>
          </el-col>
        </el-row>
        <el-row class="list" v-for="goods in item.shoppingCartVos" :key="goods.productId">
          <!-- 商品复选框 -->
          <el-col :span="2">
            <input
              type="checkbox"
              name
              id
              v-model="goods.isValid"
              @change="goods_check(goods.isValid,item.shopId)"
            />
          </el-col>
          <el-col :span="22">
            <ul>
              <li>
                <div class="goods">
                  <div class="con">
                    <img :src="goods.productImg" @click="gotoDeatil(goods.productId)" />
                    <div class="con_right">
                      <h4 @click="gotoDeatil(goods.productId)">{{goods.productName}}</h4>
                      <div class="info">
                        <div class="left" @click="gotoDeatil(goods.productId)">
                          <p class="price">
                            <span>¥{{goods.unitPrice}}</span>
                            <small>/{{goods.unitPriceUnit}}</small>
                          </p>
                          <span class="bottom">¥{{goods.salePrice}}/{{goods.salePriceUnit}}</span>
                        </div>
                        <div class="right">
                          <span class="cut" @click="cut(goods.productId)">-</span>
                          <input type="number" v-model="goods.num" />
                          <span class="add" @click="add(goods.productId)">+</span>
                          <!-- <el-input-number size="mini" v-model="goods.inducement"></el-input-number> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="props"  v-for="details in goods.dynamicProperties" :key='details.name'>
                      <span>现货</span>
                      <span>{{details.propertieValue.enValue}}</span>
                      <span>{{details.propertieValue.Value}}</span>
                </div>-->
                <div class="props">
                  <span>现货</span>
                  <span>{{goods.propertieValue}}</span>
                  <span>{{goods.propertieEnValue}}</span>
                  <span>{{goods.propertieRemark}}</span>
                </div>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
      <div class="fixed">
        <el-row class="rule" @click.native="goto">
          <el-col :span="18">购物车或订单合并支付，运费可以合并计算节省运费</el-col>
          <el-col :span="6">规则详情></el-col>
        </el-row>
        <el-row class="count">
          <el-col :span="12">
            <input type="checkbox" name id v-model="all_check" @click="all_checks(all_check)" />
            <label for>全选</label>
          </el-col>
          <el-col :span="12">
            <span class="dis">
              ￥
              <b>{{totalPrice.toFixed(2)}}</b>
            </span>
            <span class="goAccount">
              去结算（
              <strong>{{totalNum}}</strong>）
            </span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  data() {
    return {
      num4: 1,
      dataList: "", //购物车页面所有数据
      arr_goodsCheck: [], //所有商品控制全选
      all_check: false, //全选默认状态
      goods: [] //存储购物车每个商品的数据
    };
  },
  computed: {
    totalPrice() {
      //勾选的商品总计价
      let total = 0.0;
      this.dataList.forEach(item => {
        item.shoppingCartVos.forEach(i => {
          if (i.isValid) {
            //如果商品打钩，计算总价
            total += i.unitPrice * i.num;
          }
        });
      });
      return total;
    },
    totalNum() {
      //勾选商品总数量
      let total = 0;
      this.dataList.forEach(item => {
        item.shoppingCartVos.forEach(i => {
          if (i.isValid) {
            total += i.num;
          }
        });
      });
      return total;
    }
  },
  methods: {
    add(id) {
      //数量加
      this.dataList.map(item => {
        item.shoppingCartVos.forEach(i => {
          if (i.productId === id) {
            i.num += 1;
            if (i.num >= i.stockQty) {
              i.num = i.stockQty;
              Message.error("库存不足，不要在点我啦！");
            }
          }
        });
      });
    },
    cut(id) {
      //数量减
      this.dataList.map(item => {
        item.shoppingCartVos.forEach(i => {
          if (i.productId === id) {
            i.num -= 1;
            if (i.num <= 1) {
              i.num = 1;
              Message("还想不想买啦！");
            }
          }
        });
      });
    },
    goto() {
      //详情规则
      this.$router.push("/cart_rules");
    },
    gotoDeatil(gid){
      this.$router.push({ name: "detail", params: { gid } });
    },
    remove() {
      //删除功能
      this.dataList.forEach((item, index) => {
        //如果店铺为打钩状态，删除item
        //不能先判断店铺为ture状态，这样删了一个店铺，数组长度变少，就少一个循环
        if (item.store_checked === false) {
          //如果店铺为false状态，遍历子结构（商品）
          item.shoppingCartVos = item.shoppingCartVos.filter(
            goods => goods.isValid == false //过滤出满足条件（勾选状态）的商品
          );
        }
        if (item.shoppingCartVos == 0) {
          //如果shoppingCartVos（存储商品）的数组为0，把该item（店铺）删掉
          this.dataList.splice(index, 1);
        }
        console.log("店铺为ture", this.dataList);
      });

      this.dataList.forEach((item, index) => {
        if (item.store_checked === true) {
          //如果店铺为true状态,直接删掉
          this.dataList.splice(index, 1);
        }
        console.log("店铺为false", this.dataList);
      });
    },

    store_check(check, id) {
      //店铺打钩
      check = !check; //(点击事件)
      this.dataList.forEach(item => {
        if (item.shopId === id) {
          item.shoppingCartVos.forEach(i => {
            if (check === true) {
              if (i.isValid === false) {
                this.arr_goodsCheck.push(true);
              }
            } else {
              this.arr_goodsCheck.pop();
            }

            if (this.arr_goodsCheck.length === this.goods.length) {
              //控制全选
              this.all_check = true;
            } else {
              this.all_check = false;
            }
            console.log(this.arr_goodsCheck);
          });
        }
      });
      this.dataList.forEach(item => {
        if (item.shopId === id) {
          item.shoppingCartVos.forEach(i => {
            i.isValid = check; //添加每个商品打钩属性
          });
        }
      });
    },

    goods_check(goodsCheck, shopId) {
      //商品打钩控制店铺
      let arr = [];
      let num = 0; //计数该店铺的商品个数：为了判断下面控制店铺打钩
      this.dataList.forEach(item => {
        if (item.shopId === shopId) {
          item.shoppingCartVos.forEach(i => {
            ++num;
          });
        }
      });

      this.dataList.forEach(item => {
        if (item.shopId === shopId) {
          item.shoppingCartVos.forEach(i => {
            if (i.isValid == false) {
              //遍历所有商品，有一个为false,店铺则为false
              item.store_checked = false;
            } else {
              //遍历所有商品，商品为true,数组长度加1
              arr.push(1);
              if (arr.length === num) {
                item.store_checked = true;
              }
            }
          });
        }
      });

      //商品打钩：如果有一个为false，控制店铺打钩为false;如果全部商品打钩，控制店铺打钩为true

      if (goodsCheck) {
        this.arr_goodsCheck.push(goodsCheck);
      } else {
        this.arr_goodsCheck.pop();
      }
      if (this.arr_goodsCheck.length === this.goods.length) {
        //控制全选
        this.all_check = true;
      } else {
        this.all_check = false;
      }
    },

    all_checks(check) {
      //全选功能（完成）
      check = !check;
      this.goods.forEach(item => {
        //控制所有商品
        item.isValid = check;
      });
      this.dataList.forEach(item => {
        item.store_checked = check; //控制所有店铺
      });
    }
  },
  async created() {
    let token = localStorage.getItem("Authorization");
    let { data:{data:datas} } = await this.$axios.get(
      "http://10.3.133.72:10086/cart/queryAll",
      {
        params: {
          token
        }
      }
    );
    console.log("datas:",datas)
    this.dataList = datas;

    let length = this.dataList.length; //为了在下面截取掉原本的数据，重新生成新数据
    this.dataList.forEach(item => {
      item.shoppingCartVos.forEach(i => {
        this.goods.push(i);
        // console.log("i", this.goods);
        i.goods_check = true; //添加每个商品打钩属性
        // console.log("dianpu:", i.isValid);
      });
      this.dataList.push(item);
    });

    this.dataList = this.dataList.slice(length); //截取掉原本的数据
    console.log("this.dataList", this.dataList);

    //初始化数组arr_goodsCheck:在商品打钩时控制全选功能
    // for (let i = 0; i < this.goods.length; i++) {
    //   this.arr_goodsCheck.push(true);
    // }
  },
  watch: {
    dataList: {
      handler(newValue, oldValue) {
        // for (let i = 0; i < newValue.length; i++) {
        //   console.log("输出：", newValue[i].shop_check);
        //   if (oldValue[i] != newValue[i]) {
        //     console.log("执行");
        //   }
        // }
      },
      deep: true
      // immediate: true
    }
  }
};
</script>


<style lang='scss' scoped>
.title {
  height: 125px;
  border-bottom: 1px solid #ccc;
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
  padding-bottom: 116px;
  .el-col-2 {
    text-align: center;
  }
  .store {
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    border-bottom: 1px solid rgba(204, 204, 204, 0.39);
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
              border-bottom: 1px solid rgb(238, 238, 238);
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

.fixed {
  position: fixed;
  bottom: 46px;
  width: 100%;
  height: 114px;
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
    background: #fff;
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
}
</style>
