<template>
  <div>
    <h2>Q：虚拟私有云中可以使用哪些网段（CIDR）？</h2>
    <p>A：当前VPC支持的网段有：10.0.0.0/8~24、172.16.0.0/12~24、192.168.0.0/16~24</p>

    <h2>Q：一个用户下最多创建多少个VPC？</h2>
    <p>A：默认情况一个用户支持创建1个VPC。</p>

    <h2>Q：子网可以使用的网段是什么？</h2>
    <p>A：子网的网段要在VPC的网段内部，VPC提供三段私网网段，10.0.0.0/8~24、172.16.0.0/12~24和192.168.0.0/16~24，所以子网的网段也会在这些范围内。</p>

    <h2>Q：子网的限额是多少？</h2>
    <p>A：一个用户可以创建100个子网。</p>

    <h2>Q：1个ACL最多可设置多少条规则？</h2>
    <p>A：1个ACL最多可设置10条规则。</p>

    <h2>Q：1个ACL可以绑定多少个子网？</h2>
    <p>A：1个ACL可以与多个子网绑定，但每个子网只能绑定1个ACL。</p>

    <h2>Q：1个VPC最多可创建多少个ACL？</h2>
    <p>A：每个VPC最多可创建10个ACL（含3个默认ACL）。</p>

    <h2>Q：带宽的限速范围是多少？</h2>
    <p>A：带宽的限速范围为1Mbps~300Mbps</p>

    <h2>Q：一个弹性IP可以给几个弹性云主机使用？</h2>
    <p>A：一个弹性IP只能给一个弹性云主机使用。</p>

    <h2>Q：1个VPC最多支持多少个公网IP？</h2>
    <p>A：1个VPC最多支持5个公网IP。</p>

    <h2>Q：1个VPC最多可以创建多个负载均衡网络？ </h2>
    <p>A：1个VPC只能创建1个负载均衡网络。</p>
  </div>
</template>
<style scoped>
  h2 {
    margin-top: 17px;
    margin-bottom: 8px;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
  }
</style>
<script>
  export default{
    data(){
      return {}
    },
    components: {}
  }
</script>
