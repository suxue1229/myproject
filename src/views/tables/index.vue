<template>
  <div class="content">
    <Header />
      <div class="container-fluid container-style">
        <div class="row">
            <el-date-picker
            v-model="dateVals"
            class="date-picker col-md-5"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            unlink-panels
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
          <template >
            <el-select v-model="value" placeholder="请选择" class="select col-md-3">
              <el-option
                v-for="(item, i) in showdata"
                :key="i"
                :label="item.Name"
                :value="item.Name">
              </el-option>
            </el-select>
          </template>
          <el-button class="button col-md-2" type="primary" onclick="print()">打印报表</el-button>
        </div>
        <div class=" container" >
          <template>
            <section id="print">
              <table class="table table-striped">
                  <thead>
                    <tr>
                      <td>日期</td>
                      <td>站点名称</td>
                      <td>设备名称</td>
                      <td>报警内容</td>
                      <td>状态</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in tabledata" :key="index" >
                      <td>{{item.Time}}</td>
                      <td>{{item.Name}}</td>
                      <td>{{item.Status.state.name}}</td>
                      <td>{{item.Status.state.value}}</td>
                      <td>{{item.Status.state.operation}}</td>
                    </tr>
                  </tbody>
              </table>
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
import {deletesign} from '@/js/common.js'

export default {
  name: 'thirdchild',
  data () {
    return {
      dateVals: '',
      value: '',
      showdata: [],
      datalist: {},
      tabledata: []
    }
  },
  created () {
    this.initdata()
  },
  watch: {
    tabledata (newval, oldval) {
      this.tabledata = newval
      console.log('created:' + JSON.stringify(this.tabledata))
    }
    // Event.$on('senddata', data => {
    //   this.showdata = data
    //   console.log('data:' + data)
    // })
    // this.intervalid = setInterval(() => {
    //   this.initdata()
    // }, 100000)
  },
  destroyed () {
    clearInterval(this.intervalid)
  },
  methods: {
    print () {
      printJS({printable: 'print', type: 'html', scanStyles: false, css: ['https://qiniu.smartpilot.cn/myreport.css'], style: ''})
    },
    initdata () {
      var instituteData = this.$store.getters.institute_Data
      var index = 0
      for (var m = 0; m < instituteData.length; m++) {
        this.$axios.get(this.HOST + '/data/' + instituteData[m].Id)
          .then(res => {
            if (res.data.status === 0) {
              this.$store.dispatch('get_data', res.data.data)
              this.datalist = this.$store.getters.info_Data
              for (let i = 0; i < this.datalist.Groups.length; i++) {
                let count = 0
                this.datalist.Groups[i].Devices.some(obj => {
                  if (deletesign(obj.Status) === '故障') {
                    this.tabledata[index] = {'Time': '', 'Name': '', 'Status': {}}
                    this.tabledata[index].Time = res.data.time
                    this.tabledata[index].Name = this.datalist.Name
                    this.tabledata[index].Status = {'count': count, 'state': {'value': '', 'name': '', 'operation': '报警中'}}
                    this.tabledata[index].Status.count = count
                    this.tabledata[index].Status.state.value = deletesign(obj.Status)
                    this.tabledata[index].Status.state.name = obj.Name
                    count++
                    index++
                  }
                })
              }
            }
          })
          .catch(error => { console.log(error) })
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
.row {
  padding: 20px;
}

</style>
