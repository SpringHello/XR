<template>
  <div id="documentInfo">
    <Row>
        <Col span="6">
            <Menu  id="left" :open-names="['1']" active-name="1-2">
            </Menu>
            <Menu  id="left" :open-names="['弹性云主机']"  @on-select="push">
                <Submenu v-for="(item,index) in nav" :key="index" :name="item.name">
                    <template slot="title">
                        {{item.name}}
                    </template>
                    <MenuItem v-for="(secitem,index) in item.secNav" :key="index" :name="secitem.url">{{secitem.name}}</MenuItem>
                </Submenu>
               
            </Menu>
        </Col>
       <col span="18" id="right">
       </col>
    </Row>
    <br>
  </div>
</template>

<script type="text/ecmascript-6">
import componentTest from './componentTest'
export default {
    data () {
        return {
            nav: [
                {
                    name: '弹性云主机',
                    default: '产品描述',
                    secNav: [
                        {
                            name: '产品描述',
                            url: 'computed/1-1'
                        }
                    ]
                },
                {
                    name: '快速入门',
                    secNav: [
                        {
                            name: '概述',
                            url: 'ruicloud/computed/2-1'
                        },
                        {
                            name: '注册及登陆',
                            url: 'ruicloud/computed/3-1'
                        },
                        {
                            name: '新建主机',
                            url: 'ruicloud/computed/4-1'
                        },
                        {
                            name: '连接主机',
                            url: 'ruicloud/computed/5-1'
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        push (name) {
            this.$router.push(name)
        }
    },
    computed: {
    //   activeName: function () {
    //     var that = this;
    //     return that.$router.name;
    //   }
    },
    components: {
        componentTest
    }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
#documentInfo {
  width: 1200px;
  margin: 0px auto;
}
</style>
