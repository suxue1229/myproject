<template>
  <div class="chart">
    <div class="toggle">
      <el-button class="button col-md-2" type="primary" @click="getlevel(1)">日视图</el-button>
      <el-button class="button col-md-2" type="primary" @click="getlevel(2)">周视图</el-button>
      <el-button class="button col-md-2" type="primary" @click="getlevel(3)">月视图</el-button>
    </div>
    <canvas id="planet-chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
export default {
  name: 'chart',
  data () {
    return {
      id: '',
      name: '',
      level: 1,
      time: this.formatDateTime(new Date()),
      chartdata: {},
      timer: {}
    }
  },
  props: {
    sensor: {} // 不能限定type，接收刚开始的null,和之后的数组lists
  },
  /* 子组件mounted->父组件mounted->watch */
  watch: {
    sensor (newval) {
      this.$nextTick(() => { /* 这里为什么需要使用this.nextTick()呢？当我们监听到lists发生变化的时候，数据虽然到来了，但是通过数据渲染到的对应dom还没有执行，我们还不能获取到对应的dom，只能通过异步的方式处理（this.nextTick() */
        if (newval) {
          this.id = newval.Id
          this.name = newval.Name
          this.initchart()
        }
      })
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  methods: {
    initchart () {
      this.chartdata = null
      clearTimeout(this.timer)
      this.$store.dispatch('get_Sensorchart', {id: this.id, level: this.level, time: this.time})
        .then(() => {
          this.chartdata = this.$store.getters.chart_Data
          var label1 = []
          var data1 = []
          for (var i = 0; i < this.chartdata.his.length; i++) {
            this.$set(label1, i, this.chartdata.his[i].time)
            this.$set(data1, i, this.chartdata.his[i].value)
          }
          let data = {
            labels: label1,
            datasets: [
              {
                label: this.name,
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
      this.timer = setTimeout(() => {
        this.initchart()
      }, 600000)
    },
    getlevel (m) {
      this.level = m
      this.initchart()
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
.chart{
  width: 100%;
  height: 100%;
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
