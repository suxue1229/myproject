<template>
  <nav class='footer-style'>
    <router-link to="/overview" tag="a">{{list[0]}}</router-link>
    <router-link to="/institute" tag="a">{{list[1]}}</router-link>
    <router-link to="/tables" tag="a">{{list[2]}}</router-link>
    <router-link to="/alerts" tag="a">{{list[3]}}</router-link>
    <span class="el-icon-full-screen iconstyle" @click="zoom" ></span>
  </nav>
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
  position: fixed;
  width: 100%;
  height: 50px;
  border-top: solid 1px rgba(16,46,86,.8);
  padding: 0;
  bottom: 0px;
  background: #304156;
  display: flex;
}
a {
  flex: 1;
  display: inline-block; /* a标签为行内元素  就是父级设置了flex布局后，子元素就算是行内元素很多浏览器可以把它当做inline-block或者block元素来用，可以直接设置它的宽高，但是还是有些浏览器不支持，所以要设置行内元素的宽度，还是手动设置一下它的display为inline-block或者block. */
  line-height: 50px;
  text-decoration: none;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #BFCBD9;
}
/* 未访问的链接 */
a:link {
  text-decoration: none;
  color: #BFCBD9;
}
/* 已访问的链接 */
a:visited {
  text-decoration: none;
  color: #BFCBD9;
}
/* 鼠标移动到链接上 */
a:hover {
  text-decoration: none;
  color: #BFCBD9;
}
/* 选定的链接 */
a:active {
  text-decoration: none;
  color: #BFCBD9;
  }
.footer-style a:nth-child(n+2) {
  border-left: solid 1px  rgba(16,46,86,0.8);
}
.iconstyle{
  font-size: 28px;
  text-align: center;
  line-height: 50px;
  flex: 0.2;
}
.active{
   background-color: #1F2D3D;
}
</style>
