<template>
  <div>
    <router-link to="/first" >{{list[0]}}</router-link>
    <router-link to="/second" >{{list[1]}}</router-link>
    <router-link to="/third" >{{list[2]}}</router-link>
    <router-link to="/four" >{{list[3]}}</router-link>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      directive: '',
      list: ['项目总览', '设备监控', '统计分析', '事件报警']
    }
  }
}
</script>

<style scoped>
  div{
    width: 100%;
    height: 50px;
    position: fixed;
    left: 0px;
    bottom: 0px;
    border-top: 1px #ebe8e3 solid;
    display: flex;
  }
  a{
    text-decoration: none;
    flex-grow: 1;
    height: 50px;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    line-height: 50px;
    color: #0bf2fe;
  }
</style>
