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
  name: 'drawchart',
  data () {
    return {
      id: '',
      name: '',
      level: 1,
      time: this.formatDateTime(new Date()),
      myChart: ''
    }
  },
  props: {
    sensor: {
      type: Object,
      required: true
    }
  },
  /* 子组件mounted->父组件mounted->watch */
  watch: {
    sensor (newval) {
      this.id = newval.Id
      this.name = newval.Name
      this.initchart(this.id, this.level)
    }
  },
  methods: {
    initchart (id, level) {
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
          }
        })
        .catch(error => { console.log(error) })
    },
    getlevel (m) {
      this.level = m
      this.initchart(this.id, this.level)
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
.chart{
  width: 100%;
  height: 100%;
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
  margin: auto;
}

</style>
