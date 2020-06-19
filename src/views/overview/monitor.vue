<template>
  <div class='container-fluid deviceinfo'>
    <i class="el-icon-close closestyle" @click="close"></i>
    <h3>{{data.Name}}</h3>
    <div class="main">
      <div class="tablestyle" v-if="infos.length>0">
          <h4>设备状态</h4>
          <table class="table table-striped">
            <tr v-for="(item,i) in infos[0]" :key="i">
              <td class="col_name">{{item.Name}}</td>
              <td class="col_value">{{valuestyle(item.Status)}}</td>
            </tr>
          </table>
          <h4>仪表数据</h4>
          <table class="table table-striped">
            <tr v-for="(ite,index) in infos[1]" :key="index" v-cloak>
              <td class="col_name"><a href="javascript:void(0)" class="astyle" @click="sendItem(ite)">{{ite.Name}}</a></td>
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
/*
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted */
/* 子组件更新过程
父beforeUpdate->子beforeUpdate->子updated->父updated
父组件更新过程
父beforeUpdate->父updated
销毁过程
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed */
import {deletesign} from '@/js/common.js'
import Chart from 'chart.js'
export default {
  name: 'monitor',
  data () {
    return {
      data: {},
      infos: [],
      sensor: {},
      timer: {},
      btntimer: '',
      chart: {
        id: '',
        name: '',
        level: 1,
        time: this.formatDateTime(new Date()),
        chartdata: {},
        timer: {},
        myChart: null
      }
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  watch: {
    sensor (newval) {
      this.$nextTick(() => {
        this.chart.id = newval.Id
        this.chart.name = newval.Name
        this.chartinit()
      })
    }
  },
  created () {
    this.init()
      .then(() => {
        this.chart.id = (this.infos[1])[0].Id
        this.chart.name = (this.infos[1])[0].Name
        this.chartinit()
      })
      .catch(error => { console.log(error) })
  },
  beforeDestroy () {
    clearTimeout(this.timer)
    clearTimeout(this.btntimer)
  },
  methods: {
    async init () {
      if (this.id) {
        clearTimeout(this.timer)
        await this.$store.dispatch('get_data', this.id)
        this.data = this.$store.getters.info_Data.data
        for (var i = 0; i < this.data.Groups.length; i++) {
          this.$set(this.infos, 0, this.data.Groups[i].Devices)
          this.$set(this.infos, 1, this.data.Groups[i].Sensors)
        }
        this.timer = setTimeout(() => {
          this.init()
        }, 10000)
      }
    },
    chartinit () {
      if (this.chart.myChart !== null) {
        this.chart.myChart.data = {}
      }
      clearTimeout(this.timer)
      this.$store.dispatch('get_Sensorchart', {id: this.chart.id, level: this.chart.level, time: this.chart.time})
        .then(() => {
          this.chart.chartdata = this.$store.getters.chart_Data
          var label1 = []
          var data1 = []
          for (var i = 0; i < this.chart.chartdata.his.length; i++) {
            this.$set(label1, i, this.chart.chartdata.his[i].time)
            this.$set(data1, i, this.chart.chartdata.his[i].value)
          }
          let data = {
            labels: label1,
            datasets: [
              {
                label: this.chart.name,
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
        })
        .catch(error => { console.log(error) })
      this.chart.timer = setTimeout(() => {
        this.chartinit()
      }, 600000)
    },
    getlevel (m) {
      this.chart.level = m
      this.chartinit()
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
      return y + m + d + h + minute
    },
    drawChart (chartId, chartData) {
      var ctx = document.getElementById(chartId)
      this.chart.myChart = new Chart(ctx, {
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
    },
    valuestyle (item) {
      return deletesign(item)
    },
    sendItem (item) {
      this.sensor = item
    },
    close () {
      this.$router.push('/overview')
    }
  }
}
</script>

<style scoped>
.deviceinfo{
  position: absolute; /* 子页面覆盖在主页面上 如果不加background-color 子页面为透明存在 */
  top: 0px;
  bottom: 0px;
  overflow: hidden;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #f2f6fc;
}
.closestyle{
  float: right;
  padding: 0px;
  padding-right: 30px;
  padding-top: 10px;
  font-size: 18px;
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
[v-cloak]{
  display:none;
}
.col_name{
  width: 20%;
}
.astyle{
  text-decoration: underline
}
.col_value{
  width: 20%;
}

.chartpart{
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
}
.chartpart .toggle{
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
}
.chartpart .toggle .button{
  text-align: center;
  transition: all 0.5s;
}
.chartpart .toggle .button:focus {
  background-color: rgb(55, 137, 219);
  border-color: rgb(55, 137, 219);
}
</style>
