<template>
    <div>
        <div class="w_header">
            <div class="header_center">
                <div style="display:inline-block;position:relative;top: 91px;left: 102px;">
                    <p class="pt_denier">双旦同庆，钜惠上云</p>
                    <p class="pt_white">爆款云产品、高配GPU云服务器等活动产品低至 <span style="font-size:36px;">2.7</span> 折，更有好礼相送，等您来拿!</p>
                    <div class="w_button">
                        <span>登录即可抽奖</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="w_gift">
            <div class="gift_one">
                <img  src="../../../assets/img/active/doubleDenier/li_da.png">
                <span>查看详情</span>
            </div>
            <div class="gift_two">
                <img  src="../../../assets/img/active/doubleDenier/zhe_da.png">
                <span>查看详情</span>
            </div>
            <div class="gift_three">
                <img  src="../../../assets/img/active/doubleDenier/0_da.png">
                <span>查看详情</span>
            </div>
            <div class="gift_four">
                <img  src="../../../assets/img/active/doubleDenier/38_da.png">
                <span>立即领取</span>
            </div>
        </div>
        <div class="w_center">
            <div class="w_give">
                <p style="color:#FF3000;font-size:32px;font-weight:550;line-height:72px;">活动首购 好礼相送</p>
                <p style="color:#222222;font-size:16px;">首购享好礼，在此活动中购买任意产品即可领取 “京东E卡（30元）”一张！</p>
                <!-- <img src="../../../assets/img/active/doubleDenier/"> -->

            </div>
            <div class="w_draw">
                <img src="../../../assets/img/active/doubleDenier/back.png">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
    .w_header{
        background: linear-gradient(left,rgb(233, 40, 49),rgb(250, 107, 53));
        background:-webkit-linear-gradient(left,rgb(233, 40, 49),rgb(250, 107, 53));
        background: -moz-linear-gradient(left,rgb(233, 40, 49),rgb(250, 107, 53));
        background: -o-linear-gradient(left,rgb(233, 40, 49),rgb(250, 107, 53));
        height: 400px;
        .header_center{
            margin: 0 auto;
            width: 1344px;
            height: inherit;
            background: url('../../../assets/img/active/doubleDenier/double.png');
            background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;
            .w_button{
                color: rgba(26, 42, 210, 1);
                font-family: PingFangSC-Medium;
                font-weight: 500;
                font-size: 13px;
                width: 140px;
                line-height: 43px;
                letter-spacing:3px;
                text-align: center;
                height: 43px;
                background: rgb(255, 222, 42);
                box-shadow: 0px 2px 2px 1px rgb(136, 20, 17);
                cursor: pointer;
            }
            .pt_denier{
                font-size: 48px;
                font-family:微软雅黑;
                font-weight:600;
                background: linear-gradient(rgba(255, 251, 227, 1),rgba(255, 200, 75, 1));
                -webkit-background-clip: text;
                color: transparent;
                text-shadow:1px 1px 1px  #000;
            }
            .pt_white{
                color: #FFFFFF;
                font-family: PingFangSC-Medium;
                font-size: 18px;
                margin: 12px 0 48px 0;
                span{
                    text-shadow: 2px 1px 4px  #000;
                    font-style:italic;
                }
            }
        }
    }
    .w_gift{
        position: relative;
        top: -47px;
        margin-left: 338px;
        display: flex;
        .gift_one{
            text-align: center;
            padding: 6px 7px;
            width: 295px;
            height: 138px;
            background: url('../../../assets/img/active/doubleDenier/li_da.png') no-repeat;
            background-size:100% 100%;-moz-background-size:100% 100%;
            img{
                width:265px;height:124px; 
            }
            span{
                position: relative;
                top: -47px;
                font-size: 14px;
                color: #FFFFFF;
                left: 13px;
                cursor: pointer;
            }
            img:hover{
                width: 310px;
                height: 143px;
            }
        }
        .gift_two{
            text-align: center;
            padding: 6px 7px;
            width: 295px;
            height: 138px;
            background: url('../../../assets/img/active/doubleDenier/zhe_da.png') no-repeat;
            background-size:100% 100%;-moz-background-size:100% 100%;
             img{
                width:265px;height:124px; 
            }
            span{
                position: relative;
                top: -47px;
                font-size: 14px;
                color: #FFFFFF;
                left: 13px;
                cursor: pointer;
            }
            img:hover{
                width: 310px;
                height: 143px;
            }
        }
        .gift_three{
            text-align: center;
            padding: 6px 7px;
            width: 295px;
            height: 138px;
            background: url('../../../assets/img/active/doubleDenier/0_da.png') no-repeat;
            background-size:100% 100%;-moz-background-size:100% 100%;
             img{
                width:265px;height:124px; 
            }
            span{
                position: relative;
                top: -47px;
                font-size: 14px;
                color: #FFFFFF;
                left: 13px;
                cursor: pointer;
            }
            img:hover{
                width: 310px;
                height: 143px;
            }
        }
        .gift_four{
            text-align: center;
            padding: 6px 7px;
            width: 295px;
            height: 138px;
            background: url('../../../assets/img/active/doubleDenier/38_da.png') no-repeat;
            background-size:100% 100%;-moz-background-size:100% 100%;
             img{
                width:265px;height:124px; 
            }
            span{
                position: relative;
                top: -47px;
                font-size: 14px;
                color: #FFFFFF;
                left: 13px;
                cursor: pointer;
            }
            img:hover{
                width: 310px;
                height: 143px;
            }
        }
    }
    .w_center{
        height: 485px;
        background: rgb(253, 239, 220);
        text-align: center;
        padding: 58px 0 22px 0;
        margin-top: -40px;
        .w_give{
            display: inline-block;
            position: relative;
            text-align: center;
        }
        .w_draw{
            display: inline-block;
            position: relative;
        }
    }
</style>
