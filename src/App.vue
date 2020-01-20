<template>
  <div id="app">
    <keep-alive> /* 能在组件切换过程中将状态保留在内存中，防止重复渲染DOM */
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
color: #28d7fe !important;
}
</style>
