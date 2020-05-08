<template>
  <div id="app">
    <keep-alive :include="['overview','institute','tables','alerts']">
      <router-view />
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
  font-family:"微软雅黑",serif;
  background-color: #f2f6fc;
}
</style>
