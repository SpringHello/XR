<template>
    <div>
        <div class="w_header">
            <div class="header_center">
                <div>
                    <p>双旦同庆，钜惠上云</p>
                    <p>爆款云产品、高配GPU云服务器等活动产品低至 2.7 折，更有好礼相送，等您来拿!</p>
                    <div class="w_button">
                        <span>登录即可抽奖</span>
                    </div>
                </div>
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
            width: 600px;
            height: inherit;
            background: url('../../../assets/img/active/doubleDenier/double.png');
            background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;
            .w_button{
                color: rgba(26, 42, 210, 1);
                font-family: 'PingFangSC-Medium';
                font-size: 13px;
                width: 140px;
                height: 43px;
                background: rgb(255, 222, 42);
                box-shadow: 0px 0px 0px 0px rgb(136, 20, 17);
            }
        }
    }
</style>
