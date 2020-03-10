<template>
  <div class="content">
    <Header />
        <div class="containter containter-style">
          <div class="row row-style">
              <div class='col-md-2 row-left'>
                <b-card
                 border-variant="success"
                  header="项目概述"
                  header-text-variant="#212529"
                  header-tag="header"
                  header-bg-variant="success"
                  align="center"
                  style="max-width: 15rem;"
                  class="mb-2"
                >
                <b-card-text>
                   <p >为了保护洱海流域敏感的水环境，大理州洱源县政府与北京碧水源科技股份有限公司签订了《洱源县乡镇及村落污水处理工程PPP合作协议》，对辖区内的分散污染源进行综合治理。本项目新建镇级污水处理厂6座，村落污水处理站53座，总设计处理规模2.392万吨/天；新建管网851.22km和提升泵站21座。总投资22.29亿元，分两期建设。</p></b-card-text>
                </b-card>
              </div>
              <div class='col-md-8 row-right-map'>
                  <h3>
                    目前在线站点数目 {{this.datalist.length}} 个
                  </h3>
                  <div  id="center-map" ></div>
              </div>
              <div class='col-md-2 row-right'>
                <b-card
                border-variant="success"
                  header="厂站列表"
                  header-text-variant="#212529"
                  header-tag="header"
                  header-bg-variant="success"
                  align="center"
                  style="max-width: 15rem;"
                  class="mb-2"
                >
                  <b-card-text>
                    <ul class="row-right-list">
                      <li v-for="(item, i) in datalist" :key="i" @click="getlocation(item)"><a href="#">{{item.Name}}</a></li>
                    </ul>
                  </b-card-text>
                </b-card>
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
export default {
  name: 'firstchild',
  data () {
    return {
      datalist: [],
      map: null
    }
  },
  components: {
    Header, Footer
  },
  created () {
    this.initdata()
  },
  methods: {
    initdata () {
      this.$axios.get(this.HOST + '/institute')
        .then(res => {
          if (res.data.status === 0) {
            this.$store.dispatch('get_institute', res.data.data)
            this.datalist = this.$store.getters.institute_Data
            this.map = new BMap.Map('center-map')
            var point = new BMap.Point(116.404, 39.915)
            this.map.centerAndZoom(point, 10)
            this.map.enableScrollWheelZoom(true)
            this.map.enableAutoResize()
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
              this.map.addOverlay(marker)
              var label = new BMap.Label(this.datalist[i].Name, {offset: new BMap.Size(20, -10)})
              label.setStyle({
                color: 'rgba(16,46,86)',
                fontSize: '12px',
                height: '20px',
                lineHeight: '20px'
              })
              marker.setLabel(label)// 添加百度label
              this.map.setCenter(pt)
            }
          }
        })
        .catch(error => { console.log(error) })
    },
    getlocation (item) {
      var point = new BMap.Point(item.Longitude, item.Latitude)
      this.map.centerAndZoom(point, 18)
    }
  }
}
</script>
<style scoped>
.content{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.containter-style{
  flex: 1;
  color: #606266;
  padding-left: 15px;
  padding-right: 15px;
  background: #f2f6fc;
  display: flex;
}
.row-style{
  flex: 1;
  margin-top: 10px;
}
.row-left{
 display: flex;
 flex-direction: column;
}
h3{
  color:#909399;
}
.row-left p{
  flex: 1;
  margin-top: 1rem;
  text-indent: 2rem;
  line-height: 2rem;
}
.row-right-map{
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 600px;
  max-height: 1600px;
}
#center-map{
  margin-top: 10px;
  flex: 1;
}
.row-right{
  display: flex;
  flex-direction: column;
}
.row-right-list-title{
  display: flex;
  flex-wrap: nowrap;
}
.row-right-list-title i{
  font-size:30px;
  line-height: 2.5rem;
}
.row-right-list{
  margin-top: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 0px;
  max-height: 600px;
  overflow: auto;
  font-size: 15px;
}
.row-right-list a{
  color: #606266;
  text-decoration: none;
}
.row-right-list a:hover{
  color: rgb(48, 65, 86);
  background-color: #606266;
}
</style>
