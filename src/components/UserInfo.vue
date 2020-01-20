<template>
  <div class='usercard'>
    <b-card
      :header="data.UserName"
      header-text-variant="#212529"
      header-tag="header"
      header-bg-variant="#F2F2F2"
      align="center"
      style="max-width: 15rem;"
      class="mb-2"
    >
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
export default {
  name: 'UserInfo',
  data () {
    return {
      data: {},
      logined_time: window.sessionStorage.getItem('time') > 0 ? window.sessionStorage.getItem('time') : 0
    }
  },
  created () {
    this.init()
    this.gettime()
  },
  methods: {
    init () {
      this.$axios.get(this.HOST + '/user/account')
        .then(res => {
          if (res.data.status === 0) {
            this.$store.dispatch('user_account', res.data.data)
              .then(res => {
                this.data = this.$store.getters.account_data
              }).catch(error => {
                console.log(error)
              })
          }
        })
        .catch(error => { console.log(error) })
    },
    exit () {
      window.sessionStorage.removeItem('store')
      window.sessionStorage.removeItem('time')
      this.$router.push('/login')
      window.location.reload()
    },
    gettime () {
      setInterval(() => {
        this.logined_time = Math.round((new Date().getTime() - this.$store.getters.login_time) / 60000)
        window.sessionStorage.setItem('time', this.logined_time)
      }, 10000)
    }

  }
}
</script>

<style scoped>
.card-body {
  padding: 0px;
}
.list-group-item{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.icon-style{
  color: #28d7fe;
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
  background-color: #E6F7FF;
}
/* .list-group-item{
  padding: 10px;
} */
/* .list-group-item{
  padding: 10px;
} */
</style>
