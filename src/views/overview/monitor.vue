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
            <td class="col_name chartshow" @click="initchart(ite.Id)">{{ite.Name}}</td>
            <td class="col_value">{{ite.Value}} {{ite.Unit}}</td>
          </tr>
        </table>
      </div>
    <div class="chartpart">
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
      chartdata: {}
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.createChart('planet-chart', this.chartdata)
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
    initchart (id) {
      alert('11')
      this.chartdata = null
      this.$axios.get(this.HOST + '/sensor/' + id)
        .then(res => {
          if (res.data.status === 0) {
            this.chartdata = res.data.data.his
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
    createChart (chartId, chartData) {
      const ctx = document.getElementById(chartId)
      const myChart = new Chart(ctx, {
        type: 'line',
        data: chartData.data,
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                padding: 25,
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
.col_value{
  width: 20%;
}
.table:last-child .col_name{
  color: rgb(0, 0, 238);
  text-decoration: underline
}
.chartpart{
 flex: 1;
 overflow: auto;
 display: flex;
}
.chart{
  width: 200px;
  height: 200px;
  margin: auto;
  background:#f77777;;
}

</style>
