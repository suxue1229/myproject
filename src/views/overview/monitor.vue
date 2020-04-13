<template>
  <div class='container-fluid deviceinfo'>
    <i class="el-icon-close closestyle" @click="close"></i>
    <h3>{{data.Name}}</h3>
    <div class="main">
      <div class="tablestyle">
          <h4>设备状态</h4>
          <table class="table table-striped">
            <tr v-for="(item,i) in infos[0]" :key="i">
              <td class="col_name">{{item.Name}}</td>
              <td class="col_value">{{deletesign(item.Status)}}</td>
            </tr>
          </table>
          <h4>仪表数据</h4>
          <table class="table table-striped">
            <tr v-for="(ite,index) in infos[1]" :key="index">
              <td class="col_name"><a  href="#" @click="initchart(ite.Id,level,index)" class="astyle">{{ite.Name}}</a></td>
              <td class="col_value">{{ite.Value}} {{ite.Unit}}</td>
            </tr>
          </table>
      </div>
      <div class="chartpart">
        <div class="toggle">
          <el-button class="button col-md-2" type="primary" @click="getlevel(1)">日视图</el-button>
          <el-button class="button col-md-2" type="primary" @click="getlevel(2)">周视图</el-button>
          <el-button class="button col-md-2" type="primary" @click="getlevel(3)">月视图</el-button>
        </div>
        <canvas id="planet-chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
export default {
  name: 'getInfo',
  data () {
    return {
      data: {},
      infos: [],
      changeitem: 0,
      chartdata: {},
      sensorid: '',
      id: '',
      level: 1,
      time: this.formatDateTime(new Date()),
      myChart: ''
    }
  },
  created () {
    this.init()
  },
  mounted () {
    setTimeout(() => {
      this.initchart(this.infos[1][0].Id, this.level, this.changeitem)
    }, 1000)
    // this.intervalid()
  },
  destroyed () {
    clearInterval(this.intervalid)
  },
  methods: {
    init () {
      this.infos = []
      this.$axios.get(this.HOST + '/data/' + this.$route.query.id)
        .then(res => {
          if (res.data.status === 0) {
            this.$store.dispatch('get_data', res.data.data)
              .then(res => {
                this.data = this.$store.getters.info_Data
                for (var i = 0; i < this.data.Groups.length; i++) {
                  this.infos.push(this.data.Groups[i].Devices)
                  this.infos.push(this.data.Groups[i].Sensors)
                }
                let arr=this.infos[1]
                this.id=arr[0].Id
              }).catch(error => {
                console.log(error)
              })
          }
        })
        .catch(error => { console.log(error) })
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
    initchart (id, level, index) {
      this.changeitem = index
      this.chartdata = null
      this.sensorid = id
      if (this.myChart) {
        this.myChart.destroy()
      }
      this.$axios.get(this.HOST + '/sensor/' + id + '?level=' + this.level + '&time=' + this.time)
        .then(res => {
          if (res.data.status === 0) {
            this.chartdata = res.data.data
            var label1 = []
            var data1 = []
            for (var i = 0; i < this.chartdata.his.length; i++) {
              label1.push(this.chartdata.his[i].time)
              data1.push(this.chartdata.his[i].value)
            }
            let data = {
              labels: label1,
              datasets: [
                {
                  label: 'history Data',
                  data: data1,
                  backgroundColor: [
                    'rgba(71, 183,132,.5)' // Green
                  ],
                  borderColor: [
                    '#47b784'
                  ],
                  borderWidth: 3
                }
              ]
            }
            this.drawChart('planet-chart', data)
          }
        })
        .catch(error => { console.log(error) })
    },
    close () {
      this.$router.push('/overview')
    },
    intervalid () {
      return setInterval(() => {
        this.init()
      }, 10000)
    },
    getlevel (m) {
      this.level = m
      this.initchart(this.sensorid, this.level, this.changeitem)
    },
    // 时间戳转日期格式
    formatDateTime (date) {
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      var h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      var minute = date.getMinutes()
      minute = minute < 10 ? ('0' + minute) : minute
      var second = date.getSeconds()
      second = second < 10 ? ('0' + second) : second
      return y +  m +  d +  h + minute
    },
    drawChart (chartId, chartData) {
      var ctx = document.getElementById(chartId)
      this.myChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                padding: 25
              }
            }]
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.deviceinfo{
  position: absolute; /* 子页面覆盖在主页面上 如果不加background-color 子页面为透明存在 */
  top: 85px;
  bottom: 50px;
  overflow: hidden;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #f2f6fc;
}
.closestyle{
  float:right;
}
h3{
  text-align: center;
  padding: 10px;
}
.main{
  display: flex;
  margin-bottom: 60px;
  height: 100%;
}
.tablestyle{
 flex: 1;
 height: 100%;
 padding-left: 30px;
 padding-right: 30px;
 line-height: 1;
 overflow: auto;
}
.table:last-child{
  margin-bottom: 60px;
}
.col_name{
  width: 20%;
}
.astyle{
  text-decoration: underline
}
.astyle:active{
  background-color: aqua;
  color: rgb(0, 0, 238);
  text-decoration: none
}
.col_value{
  width: 20%;
}
/* .table:last-child .col_name{
  color: rgb(0, 0, 238);
  text-decoration: underline
}
.table:last-child .col_name:hover{
  color: rgba(0, 0, 238,0.7);
} */
.chartpart{
 height: 100%;
 flex: 1;
 overflow: auto;
 display: flex;
 flex-direction: column;
}
.chartpart .toggle{
height: 80px;
display: flex;
}
.chartpart .toggle .button{
  margin:auto;
  text-align: center;
  transition: all 0.5s;
}
.chartpart .toggle .button:focus {
  background-color: rgb(55, 137, 219);
  border-color: rgb(55, 137, 219);
}
#planet-chart{
  margin: 30px auto;
}

</style>
