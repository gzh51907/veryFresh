<template>
  <div class="list">
      <div class="list_header">
      <p class="title_icon">
         <i class="icon-arrow-left"></i>
      </p>
      <div class="title">
        <div class="list_title">
            <h3>螯龙虾</h3>
            <span class="title_right">搜索</span>
        </div> 
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">鲜活产品</el-breadcrumb-item>
            <el-breadcrumb-item>龙虾类</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
        <van-tag 
        v-for="index in 4" 
        :key="index" 
        plain 
        size="large" 
        style="margin-left:16px;color:#000;width:40px;height:24px;text-align:center;line-height:24px;"
        >标签</van-tag>
       </div>
       <div class="goodlist">
        <dl>
          <dt>
            <div class="goods_pic">
              <img src="../assets/goods/good1.jpg" />
              <span class="data-style">10-18到港</span>
              <span class="abroad-style">国内精品</span>
            </div>
          </dt>
          <dd>
            <div class="good_name">
              <i class="Self-support">自营</i> 极鲜仓配 中国 扇贝 野生（上海市发货）
            </div>
            <div class="row2">
              <span class="sale-volume">已售:1114箱</span>
              <span class="guige" style="margin-left:15px;">45-60g左右/只</span>
            </div>
            <div class="row3">
              <div>
                <span class="p_price" style="font-size:16px">￥81.00</span>
                <span class="p_weight">/500g</span>
              </div>
              <i class="el-icon-shopping-cart-2"></i>
            </div>
          </dd>
        </dl>
        <div class="line-css"></div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    // async created(){
    //     //发起请求获取数据
    //     let {data}=await this.$axios.get("https://zuul.gfresh.cn/api/product/product/categorySearch",{
    //         params:{
    //             level:3,
    //             type:4,
    //             productType:0,
    //             pageNumber:1,
    //             lastPageNumber:0,
    //             pageSize:10,
    //             cityId:"44769e16-ecc6-4d18-a210-caf1c6ec1dea",
    //             arrivedDate:'',
    //             specName:'',
    //             isProprietary:0,
    //             categoryId:"b4813f55-fe95-4e4f-af67-8811572eec80",
    //         }
    //     });
    //     console.log(data);
    // }


};
</script>
<style lang="scss" scoped>
.list{
.list_header{
   padding-bottom:16px;
   border-bottom:1px solid #ccc;
     .title_icon{
            position: absolute;
            width: 30px;
            height: 30px;
            top: 8px;
            left: 16px;
            z-index: 101;
            .icon-arrow-left{
                content: "";
                position: absolute;
                width: 10px;
                height: 10px;
                border: 1px solid #333;
                border-width: 1px 0 0 1px;
                transform: rotate(315deg);
                top: 8px;
                left: 7px;
            }
        } 
    .title{
     padding: 52px 16px 32px;
    .list_title {
      
       h3{
          font-size: 24px;
         color: #000;
         display: inline-block; 
       } 
       .title_right{
           float:right;
           margin-right:20px;
          font-size:16px;
          color: gray;
       }
    }
      
    }
}

.goodlist{
    dl {
    // background: #58bc58;
    padding: 16px;
    display: flex;
    justify-content: flex-start;
    dd {
        position: relative;
        padding-left: 8px;
        .good_name {
        text-align: left;
        font-size: 12px;
        color: #333;
        height: 15px;
        line-height: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        }
        .row2 {
        padding-top: 8px;
        font-size: 12px;
        color: rgba(51, 51, 51, 0.6);
        overflow: hidden;
        text-overflow: ellipsis;
        }
        .row3 {
        // width: 100%;
        width: calc(100% - 8px);
        position: absolute;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        i {
            color: rgb(4, 99, 222);
            font-size: 25px;
            position: absolute;
            bottom: 0;
            right: 0;
            min-width: 48px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border: 1px solid rgb(4, 99, 222);
            border-radius: 15px;
        }
        }
    }
  // 图片
  .goods_pic {
    position: relative;
    img {
      width: 136px;
      height: 136px;
    }
    .data-style {
      text-align: center;
      font-size: 10px;
      height: 22px;
      position: absolute;
      top: 4px;
      left: 0;
      color: #fff;
      line-height: 22px;
      border-top-right-radius: 11px;
      border-bottom-right-radius: 11px;
      background-image: -webkit-linear-gradient(left, #66bdf8, #0091f3);
      background-image: linear-gradient(90deg, #66bdf8, #0091f3);
      min-width: 40px;
      font-weight: 600;
    }
    .abroad-style {
      text-align: center;
      font-size: 10px;
      height: 14px;
      position: absolute;
      bottom: 5px;
      left: 6px;
      color: #333;
      line-height: 14px;
      border-radius: 2px;
      background-color: #fff;
    }
  }
  // 自营
  .Self-support {
    background: RGB(255, 64, 129);
    display: block;
    width: 25px;
    height: 16px;
    color: #fff;
    font-size: 10px;
    text-align: center;
    // line-height: 16px;
    border-radius: 3px;
    float: left;
    margin-right: 5px;
  }
  // 价格
  .p_price {
    font-size: 14px;
    font-weight: bold;
    margin-right: 10px;
  }
  // 重量
  .p_weight {
    font-size: 10px;
  }
  }
}
.line-css {
    border-bottom: 1px solid #f5f5f5;
    margin-left: 16px;
    margin-right: 16px;
  }
}


</style>