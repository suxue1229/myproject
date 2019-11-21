<template>
  <div>
    <Header/>
      <div id='content' >
        <div class='content-left'>
            <h2>项目概述</h2>
            <p>为了保护洱海流域敏感的水环境，大理州洱源县政府与北京碧水源科技股份有限公司签订了《洱源县乡镇及村落污水处理工程PPP合作协议》，对辖区内的分散污染源进行综合治理。本项目新建镇级污水处理厂6座，村落污水处理站53座，总设计处理规模2.392万吨/天；新建管网851.22km和提升泵站21座。总投资22.29亿元，分两期建设。</p>
        </div>
        <div class='content-center'>
            <div class="content-center-title">
              <h3 class="content">
                <b>镇级污水处理厂：6个</b>
                <b>村居污水处理站：53个</b>
                <b>总处理规模：2.392万吨/日</b>
              </h3>
              <div class="title">一期二期项目介绍</div>  
            </div>
            <div id='content-center-map'></div>
        </div>
        <div class='content-right'>
          <h2>厂站列表</h2>
          <ul class='content-right-list'>
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
    <Footer class="footer navbar  navbar-fixed-bottom" />
  </div>
</template>
<script>
import BMap from 'BMap'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
 import {
    mapGetters,
    mapMutations
  } from 'vuex';
export default {
  name: 'firstchild',
  data () {
    return {
      datalist: [],
      pointlist: []
    }
  },
  components: {
    Header, Footer
  },
  computed: {
    institute () {
    return this.$store.getters.institute_Data
    }
  },
  methods: {
    async initdata () {
      let Data = await this.$store.dispatch('get_institute')
      this.datalist = this.institute
      var map = new BMap.Map('content-center-map')
      var point = new BMap.Point(116.404, 39.915)
      map.centerAndZoom(point, 15)
      map.enableScrollWheelZoom(true)
      map.enableAutoResize()
      var pt = ''
      var IdArray=[]
      for (var i = 0; i < this.datalist.length; i++) {
        pt = new BMap.Point(this.datalist[i].Longitude, this.datalist[i].Latitude)
        IdArray.push(this.datalist[i].Id)
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
  },
  created () {
    this.initdata()
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
    width: 15%;
    display: flex;
    flex-flow: column;
  }
  #content .content-left h2{
    text-align: center;
    align-items: center;
    background: rgba(16,46,86,.5);
  }
  #content .content-left p{
    margin-top: 1rem;
    flex-grow: 1;
    text-indent: 2rem;
    line-height: 2rem;
    background: rgba(16,46,86,.5);
  }
  #content .content-center{
    margin-left: 1rem;
    margin-right: 1rem;
    flex-grow: 1;
    display: flex;
    flex-flow: column;
  }
  #content .content-center .content-center-title{
    height: 10%;
    display: flex;
    align-items: center;
    background: rgba(16,46,86,.5);
  }
  #content .content-center .content-center-title .content{
    flex-grow: 1;
  }
  #content .content-center .content-center-title .title{
    width: 10%;
    border: 3px solid #9ee1fb;
  }
  #content .content-center #content-center-map{
    flex-grow: 1;
    height: 90%;
  }
  #content .content-right{
    width: 15%;
    display: flex;
    flex-flow: column;
  }
  #content .content-right h2 {
    text-align: center;
    align-items: center;
    background: rgba(16,46,86,.5);
  }
  #content .content-right .content-right-list {
    margin-top: 1rem;
    flex-grow: 1;
    list-style-type: none;
    text-align: center;
    background: rgba(16,46,86,.5);
  }
  #content .content-right ul li {
    line-height: 2rem;
  }
</style>
