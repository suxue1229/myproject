<template>
  <footer class='navbar  fixed-bottom footer-style'>
    <router-link to="/first" tag="a">{{list[0]}}</router-link>
    <router-link to="/second" tag="a">{{list[1]}}</router-link>
    <router-link to="/third" tag="a">{{list[2]}}</router-link>
    <router-link to="/four" tag="a">{{list[3]}}</router-link>
    <span class="el-icon-full-screen iconstyle" @click="zoom" ></span>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      iszooming: false,
      list: ['项目总览', '设备监控', '统计报表', '事件报警']
    }
  },
  methods: {
    zoom () {
      let element = document.documentElement
      if (this.iszooming) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
        this.iszooming = false
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen()
        }
        this.iszooming = true
      }
    }
  }
}
</script>

<style scoped>
.footer-style {
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  border-top: solid 1px rgba(16,46,86,.8);
  padding: 0;
  background: #304156;
}
a {
  flex: 1;
  text-decoration: none;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  line-height: 3em;
  color: #BFCBD9;
}
.footer-style a:nth-child(n+2) {
  border-left: solid 1px  rgba(16,46,86,0.8);
}
.iconstyle{
  font-size: 28px;
  text-align: center;
  flex: 0.2;
}
 /* a :hover{
  background-color: #1F2D3D;
  color: #409EFF;
  } */
</style>
