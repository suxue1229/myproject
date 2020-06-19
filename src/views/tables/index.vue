<template>
  <div class="main">
    <h2 >CWT工艺站点列表</h2>
    <loading v-if= "isshowing"/>
    <div v-else class="animated bounceInRight" >
       <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="厂站名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="chansb"
          label="产水泵"
          width="100">
        </el-table-column>
        <el-table-column
          prop="fengj"
          label="风机"
          width="100">
        </el-table-column>
        <el-table-column
          prop="huilb"
          label="回流泵"
          width="100">
        </el-table-column>
        <el-table-column
          prop="chulb"
          label="除磷泵"
          width="100">
        </el-table-column>
        <el-table-column
          prop="chansll"
          label="产水流量(m3/h)"
          >
        </el-table-column>
        <el-table-column
          prop="mbr"
          label="MBR压力(kpa)"
          >
        </el-table-column>
        <el-table-column
          prop="leijdl"
          label="累计电量(kwh)"
          >
        </el-table-column>
        <el-table-column
          prop="leijsl"
          label="累计水量(m3)"
          >
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="pageChange"
          @current-change="pageSizeChange"
          :current-page="(pageIndex-1)*pageSize"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="showdata.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
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
      timer: { }
    }
  },
  created () {
    this.initdata()
      .then(() => {
        this.getTableData()
        this.isshowing = false
      })
      .catch(error => {
        console.log(error)
      })
  },
  computed: {
    instituteData () {
      return this.$store.getters.institute_Data
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  methods: {
    async initdata () {
      clearTimeout(this.timer)
      this.$store.commit('ALL_DATA')
      for (let i = 0; i < this.instituteData.length; i++) {
        await this.$store.dispatch('get_data', this.instituteData[i].Id)
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
        this.$set(this.showdata, i, obj)
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
  }
}
</script>
<style scoped>
.main{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.main h2{
  padding: 10px;
}
.easytable{
  width: 100%;
}
</style>
