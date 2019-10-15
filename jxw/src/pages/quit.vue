<template>
  <div class="quit">
      <div class="quit_header">
           <p class="title_icon">
               <i class="icon-arrow-left"></i>
           </p>
           <div class="title">
                <div class="quit_title">
                    <h5>个人设置</h5>
                </div>
            </div>
      </div>
      <div class="quit_list">
          <div class="quit_con">
              <div class="con_list">
                   <div class="list_left">
                   基本信息
                   </div>
                    <div class="list_right">
                       18378176771
                       <span class="ri_icon"></span>                                    
                    </div>
              </div>
               <div class="line-css"></div>
               <div class="con_list">
                   <div class="list_left">
                   修改登录密码
                   </div>
                    <div class="list_right">
                       <span class="ri_icon"></span>                                    
                    </div>
              </div>
               <div class="line-css"></div>
               <div class="con_list">
                   <div class="list_left">
                   修改支付密码
                   </div>
                    <div class="list_right">
                       <span class="ri_icon"></span>                                    
                    </div>
              </div>
               <div class="line-css"></div>
               <div class="con_list">
                   <div class="list_left">
                   更换手机号
                   </div>
                    <div class="list_right">
                       18378176771
                       <span class="ri_icon"></span>                                    
                    </div>
              </div>
               <div class="line-css"></div>
               <div class="con_list">
                   <div class="list_left">
                   关于我们
                   </div>
                    <div class="list_right">
                       <span class="ri_icon"></span>                                    
                    </div>
              </div>
               <div class="line-css"></div>
          </div>
      </div>
      <div class="quit_fixed">
          <p class="fixed_con">退出登录</p>
      </div>      
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.quit{
    .quit_header{
       background: #fff;
       padding-top: 9px;
       position:relative;
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
            background: #fff;
           padding: 52px 16px 32px;
           .quit_title{
               h5{
                 font-size: 24px;
                 color: #333;
                font-weight: 400;
               }  
           }
       }
    }
    .quit_list{
        padding-bottom: 60px;
        .quit_con{
            margin:0 15px;
            background-color: #fff;
            line-height: 1.71428571;
            font-size: 14px;
            overflow: hidden;
            position: relative;
            border-top:1px solid #c0ccda;
            .con_list{
                padding: 20px 0;
                font-size: 14px;
                color: #333;
                position: relative;
                .list_left{
                    padding-right: 15px;
                    display:inline-block;
                    word-wrap: break-word;
                    word-break: break-all;
                    font-size: 14px;
                    color: #1b2d3e;
                    min-width: 213px;
                    -webkit-box-flex: 1;
                    flex: 1;
                }
                .list_right{
                    font-size: 14px;
                    color: #a5aab4;
                    word-wrap: break-word;
                    max-width: 50%;
                    // padding-right: 13px;
                    text-align: right;
                    display:inline-block;
                    .ri_icon{
                        display:inline-block;
                        content: "";
                        width: 8px;
                        height: 8px;
                        border: 1px solid #a5aab4;
                        border-width: 1px 1px 0 0;
                        transform: rotate(-315deg);
                        position: absolute;
                        top: 50%;
                        margin-top: -4px;
                        right: 2px;
                    }
                }
            }
           .line-css {
               margin-top:6px;
               border-bottom: 1px solid #f5f5f5;
             } 
        }
    }
    .quit_fixed{
        width: 100%;
        position: fixed;
        z-index: 999;
        left: 0;
        bottom: 0;
        height: 60px;
        line-height: 60px;
        border-top: 1px solid #eaeaea;
        box-sizing: border-box;
        display: flex;
        overflow: hidden;
        background:#fff;
        .fixed_con{
            text-align: center;
            color: #333;
            font-size: 18px;
            -webkit-box-flex: 1;
            -webkit-flex: 1;
        } 
    }
   
}
</style>