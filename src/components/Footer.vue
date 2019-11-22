<template>
  <footer class='navbar  fixed-bottom footer-style'>
    <router-link to="/first" tag="a">{{list[0]}}</router-link>
    <router-link to="/second" tag="a">{{list[1]}}</router-link>
    <router-link to="/third" tag="a">{{list[2]}}</router-link>
    <router-link to="/four" tag="a">{{list[3]}}</router-link>
    <span class="el-icon-full-screen iconstyle"></span> 
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      directive: "",
      list: ["项目总览", "设备监控", "统计分析", "事件报警"]
    };
  }
};
</script>

<style scoped>
.footer-style {
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  border-top: solid 1px rgba(16,46,86,.8);
  padding: 0;
  background: #060C19;
} 
a {
  flex: 1;
  text-decoration: none;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  line-height: 3em;
  color: #28d7fe;
}
.footer-style a:nth-child(n+2) {
  border-left: solid 1px  rgba(16,46,86,0.8);
}
.iconstyle{
  line-height: 3em;
  color: #28d7fe;
  text-align: center;
  font-size: 18px;
  flex: 0.2;
}
</style>
