<template>
  <div class='container-fluid deviceinfo'>
    <i class="el-icon-close closestyle" @click="close"></i>
    <h3>{{data.Name}}</h3>
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
          <td class="col_name">{{ite.Name}}</td>
          <td class="col_value">{{ite.Value}} {{ite.Unit}}</td>
        </tr>
      </table>
      </div>
  </div>
</template>

<script>
export default {
  name: 'getInfo',
  data () {
    return {
      data: {},
      infos: []
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.time = setInterval(() => {
      this.init()
    }, 10000)
  },
  destroyed () {
    clearInterval(this.time)
  },
  methods: {
    init () {
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
    close () {
      this.$router.push('/overview')
    }
  }
}
</script>

<style scoped>
.deviceinfo{
  position: absolute; /* 子页面覆盖在主页面上 如果不加background-color 主页面为透明存在 */
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
.tablestyle{
 width: 60%;
 height: 100%;
 margin: 0 auto;
 line-height: 1;
 overflow: auto;
}
.table:last-child{
  margin-bottom: 60px;
}
.col_name, .col_value{
  width: 40%;
}

</style>
