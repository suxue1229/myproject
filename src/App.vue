<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default{
  name: 'app',
  // created(){
  //   //在页面加载时读取sessionStorage里的状态信息
  //   if (sessionStorage.getItem("store") ) {
  //       this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
  //   } 
  //   //在页面刷新时将vuex里的信息保存到sessionStorage里
  //   window.addEventListener("beforeunload",()=>{
  //     alert('刷新')
  //     sessionStorage.setItem("store",JSON.stringify(this.$store.state))
  //   })
  // }
}
</script>
<style>

body{
  background: #060C19;
  font-family:"微软雅黑";
  width:100%;
  height: 100%;
}
.active{
  background:cadetblue;
}
</style>
