<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default{
  name: 'app',
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
