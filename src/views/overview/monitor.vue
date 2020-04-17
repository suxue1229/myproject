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
              <td class="col_name"><a id="tag_a" href="javascript:void(0)" class="astyle" @click="sendItem(ite)">{{ite.Name}}</a></td>
              <td class="col_value">{{ite.Value}} {{ite.Unit}}</td>
            </tr>
          </table>
      </div>
      <div class="chartpart">
      <drawChart :sensor="sensor"></drawChart>
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
import drawChart from './chart'
export default {
  name: 'getInfo',
  data () {
    return {
      data: {},
      infos: [],
      sensor: {}
    }
  },
  components: {
    drawChart
  },
  created () {
    this.init()
  },
  mounted () {
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
                  // this.$set(this.infos, 0, this.data.Groups[i].Devices) 两种表达方式都对
                  // this.$set(this.infos, 1, this.data.Groups[i].Sensors)
                }
                if (this.infos[1].length > 0) {
                  let arr = this.infos[1][0]
                  this.sensor = arr // 默认第一个数据
                }
              }).catch(error => {
                console.log(error)
              })
          }
        })
        .catch(error => { console.log(error) })
    },
    sendItem (item) {
      this.sensor = item
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
    close () {
      this.$router.push('/overview')
    },
    intervalid () {
      return setInterval(() => {
        this.init()
      }, 10000)
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
.col_value{
  width: 20%;
}

.chartpart{
 margin:0 auto;
 height: 100%;
 flex: 1;
 overflow: auto;
 display: flex;
 flex-direction: column;
}
</style>
