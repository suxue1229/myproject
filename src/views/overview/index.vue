<template>
  <div class="main">
    <div class="row row-style">
      <div class="col-md-2 row-left">
        <b-card
          border-variant="success"
          header="项目概述"
          header-text-variant="#212529"
          header-tag="header"
          header-bg-variant="success"
          align="center"
          style="max-width: 15rem; min-width: 10rem; height:100%;"
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
            <el-tree
              :data="data"
              :props="defaultProps"
              accordion
              @node-click="handleNodeClick">
            </el-tree>
          </b-card-text>
        </b-card>
      </div>
    </div>
    <router-view class="animated bounceInLeft"></router-view>
  </div>
</template>
<script>
import BMap from 'BMap'
export default {
  name: 'overview',
  data () {
    return {
      map: null,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created () {
    this.initdata()
      .then(() => {
        /* 按照省份名称排序 */
        this.datalist.sort((a, b) => a.Province.localeCompare(b.Province, 'zh'))
        this.data = this.getdata
      })
      .catch(error => {
        console.log(error)
      })
  },
  computed: {
    datalist () {
      return this.$store.getters.institute_Data
    },
    addprovince () {
      /* 按省份划分数组 */
      const s = new Set() // 实例化对象
      this.datalist.forEach(item => s.add(item.Province)) // 添加值（Set可以去掉重复数据）
      let newData = Array.from({ length: s.size }, () => []) // 创建指定长度数组并添值
      this.datalist.forEach(item => {
        let index = [...s].indexOf(item.Province) // 找到指定下标
        newData[index].push(item) // 添加数据
      })
      return newData
    },
    getdata () {
      /* 树形结构数据形成 */
      let data = []
      for (let m = 0; m < this.addprovince.length; m++) {
        let temp = []
        for (let n = 0; n < this.addprovince[m].length; n++) {
          temp.push({'label': this.addprovince[m][n].Name, 'data': this.addprovince[m][n]})
        }
        data.push({'label': this.addprovince[m][0].Province, 'children': temp})
      }
      return data
    }
  },
  methods: {
    async initdata () {
      await this.$store.dispatch('get_institute')
      this.map = new BMap.Map('map')
      var point = new BMap.Point(116.404, 39.915)
      this.map.centerAndZoom(point, 10)
      this.map.enableScrollWheelZoom(true)
      this.map.enableAutoResize()
      // var pointArr = []
      for (var i = 0; i < this.datalist.length; i++) {
        let pt = new BMap.Point(this.datalist[i].Longitude, this.datalist[i].Latitude)
        let province = await this.geocodeSearch(pt)
        this.$set(this.datalist[i], 'Province', province)

        // var convertor = new BMap.Convertor()
        // pointArr.push(pt)
        // convertor.translate(pointArr, 1, 5, data => {
        //   if (data.status === 0) {
        //     pt = data.points[0]
        //     return pt
        //   }
        // })
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
    },
    handleNodeClick (data, node, self) {
      if (node.level !== 1) {
        this.$router.push({ name: 'monitor',
          query: {
            id: data.data.Id
          }})
      }
    },
    geocodeSearch (pt) {
      let geoc = new BMap.Geocoder()
      let addComp = ''
      return new Promise(function (resolve, reject) {
        geoc.getLocation(pt, rs => {
          addComp = rs.addressComponents.province
          resolve(addComp)
        })
      })
    }

  }
}
</script>
<style scoped>
.row-style {
  width: 100%;
  height:100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
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
