<template>
    <div>
        <div class="title">
            <p @click="goto">&lt;</p>
            <h4>规则详情</h4>
        </div>
        <div class="main">
            <div class="block">
                       <h3>一. 极鲜网针对海外原包的商品，推出合并订单计算运费的优惠：</h3>
            <p>同一店铺下，同一商品+同一发货地+同一到港日期+同一配送方式下，不同产品规格，通过购物车生成订单，运费省更多。</p>
           <dl>
               <dt>1. 哪些商品或订单符合运费优惠条件？</dt>
               <dd>(1) 商品上有“海外原包”的标签；</dd>
               <dd>(2) 目前仅有到港日期的期货可以享受优惠，现货还是按照订单单独计算运费；</dd>
               <dd>(3) 按照发货地，可以合并计算运费；</dd>
               <dd>(4) 加入购物车，生成订单，合计算运费。</dd>
           </dl>
            <dl>
               <dt>2. 具体怎么计算运费？</dt>
               <dd>例如：以品牌A为例</dd>
               <dd>螯龙虾，到港日期为5-1日和5-2日，</dd>
               <dd>上海发货，各有a,b,c,d四个规格；</dd>
               <dd>北京发货，e,f,g规格；</dd>
               <dd> 我购买了5月1日，a，b，c规格； </dd>
               <dd>  如果商品详情页直接购买，则a，b，c按件数或重量，单独计算运费； </dd>
               <dd> 如果加入购物车，则a，b，c件数求和，按照总件数计算运费。</dd>
               <dd></dd>
           </dl>
           <dl>
               <dt>3. 生成订单如何显示运费；将合计运费，按比例拆分至各个订单</dt>
           </dl>
            <dl>
               <dt>4. 生成订单后，再修改订单或分货操作时，按订单单独计算运费。</dt>
           </dl>
            </div>
            <div class="block">
                <h3>二. 国内现货合并计算费用的规则如下：</h3>
                <p>合并计算运费有两个地方，一是购物车，二是订单合并支付，规则：同一国内店铺+商品是现货+同一送货地址时才可以合并。</p>
                <p>注意：</p>
                <dl>
                    <dd> 1. 支付全款时才会合并计算运费，定金支付不合并计算。</dd>
                    <dd> 2. 同时支付的订单中同一国内卖家的各个商品运费模板不一样，那么就各自按照自己的模板计算，但是起运费按照这些模板中，最高的起运费计算，但是只加一次起运费。</dd>
                    <dd></dd>
                </dl>
                <p>省运费方法：</p>
                <dl>
                    <dd> 1. 尽量把同一个店铺的现货商品放在同一个购物车一起支付。</dd>
                    <dd>2. 如果同一个店铺的现货商品，分成了不同的订单下单，支付时可以勾选同一个店铺的这些订单一起支付，系统也会自动合并计算运费。</dd>
                </dl>
                <p>国内现货和国际现货不会合并计算运费</p>
            </div>


        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{}
    },
    methods:{
        goto(){
            this.$router.push('/cart')
        }
    }
};
</script>

<style lang='scss' scoped>
.title {
  height: 124px;
  border-bottom: 1px solid #ccc;
  p {
    width: 40px;
    height: 42px;
    font-size: 20px;
    text-align: center;
    line-height: 42px;
    cursor: pointer;
  }
  h4 {
    padding: 20px;
    font-size: 24px;
    color: #333;
  }
}
.main {
    padding: 0 10px 12px;
.block{
      h3 {
    font-size: 16px;
    font-weight: 800;
    line-height: 28px;
  }
  p {
      font-size: 14px;
  }
  dl {
       font-size: 14px;
    dd {
        padding: 0 10px;
        line-height: 20px;
    }
  }
}
}
</style>
