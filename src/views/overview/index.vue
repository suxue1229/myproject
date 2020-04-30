<template>
  <div class="content">
    <Header />
    <div class="container-fluid" >
      <div class="row row-style">
        <div class="col-md-2 row-left">
          <b-card
            border-variant="success"
            header="项目概述"
            header-text-variant="#212529"
            header-tag="header"
            header-bg-variant="success"
            align="center"
            style="max-width: 15rem; min-width: 10rem;"
            class="mb-2"
          >
            <b-card-text>
              <p>为了保护洱海流域敏感的水环境，大理州洱源县政府与北京碧水源科技股份有限公司签订了《洱源县乡镇及村落污水处理工程PPP合作协议》，对辖区内的分散污染源进行综合治理。本项目新建镇级污水处理厂6座，村落污水处理站53座，总设计处理规模2.392万吨/天；新建管网851.22km和提升泵站21座。总投资22.29亿元，分两期建设。</p>
            </b-card-text>
          </b-card>
        </div>
        <div class="col-md-8 row-map">
          <h3>目前在线站点数目 {{this.datalist.length}} 个</h3>
          <div id="map"></div>
        </div>
        <div class="col-md-2 row-right">
          <b-card
            border-variant="success"
            header="厂站列表"
            header-text-variant="#212529"
            header-tag="header"
            header-bg-variant="success"
            align="center"
            style="max-width: 15rem; min-width: 10rem;"
            class="mb-2"
          >
            <b-card-text>
              <ul class="row-right-list">
                <li v-for="(item, i) in datalist" :key="i" @click="getinfo(item)" >{{item.Name}}</li>
              </ul>
            </b-card-text>
          </b-card>
        </div>
      </div>
    </div>
    <router-view class="animated bounceInLeft"></router-view>
    <Footer />
  </div>
</template>
<script>
import BMap from 'BMap'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'overview',
  data () {
    return {
      map: null
    }
  },
  components: {
    Header,
    Footer
  },
  created () {
    this.initdata()
  },
  computed: {
    datalist () {
      return this.$store.getters.institute_Data
    }
  },
  methods: {
    initdata () {
      this.$axios.get(this.HOST + '/institute')
        .then(res => {
          if (res.data.status === 0) {
            this.$store.dispatch('get_institute', res.data.data)
            this.map = new BMap.Map('map')
            var point = new BMap.Point(116.404, 39.915)
            this.map.centerAndZoom(point, 10)
            this.map.enableScrollWheelZoom(true)
            this.map.enableAutoResize()
            var pt = ''
            for (var i = 0; i < this.datalist.length; i++) {
              pt = new BMap.Point(
                this.datalist[i].Longitude,
                this.datalist[i].Latitude
              )
              this.geocodeSearch(pt, i)
              var convertor = new BMap.Convertor()
              var pointArr = []
              pointArr.push(pt)
              convertor.translate(pointArr, 1, 5, data => {
                if (data.status === 0) {
                  pt = data.points[0]
                  return pt
                }
              })
              var marker = new BMap.Marker(pt)
              this.map.addOverlay(marker)
              var label = new BMap.Label(this.datalist[i].Name, {
                offset: new BMap.Size(20, -10)
              })
              label.setStyle({
                color: 'rgba(16,46,86)',
                fontSize: '12px',
                height: '20px',
                lineHeight: '20px'
              })
              marker.setLabel(label) // 添加label
              this.map.setCenter(pt)
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getinfo (item) {
      this.$router.push({ name: 'monitor',
        query: {
          id: item.Id
        }})
    },
    geocodeSearch (pt, index) {
      let geoc = new BMap.Geocoder()
      let addComp = ''
      geoc.getLocation(pt, rs => {
        addComp = rs.addressComponents
        this.datalist[index].province = addComp.province
      })
    }
  }
}
</script>
<style scoped>
.content {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.row-style {
  width: 100%;
  position: absolute;
  top: 85px;
  bottom: 50px;
  color: #606266;
  overflow: hidden;
  padding-top: 5px;
  padding-bottom: 5px;
}
.row-left {
  height: 100%;
}
.mb-2{
  height: 100%;
}
.card-body {
  padding: 5px;
  overflow: auto;
}
.row-left p {
  padding: 5px;
  text-indent: 2rem;
  line-height: 2rem;
}
.row-map {
  overflow: hidden;
  padding: 0px;
  padding-top: 10px;
}
#map {
  height: 100%;
}
.row-right {
  height: 100%;
}
.row-right-list {
  padding: 5px;
  list-style-type: none;
  font-size: 13px;
}
.row-right-list li {
  text-decoration: none;
  transition: all 0.5s;
  line-height: 2;
}
.row-right-list li:hover {
  color: #28A745;
}
</style>
