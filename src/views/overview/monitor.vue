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
              <td class="col_value">{{deletesign(item.Status)}}</td>
            </tr>
          </table>
          <h4>仪表数据</h4>
          <table class="table table-striped">
            <tr v-for="(ite,index) in infos[1]" :key="index" v-cloak>
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
  name: 'monitor',
  data () {
    return {
      data: {},
      infos: [],
      sensor: {},
      timer: {},
      btntimer: ''
    }
  },
  components: {
    drawChart
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  created () {
    this.init()
    this.btntimer = setTimeout(() => {
      let btn = document.getElementById('tag_a')
      btn.click()
    }, 1000)
  },
  beforeDestroy () {
    clearTimeout(this.timer)
    clearTimeout(this.btntimer)
  },
  methods: {
    init () {
      if (this.id) {
        clearTimeout(this.timer)
        this.$axios.get(this.HOST + '/data/' + this.id)
          .then(res => {
            if (res.data.status === 0) {
              this.$store.dispatch('get_data', res.data.data)
              this.data = this.$store.getters.info_Data
              for (var i = 0; i < this.data.Groups.length; i++) {
                /* 两种表达方式都可以将数据加入到数组中并渲染，但使用push 如何此方法首先不对数组赋值，则以后数据在数组最后一个index后继续添加,表现为数组越变越大;而每次清空 出现闪现，但$set只会在原有数据上更新 */
                // this.infos.push(this.data.Groups[i].Devices)
                // this.infos.push(this.data.Groups[i].Sensors)
                this.$set(this.infos, 0, this.data.Groups[i].Devices)
                this.$set(this.infos, 1, this.data.Groups[i].Sensors)
              }
            }
          })
          .catch(error => { console.log(error) })
        this.timer = setTimeout(() => {
          this.init()
        }, 10000)
      }
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
}
</style>
