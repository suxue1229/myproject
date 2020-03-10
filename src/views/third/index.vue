<template>
  <div class="content">
    <Header />
      <div class="containter containter-style">
        <div class="row">
            <el-date-picker
            v-model="dateVals"
            class="date-picker"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            unlink-panels
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
          <template >
            <el-select v-model="value" placeholder="请选择" class="select">
              <el-option
                v-for="(item, i) in showdata"
                :key="i"
                :label="item.Name"
                :value="item.Name">
              </el-option>
            </el-select>
          </template>
          <el-button class="button" type="primary" onclick="print()">生成报表</el-button>
        </div>
        <div class="animated bounceInRight " >
          <template>
            <section id="print">
              <el-table
                :data="showdata"
                :row-style="tableRowStyle"
                :header-cell-style="tableHeaderColor"
                style="width: 100%; min-height:100%; background-color: transparent;"
                >
                <el-table-column
                  fixed
                  prop="Name"
                  label="厂站名称"
                  min-width="20%"
                  >
                </el-table-column>
                <el-table-column
                  prop="Device[0]"
                  label="产水泵"
                  min-width="10%">
                </el-table-column>
                <el-table-column
                  prop="Device[1]"
                  label="风机"
                  min-width="10%">
                </el-table-column>
                <el-table-column
                  prop="Device[2]"
                  label="回流泵"
                  min-width="10%">
                </el-table-column>
                <el-table-column
                  prop="Device[3]"
                  label="除磷泵"
                  min-width="10%">
                </el-table-column>
                <el-table-column
                  prop="Device[4]"
                  label="产水流量(m3/h)"
                  min-width="10%">
                </el-table-column>
                <el-table-column
                  prop="Device[5]"
                  label="MBR压力(kpa)"
                  min-width="10%">
                </el-table-column>
                <el-table-column
                  prop="Device[6]"
                  label="累计电量(kwh)"
                  min-width="10%">
                </el-table-column>
                <el-table-column
                  prop="Device[7]"
                  label="累计水量(m3)"
                  min-width="10%">
                </el-table-column>
              </el-table>
            </section>
          </template>
        </div>
      </div>
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import printJS from 'print-js'

export default {
  name: 'thirdchild',
  data () {
    return {
      dateVals: '',
      showdata: [],
      value: ''
    }
  },
  created () {
    this.initdata()
  },
  mounted () {
    this.intervalid = setInterval(() => {
      this.initdata()
    }, 100000)
  },
  beforeDestroy () {
    clearInterval(this.intervalid)
  },
  methods: {
    print () {
      printJS({printable: 'print', type: 'html', scanStyles: false, css: ['https://qiniu.smartpilot.cn/myreport.css'], style: ''})
    },
    deletesign (str) {
      if (typeof (str) === 'string') {
        if (str.includes('{red}')) {
          return str.replace('{red}', '')
        } else if (str.includes('{green}')) {
          return str.replace('{green}', '')
        }
      } else if (typeof (str) === 'undefined') {
        return ''
      }
      return str
    },
    async initdata () {
      this.showdata = []
      var instituteData = await this.$store.getters.institute_Data
      for (var i = 0; i < instituteData.length; i++) {
        this.$axios.get(this.HOST + '/data/' + instituteData[i].Id)
          .then(res => {
            if (res.data.status === 0) {
              this.$store.dispatch('get_data', res.data.data)
              let infodata = this.$store.getters.info_Data
              this.formatedata(infodata)
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
          let item = this.deletesign(datalist.Groups[i].Devices[j].Status)
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
          let item = this.deletesign(datalist.Groups[i].Sensors[k].Value)
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
        this.showdata.push({Name: datalist.Name, Device: Devicelist})
      }
    },
    // 修改table tr行的背景色
    tableRowStyle ({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'background-color: #f2f6fc; color: #606266; height:3px;'
      } else {
        return 'background-color: transparent; color: #606266; height:3px;'
      }
    },
    // 修改table header的背景色
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #f2f6fc; color: #606266; height: 5px;'
      }
    }
  },
  components: {
    Header, Footer
  }
}
</script>
<style scoped>
.containter-style{
  color: #606266;
  padding-left: 15px;
  padding-right: 15px;
  background: #f2f6fc;
  display: flex;
  flex-direction: column;
}
.row {
  margin: 20px;
  display: flex;
}
.select {
  margin-left: 20%;
  width: 300px;
}
.button{
  margin-left: 50px;
  width:200px;
}
</style>
