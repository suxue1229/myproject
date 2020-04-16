<template>
  <div class="content">
    <Header />
      <div class="container-fluid container-style">
        <h2 >CWT工艺站点列表</h2>
        <div class="animated bounceInRight easytable" >
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
  name: 'secondchild',
  data () {
    return {
      multipleSort: false,
      pageIndex: 1,
      pageSize: 10,
      infodata: {},
      tableData: [],
      showdata: null,
      columns: [
        {field: 'custome', title: '排序', width: 50, titleAlign: 'center', columnAlign: 'cneter', formatter: function (rowData, index, pagingIndex) {
          var currentIndex = index + pagingIndex;
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
    this.getTableData()
  },
  mounted () {
    // Event.$emit('senddata', this.tableData)
    this.intervalid = setInterval(() => {
      this.initdata()
    }, 100000)
  },
  beforeDestroy () {
    clearInterval(this.intervalid)
  },
  methods: {
    async initdata () {
      this.showdata = []
      var instituteData = await this.$store.getters.institute_Data
      for (var i = 0; i < instituteData.length; i++) {
        this.$axios.get(this.HOST + '/data/' + instituteData[i].Id)
          .then(res => {
            if (res.data.status === 0) {
              this.$store.dispatch('get_data', res.data.data)
              this.infodata = this.$store.getters.info_Data
              this.formatedata(this.infodata)
            }
          })
          .catch(error => { console.log(error) })
      }
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
        this.showdata.push({'name': datalist.Name, 'chansb': Devicelist[0], 'fengj': Devicelist[1], 'huilb': Devicelist[2],
          'chulb': Devicelist[3], 'chansll': Devicelist[4], 'mbr': Devicelist[5], 'leijdl': Devicelist[6], 'leijsl': Devicelist[7] })
        this.tableData = this.showdata.slice((this.pageIndex - 1) * this.pageSize, (this.pageIndex) * this.pageSize)
      }
    },
    getTableData () {
      this.tableData = this.showdata.slice((this.pageIndex - 1) * this.pageSize, (this.pageIndex) * this.pageSize)
    },
    pageChange (pageIndex) {
      this.pageIndex = pageIndex
      this.getTableData()
      console.log(pageIndex)
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
