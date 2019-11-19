<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default{
  name: 'app',
//   created(){
//     if (sessionStorage.getItem("store")) {
// alert('store')
// this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))

// }
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
