<template>
  <header class="main-style">
    <div class="navbar header-style">
        <div class="navbar ">
          <div class="navbar-header">
            <a href="#" class="navbar-brand">
              <img alt="Brand" class="logo" src="/static/img/logo.png">
            </a>
          </div>
          <h1 class="narbar-color">CWT污水处理智慧管理平台</h1>
        </div>
        <div class="navbar ">
          <h3 class="narbar-color">{{time}}</h3>
          <i class="el-icon-user iconstyle" id="usericon" @click="getuserinfo" ></i>
        </div>
    </div>
    <userinfo class="infostyle" @userinfoshow="getshow"  v-if="isshowing"></userinfo>
  </header>
</template>

<script>
import userinfo from './UserInfo'
import {formatDateTime} from '@/js/common.js'
export default {
  name: 'Header',
  data () {
    return {
      time: formatDateTime(new Date())
    }
  },
  components: {
    userinfo
  },
  computed: {
    isshowing () {
      return this.$store.getters.isshowing
    }
  },
  watch: {
    isshowing (newval) {
      let usericon = document.getElementById('usericon')
      if (newval === true) {
        usericon.style.color = '#BFCBD9'
      } else {
        usericon.style.color = 'rgba(255,255,255,.5)'
      }
    }
  },
  methods: {
    getshow (el) {
      this.$store.commit('SET_Show', el)
    },
    getuserinfo () {
      if (!this.isshowing) {
        this.$store.commit('SET_Show', true)
      } else {
        this.$store.commit('SET_Show', false)
      }
    }
  }
}
</script>

<style scoped>
.main-style{
  position: fixed;
  width: 100%;
  top: 0px;
  padding: 0px;
  background: #304156;
  border-bottom: solid 1px rgba(16,46,86,.8);
  z-index: 999;
}
.header-style{
  padding: 0px;
}
.logo{
  width: 100%;
  height: 100%;
}
.narbar-color{
  color: rgba(255,255,255,.5);
}
.iconstyle{
  font-size: 28px;
  color: rgba(255,255,255,.5);
  margin-left: 30px;
  height:100%;
}

</style>
