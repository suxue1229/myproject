<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default{
  name: 'app'
}
</script>
<style>

body{
  font-family:"微软雅黑";
  width:100%;
  height: 100%;
  background-color: #304156;
  color:#BFCBD9;
}
.active {
background-color: #1F2D3D;
color: #0068B7 !important;
}
</style>
