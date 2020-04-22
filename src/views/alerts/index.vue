<template>
  <div class="content">
    <Header />
      <div class="container container-style">
        <div class="row">
            <!-- <el-date-picker
            v-model="dateVals"
            class="date-picker col-md-5"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            unlink-panels
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker> -->
          <template >
            <el-select v-model="item" placeholder="请选择" class="select col-md-3" @change="handle(item)">
              <el-option
                v-for="(item, i) in instituteData"
                :item="item"
                :key="i"
                :label="item.Name"
                :value="item.Name">
              </el-option>
            </el-select>
          </template>
          <el-button class="button col-md-2" type="primary" onclick="print()">打印报表</el-button>
        </div>
        <div v-if= "tabledata.length >0">
          <template>
            <section id="print">
              <table class="table" id= '_table'>
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
  name: 'alerts',
  data () {
    return {
      dateVals: '',
      item: '',
      showdata: [],
      datalist: {},
      tabledata: [],
      isaction: true
    }
  },
  created () {
    this.initdata()
  },
  mounted () {
  },
  computed: {
    instituteData () {
      return this.$store.getters.institute_Data
    }
  },
  destroyed () {
    clearInterval(this.intervalid)
  },
  methods: {
    print () {
      printJS({printable: 'print', type: 'html', scanStyles: false, css: ['https://qiniu.smartpilot.cn/myreport.css'], style: ''})
    },
    initdata () {
      var index = 0
      for (var m = 0; m < this.instituteData.length; m++) {
        this.$axios.get(this.HOST + '/data/' + this.instituteData[m].Id)
          .then(res => {
            if (res.data.status === 0) {
              this.$store.dispatch('get_data', res.data.data)
              this.datalist = this.$store.getters.info_Data
              for (let i = 0; i < this.datalist.Groups.length; i++) {
                let count = 0
                this.datalist.Groups[i].Devices.some(obj => {
                  if (deletesign(obj.Status) === '故障') {
                    var tablearray = {'Time': res.data.time, 'Name': this.datalist.Name, 'Status': {}}
                    this.$set(this.tabledata, index, tablearray) // 最佳方式
                    // this.tabledata.push(tablearray) 也可以实现结构添加，但this.tabledata[index]=tablearray不可以 原因是vue检测不到这种更新
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
    handle (it) {
      let _table = document.getElementById('_table')
      var str = _table.getElementsByTagName('tr')// 取得行
      for (var i = 1; i < str.length; i++) {
        var td = str[i].children
        if (td[1].innerHTML === it) {
          str[i].style.display = '' // 隐藏
        } else {
          str[i].style.display = 'none' // 显现
        }
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
  position: absolute;/* class="container" 在position：relative时是居中显示的*/
  top: 85px;
  bottom: 50px;
  left:50%;
  transform: translateX(-50%);/* left:50%;transform: translateX(-50%);居中 */
  color: #606266;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.row {
  padding: 20px;
  display: flex;
}
.button{
  margin-left: auto;
}
.table tbody tr{
  background-color: #dc3545;
}

</style>
