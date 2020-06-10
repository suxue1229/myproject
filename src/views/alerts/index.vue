<template>
  <div class="container">
    <div class="selectpart">
      <template >
        <el-select v-model="item" placeholder="请选择" class="select"  @change="handle(item)">
          <el-option
            v-for="(item, i) in instituteData"
            :item="item"
            :key="i"
            :label="item.Name"
            :value="item.Name">
          </el-option>
        </el-select>
      </template>
      <el-button class="button " type="primary" onclick="print()">打印报表</el-button>
    </div>
    <div class="div_table" v-if="tabledata.length > 0">
      <section id="print">
        <table class="table" id= 'error_table'>
            <thead>
              <tr>
                <th>日期</th>
                <th>站点名称</th>
                <th>设备名称</th>
                <th>报警内容</th>
                <th>状态</th>
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
    <loading v-else/>
  </div>
</template>
<script>
import printJS from 'print-js'
import {deletesign} from '@/js/common.js'

export default {
  name: 'alerts',
  data () {
    return {
      dateVals: '',
      item: '',
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
      return this.$store.getters.info_Data
    }
  },
  watch: {
    datalist (newval) {}

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
      this.$store.commit('ALL_DATA')
      var index = 0
      for (var m = 0; m < this.instituteData.length; m++) {
        this.$store.dispatch('get_data', this.instituteData[m].Id)
          .then(() => {
            for (let i = 0; i < this.datalist.data.Groups.length; i++) {
              let count = 0
              this.datalist.data.Groups[i].Devices.some(obj => {
                if (deletesign(obj.Status) === '故障') {
                  var tablearray = {'Time': this.datalist.time, 'Name': this.datalist.data.Name, 'Status': {}}
                  this.$set(this.tabledata, index, tablearray) // 最佳方式
                  // this.tabledata.push(tablearray) 也可以实现结构添加，但this.tabledata[index]=tablearray不可以 原因是vue检测不到这种更新
                  this.tabledata[index].Status = {'count': count, 'state': {'value': '', 'name': '', 'operation': '报警中'}}
                  this.tabledata[index].Status.count = count
                  this.tabledata[index].Status.state.value = deletesign(obj.Status)
                  this.tabledata[index].Status.state.name = obj.Name
                  count++
                  index++
                  this.isLoading = false
                }
              })
            }
          })
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
  }

}
</script>
<style scoped>
.container{
   height:100%;
}
.selectpart {
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
}
.select{
  width:300px;
}
.button{
  margin-left: auto;
}
.div_table{
  height:100%;
  overflow: auto;
  text-align: center;
}
#error_table thead tr{
  background-color: #304156;
  font-size: 20px;
  color: #BFCBD9;
  font-weight: bold;
}
#error_table tbody tr{
  background-color: #dc3545;
  border: 0px;
}

</style>
