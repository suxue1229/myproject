<template>
  <div id="app">
    <keep-alive> /* 能在组件切换过程中将状态保留在内存中，防止重复渲染DOM */
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default{
  name: 'app',
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
  background: cadetblue;
}
</style>
