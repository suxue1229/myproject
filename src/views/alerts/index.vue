<template>
  <div class="content">
    <Header />
      <div class="container container-style">
        <div class="row">
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
        <div class="div_table" v-if= "tabledata.length >0">
          <section id="print">
            <table class="table" id= 'error_table'>
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
        </div>
        <div v-else-if= "tabledata.length = 0" class="no_table">
          <img src="@/assets/erwu.jpg" >
          <h3>所有设备都在正常运行中...</h3>
        </div>
        <loading v-else/>
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
      tabledata: [],
      isLoading: true,
      timer: {}
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
    },
    datalist () {
      return this.$store.getters.all_Data
    }
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    print () {
      printJS({printable: 'print', type: 'html', scanStyles: false, css: ['https://qiniu.smartpilot.cn/myreport.css'], style: ''})
    },
    initdata () {
      clearTimeout(this.timer)
      var index = 0
      this.isLoading = false
      for (let i = 0; i < this.datalist.length; i++) {
        let count = 0
        for (let j = 0; j < this.datalist[i].data.Groups.length; j++) {
          this.datalist[i].data.Groups[j].Devices.some(obj => {
            if (deletesign(obj.Status) === '故障') {
              this.$set(this.showdata, i, this.datalist[i].data)
              var tablearray = {'Time': this.datalist[i].time, 'Name': this.datalist[i].data.Name, 'Status': {}}
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
      this.timer = setTimeout(() => {
        this.initdata()
      }, 60000)
    },
    handle (it) {
      if (document.getElementById('error_table')) {
        let _table = document.getElementById('error_table')
        var str = _table.getElementsByTagName('tr')// 取得行
        for (var i = 1; i < str.length; i++) {
          var td = str[i].children
          if (td[1].innerHTML === it) {
            str[i].style.display = ''
          } else {
            str[i].style.display = 'none'
          }
        }
      } else {
        alert('故障设备列表为空！')
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
.div_table{
  overflow: auto;
  text-align: center;
}
.table thead tr{
  background-color: #304156;
  font-size: 20px;
  color: #BFCBD9;
  font-weight: bold;
}
.table tbody tr{
  background-color: #dc3545;
}
.no_table{
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.no_table img{
  max-width: 1000px;
}
.no_table h3{
  margin-top: 20px;
  color: #0EEC3F;
}
</style>
