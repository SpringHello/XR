<template>
  <div id="content" style="height: 700px">
    <div style="width:100%;height:100%;border:0px solid gray" id="container"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    metaInfo: {
      title: '域名备案查询 - 域名备案流程 - 网站域名备案 - 域名与备案 - 新睿云', // set a title
      meta: [{                 // set meta
        name: 'robots',
        content: 'noindex,nofollow'
      }]
    },
    data() {
      return {}
    },
    mounted() {
      //创建Map实例
      var map = new BMap.Map("container");
      var point = new BMap.Point(116.340315, 39.999888);
      map.centerAndZoom(point, 17);
      //添加鼠标滚动缩放
      map.enableScrollWheelZoom();

      //添加缩略图控件
      map.addControl(new BMap.OverviewMapControl({isOpen: false, anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));
      //添加缩放平移控件
      map.addControl(new BMap.NavigationControl());
      //添加比例尺控件
      map.addControl(new BMap.ScaleControl());
      //添加地图类型控件
      //map.addControl(new BMap.MapTypeControl());

      //设置标注的图标
      //var icon = new BMap.Icon("img/icon.jpg",new BMap.Size(100,100));
      //设置标注的经纬度
      var marker = new BMap.Marker(new BMap.Point(116.340315, 39.999888));
      //把标注添加到地图上
      map.addOverlay(marker);
      var content = "<table>";
      content = content + "<tr><td> 地点：北京市海淀区中关村东路8号东升大厦AB座611,612</td></tr>";
      content = content + "<tr><td> 电话：010-82527988</td></tr>";
      content += "</table>";
      var infowindow = new BMap.InfoWindow(content);
      marker.openInfoWindow(infowindow);
      marker.addEventListener("click", function () {
        this.openInfoWindow(infowindow);
      });
      //点击地图，获取经纬度坐标
      map.addEventListener("click", function (e) {
        //document.getElementById("aa").innerHTML = "经度坐标：" + e.point.lng + " &nbsp;纬度坐标：" + e.point.lat;
      });
    }
  }

</script>

<style scoped>

</style>
