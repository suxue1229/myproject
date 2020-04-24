<template>
  <div class='usercard'>
    <b-card
      align="center"
      style="max-width: 15rem;"
      class="mb-2"
    >
    <template v-slot:header>
        <img class="portrait" src='../assets/userlogo.jpg'>
        <small class="header-style">{{username}}</small>
    </template>
    <div class="list-group list-group-flush" >
      <a href="#" class="list-group-item list-group-item-action" ><i class="el-icon-setting icon-style"></i><p class="text-style">设置</p></a>
      <a href="#" class="list-group-item list-group-item-action" @click="exit"><i class="el-icon-close icon-style"></i><p class="text-style">注销</p></a>
      </div>
    <template v-slot:footer>
        <small class="text-muted">已登录 {{logined_time}} 分钟</small>
    </template>
    </b-card>
  </div>
</template>

<script>
import {getCookie} from '@/js/untils/validate.js'
export default {
  name: 'UserInfo',
  data () {
    return {
      logined_time: getCookie('logined_time') ? getCookie('logined_time') : 0
    }
  },
  created () {
    this.gettime()
  },
  computed: {
    username () {
      return this.$store.state.login.user.UserName
    }
  },
  watch: {
    logined_time () {
      this.Interval()
    }
  },
  destroyed () {
    clearInterval(this.Interval())
  },
  methods: {
    exit () {
      this.$store.dispatch('logout')
      location.reload() // 为了重新实例化vue-router对象 避免bug
    },
    Interval () {
      return setInterval(() => {
        this.gettime()
      }, 10000)
    },
    gettime () {
      this.logined_time = Math.round((new Date().getTime() - getCookie('firstlogin_time')) / 60000)
    }
  }
}
</script>

<style scoped>
.usercard{
  width:200px;
  height:300px;
}
.card{
  background-color: #304156;
}
.card-body {
  padding: 0px;
}
.header-style{
  color:#CCCCCC
}
.list-group-item{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.icon-style{
  color: #304156;
  flex: 0.5;
  font-size: 20px;
  text-align: center;
}
.text-style{
  flex:0.5;
  text-align: left;
  margin-bottom: 0px;
}
a.hover{
  background-color: #304156;
}
.portrait{
  width: 100px;
  height: 100px;
  overflow:hidden;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  -ms-border-radius: 100%;
  -o-border-radius: 100%;;
  border-radius: 100%;
  background-color: #304156;
  margin:0 auto;
  border: 2px solid #CCCCCC;
  display: block;
  }
</style>
