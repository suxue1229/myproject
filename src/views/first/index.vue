<template>
  <div class="content">
    <Header />
        <div class="containter containter-style">
          <div class="row">
              <div class='col-md-2 '>
                  <h2 >项目概述</h2>
                  <p class=" text-style">为了保护洱海流域敏感的水环境，大理州洱源县政府与北京碧水源科技股份有限公司签订了《洱源县乡镇及村落污水处理工程PPP合作协议》，对辖区内的分散污染源进行综合治理。本项目新建镇级污水处理厂6座，村落污水处理站53座，总设计处理规模2.392万吨/天；新建管网851.22km和提升泵站21座。总投资22.29亿元，分两期建设。</p>
              </div>
              <div class='col-md-10'>
                  <h3>
                    目前在线站点数目 {{this.datalist.length}} 个
                  </h3>
                  <div  id="center-map" ></div>
              </div>
          </div>
      </div>
    <Footer />
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
  created(){
    this.initdata()
  },
  methods: {
    async initdata () {
      let Data = await this.$store.dispatch('get_institute')
      this.datalist = this.$store.getters.institute_Data
      var map = new BMap.Map('center-map')
      var point = new BMap.Point(116.404, 39.915)
      map.centerAndZoom(point, 6)
      map.enableScrollWheelZoom(true)
      map.enableAutoResize()
      var pt = ''
      for (var i = 0; i < this.datalist.length; i++) {
        pt = new BMap.Point(this.datalist[i].Longitude, this.datalist[i].Latitude)
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
}
</script>
<style scoped>
.content{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.containter-style{
  flex-grow: 1;
  color: #9ee1fb;
  padding-left: 15px;
  padding-right: 15px;
  background: rgba(16,46,86,.5);
  display: flex;
  flex-direction: column;
}

.text-style{
  margin-top: 1rem;
  text-indent: 2rem;
  line-height: 2rem;
}
 #center-map{
  min-height: 500px;
  }
</style>
