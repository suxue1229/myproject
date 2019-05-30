<template>
  <div>
    <div id='content' >
       <div class='content-left'>
      <div class='content-left-title'>
        <h2>项目概述</h2>
        <p>为了保护洱海流域敏感的水环境，大理州洱源县政府与北京碧水源科技股份有限公司签订了《洱源县乡镇及村落污水处理工程PPP合作协议》，对辖区内的分散污染源进行综合治理。本项目新建镇级污水处理厂6座，村落污水处理站53座，总设计处理规模2.392万吨/天；新建管网851.22km和提升泵站21座。总投资22.29亿元，分两期建设。</p>
      </div>
      <div class='content-left-center'>
        <div class="content-left-center-title">
          <h3 class="content">
            <b>镇级污水处理厂：6个</b>
            <b>村居污水处理站：53个</b>
            <b>总处理规模：2.392万吨/日</b>
          </h3>
          <div class="title">一期二期项目介绍</div>  
        </div>
        <div id='content-left-center-map'></div>
    </div>
    <div class='content-right'>
      <h2>厂站列表</h2>
      <div class='content-right-list'>
        <ul>
          <li>茈碧湖镇(2+4)</li>
          <li>右所镇(1+17)</li>
          <li>凤羽镇(1+11)</li>
          <li>牛街乡(1+7)</li>
          <li>三营镇(1+14)</li>
          <li>邓川镇(0+4)</li>
          <li>海东镇(0+1)</li>
        </ul>
      </div>
    </div>
  </div>
    </div>
  </div>
</template>
<script>
import BMap from 'BMap'
export default {
  name: 'firstchild',
  data () {
    return {
      datalist: [],
      pointlist: []
    }
  },
  mounted () {
    this.datalist = JSON.parse(this.$store.state.data)
    var map = new BMap.Map('content-left-center-map')
    var point = new BMap.Point(116.404, 39.915)
    map.centerAndZoom(point, 15)
    map.enableScrollWheelZoom(true)
    map.enableAutoResize()
    var pt = ''
    for (var i = 0; i < this.datalist.length; i++) {
      var pt = new BMap.Point(this.datalist[i].Longitude, this.datalist[i].Latitude)
      var convertor = new BMap.Convertor()
      var pointArr = []
      pointArr.push(pt)
      convertor.translate(pointArr, 1, 5, (data) => {
        if (data.status === 0) {
          pt = data.points[0]
          return pt
        }
      })
    var marker = new BMap.Marker(pt)
    map.addOverlay(marker)
    var label = new BMap.Label(this.datalist[i].Name, {offset: new BMap.Size(20, -10)})
    marker.setLabel(label)// 添加百度label
    map.setCenter(pt)
    }
  }
}
</script>
<style scoped>
  #content{
    position: absolute;
    top: 60px;
    left: 0;
    right:0px;
    bottom: 50px;
    overflow: auto;
    width: 100%;
    display: flex;
    color: #9ee1fb;
  }
  #content .content-left{
    flex-grow: 1;
    display: flex;
    width: 90%;
  }
  #content .content-left .content-left-title{
    width: 15%;
    padding: 1%;
  }
  #content .content-left .content-left-title p{
    text-indent: 2rem;
    line-height: 2rem;
  }
  #content .content-left .content-left-center{
    width: 85%;
    flex-grow: 1;
    display: flex;
    flex-flow: column;
  }
  #content .content-left .content-left-center .content-left-center-title{
    height: 10%;
    display: flex;
    align-items: center;
  }
  #content .content-left .content-left-center .content-left-center-title .content{
    width: 90%;
    flex: 1;
  }
  #content .content-left .content-left-center .content-left-center-title .title{
    width: 10%;
    border: 3px solid #9ee1fb;
  }
  #content .content-left .content-left-center #content-left-center-map{
    flex: 1;
    height: 90%;
  }
  #content .content-right{
    width: 10%;
    padding: 1%;
  }
  #content .content-right h2 {
    text-align: center;
  }
  #content .content-right ul {
    margin-top: 5%;
    list-style-type: none;
    text-align: center;
  }
   #content .content-right ul li {
    padding:5%;
  }
</style>
