<template>
  <div>
    <el-row class="title">
       <el-col :span="20">购物车</el-col>
       <el-col :span="4">删除</el-col>
    </el-row>
    <div class="block" >
    <div  v-for="item in dataList" :key="item.shopId">
      <!-- 店铺复选框 -->
      <el-row class="store">
          <el-col :span="2"><input type="checkbox" name="" id="" v-model="item.isValid" @click='store_check(item.isValid,item.shopId)'></el-col>
          <el-col :span="22"><span class="storeName">{{item.shopName}}</span></el-col>
      </el-row >
      <el-row class="list" v-for="goods in item.shoppingCartVos" :key='goods.productId'>
        <!-- 商品复选框 -->
        <el-col :span="2"><input type="checkbox" name="" id="" v-model="goods.goods_check"></el-col>
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
                                    <input type="number"  v-model='goods.num'>
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
      <div class="fixed">
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
            <span class="dis">￥<b>{{totalPrice.toFixed(2)}}</b></span>
            <span class="goAccount">去结算（<strong>0</strong>）</span>
          </el-col>
        </el-row>
      </div>
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
  computed: {
    totalPrice() {
      let total = 0.0;
      this.dataList.forEach(item => {
        item.shoppingCartVos.forEach(i => {
          if (i.isValid) {
            total += i.unitPrice * i.num;
          }
        });
      });
      return total;
    }
  },
  methods: {
    add(id) {//数量加
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
    cut(id) {//数量减
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
    goto() {//详情规则
      // console.log("1");
      this.$router.push("/cart_rules");
    },
    store_check(check, id) {//店铺全选和不选：打钩控制商品打钩
      check = !check;
      console.log("店铺check", check);
      console.log("id", id);

      this.dataList.forEach(item => {
        if (item.shopId === id) {
          // console.log('a')
          item.shoppingCartVos.forEach(i => {
            i.goods_check = check; //添加每个商品打钩属性
            console.log(i.goods_check);
          });
        }
      });
    }

    //额外加属性：商品打钩
    // extra_goodsCheck() {
    //   this.dataList.forEach(item => {
    //     item.shoppingCartVos.forEach(i => {
    //       i.goods_check = true;
    //     });
    //     console.log(item);
    //     return item;
    //   });
    // }
  },
  async created() {
    let { data } = await this.$axios.get(
      "http://10.3.133.72:10086/goods/cart_test"
    );
    this.dataList = data;
    // console.log(data);

    let length = this.dataList.length; //为了在下面截取掉原本的数据，重新生成新数据
    this.dataList.forEach(item => {
      item.shoppingCartVos.forEach(i => {
        i.goods_check = true; //添加每个商品打钩属性
      console.log('dianpu:',i.isValid)
      });
      item.shop_check = true; //增加店铺打钩属性



      // console.log(item)
      // this.$watch("item.shop_check", function(new_val,old_val) {
      //   console.log('1')
      //   if (new_val != old_val) {
      //   }
      // },{deep:true});


      this.dataList.push(item);
    });

    this.dataList = this.dataList.slice(length); //截取掉原本的数据
    console.log("this.dataList", this.dataList);
  },


  // watch: {
  //   dataList: {
  //     handler(newValue, oldValue) {
  //       for (let i = 0; i < newValue.length; i++) {
  //         console.log('输出：',newValue[i].shop_check)
  //         if (oldValue[i]!=newValue[i]) {
            
  //           console.log('执行',oldValue[i]);
  //         }
  //       }
  //     },
  //     deep: true,
  //     // immediate: true
  //   }
  // },

  // watch: {
  //   "dataList.shop_check": function(new_val, old_val) {
  //     console.log(new_val, old_val);
  //     //  for(let i =0 ;i<new_val.length;i++){

  //     //  }
  //     //   if (new_val.shop_check != old_val.shop_check) {
  //     //   }
  //   }
  // }
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
