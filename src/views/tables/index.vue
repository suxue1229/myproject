<template>
  <div class="content">
    <Header />
      <div class="container-fluid container-style">
        <h2 >CWT工艺站点列表</h2>
        <loading v-if= "isshowing"/>
        <div v-else class="animated bounceInRight easytable" >
          <v-table
            :is-vertical-resize= 'true'
            :width= '1295'
            :height= '460'
            :min-width= '800'
            :vertical-resize-offset= '60'
            is-horizontal-resize
            :min-height= '400'
            style="width:100%"
            :columns="columns"
            :table-data="tableData"
            even-bg-color="#f4f4f4"
             row-hover-color="#1F2D3D"
             row-click-color="#edf7ff"
             @sort-change="sortChange"
             :paging-index="(pageIndex-1)*pageSize" >
          </v-table>
          <div class="mt20 mb20 bold">
            <v-pagination  @page-change="pageChange" @page-size-change="pageSizeChange" :total="showdata.length" :page-size="pageSize" :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"></v-pagination>
          </div>
        </div>
      </div>
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {deletesign} from '@/js/common.js'
export default {
  name: 'table',
  data () {
    return {
      multipleSort: false,
      pageIndex: 1,
      pageSize: 10,
      infodata: '',
      isshowing: true,
      showdata: [],
      tableData: [],
      timer: { },
      columns: [
        {
          field: 'custome',
          title: '排序',
          width: 50,
          titleAlign: 'center',
          columnAlign: 'center',
          formatter (rowData, index, pagingIndex) {
            var currentIndex = index + pagingIndex
            return currentIndex < 3 ? (currentIndex + 1) : currentIndex + 1
          }},
        {field: 'name', title: '厂站名称', width: 200, titleAlign: 'center', columnAlign: 'left', isResize: true},
        {field: 'chansb', title: '产水泵', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'fengj', title: '风机', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'huilb', title: '回流泵', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'chulb', title: '除磷泵', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'chansll', title: '产水流量(m3/h)', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'mbr', title: 'MBR压力(kpa)', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'leijdl', title: '累计电量(kwh)', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true},
        {field: 'leijsl', title: '累计水量(m3)', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true}
      ]
    }
  },
  created () {
    this.initdata()
  },
  computed: {
    instituteData () {
      return this.$store.getters.institute_Data
    },
    allData () {
      return this.$store.getters.all_Data
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  methods: {
    initdata () {
      clearTimeout(this.timer)
      this.$store.commit('ALL_DATA')
      for (let i = 0; i < this.instituteData.length; i++) {
        this.$axios.get(this.HOST + '/data/' + this.instituteData[i].Id)
          .then(res => {
            if (res.data.status === 0) {
              this.$store.dispatch('get_data', res.data).then(
                () => {
                  this.infodata = this.$store.getters.info_Data.data
                  let arrtemp = this.formatedata(this.infodata)
                  let obj = {
                    'name': this.infodata.Name,
                    'chansb': arrtemp[0],
                    'fengj': arrtemp[1],
                    'huilb': arrtemp[2],
                    'chulb': arrtemp[3],
                    'chansll': arrtemp[4],
                    'mbr': arrtemp[5],
                    'leijdl': arrtemp[6],
                    'leijsl': arrtemp[7] }
                  this.showdata.push(obj)
                  // this.$set(this.showdata, i, obj) //easytable出现 field 没定义的错误
                  this.getTableData()
                  this.isshowing = false
                }
              )
            }
          })
          .catch(error => { console.log(error) })
      }
      this.timer = setTimeout(() => {
        if (this.showdata) {
          this.showdata = []
        }
        this.initdata()
      }, 60000)
    },
    formatedata (datalist) {
      var Devicelist = []
      for (var i = 0; i < datalist.Groups.length; i++) {
        for (var j = 0; j < datalist.Groups[i].Devices.length; j++) {
          let itemname = datalist.Groups[i].Devices[j].Name
          let item = deletesign(datalist.Groups[i].Devices[j].Status)
          if (itemname === '自吸泵') {
            this.$set(Devicelist, 0, item)
          } else if (itemname === '风机') {
            this.$set(Devicelist, 1, item)
          } else if (itemname === '回流泵') {
            this.$set(Devicelist, 2, item)
          } else if (itemname === '除磷泵') {
            this.$set(Devicelist, 3, item)
          }
        }
        for (var k = 0; k < datalist.Groups[i].Sensors.length; k++) {
          let itemname = datalist.Groups[i].Sensors[k].Name
          let item = deletesign(datalist.Groups[i].Sensors[k].Value)
          if (itemname === '瞬时流量') {
            this.$set(Devicelist, 4, item)
          } else if (itemname === '压力') {
            this.$set(Devicelist, 5, item)
          } else if (itemname === '累计电量' || itemname === '电能') {
            this.$set(Devicelist, 6, item)
          } else if (itemname === '累计产水量' || itemname === '累计流量') {
            this.$set(Devicelist, 7, item)
          }
        }
      }
      return Devicelist
    },
    getTableData () {
      this.tableData = this.showdata.slice((this.pageIndex - 1) * this.pageSize, (this.pageIndex) * this.pageSize)
    },
    pageChange (pageIndex) {
      this.pageIndex = pageIndex
      this.getTableData()
    },
    pageSizeChange (pageSize) {
      this.pageIndex = 1
      this.pageSize = pageSize
      this.getTableData()
    },
    sortChange (params) {
      if (params.height.length > 0) {
        this.tableData.sort(function (a, b) {
          if (params.height === 'asc') {
            return a.height - b.height
          } else if (params.height === 'desc') {
            return b.height - a.height
          } else {
            return 0
          }
        })
      }
    }
  },
  components: {
    Header, Footer
  }
}
</script>
<style scoped>
.content {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.container-style {
  width: 100%;
  position: absolute;
  top: 85px;
  bottom: 50px;
  color: #606266;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.container-style h2{
  margin:0 auto;
  padding: 20px;
}
.containter-style .easytable{
  margin: auto;
}
</style>
