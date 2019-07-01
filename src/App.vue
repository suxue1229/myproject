<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import QS from 'qs'
export default{
  name: 'app',
  data () {
    return {
    }
  }
//   mounted () {
//     this.initData()
//     console.log('res:'+this.$store.state.Authorization)
//   },
//   methods: {
//     async initData () {
//       let token = await this.$store.dispatch('user_authorize', QS.stringify({grant_type: 'password', username: 'suxue7330537@163.com', password: 'suxue13070120926'}).replace('%40', '@'))
//  }
  // }
}
</script>
<style>
html,body,p,h1,h2,h3,table,ul,li{
  margin: 0px;
  padding: 0px;
}
body{
  overflow: hidden;
  background: #060C19;
  font-family:"微软雅黑"
}
.active{
  background:cadetblue;
}
</style>
