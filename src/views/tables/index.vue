<template>
  <div class="test">

  </div>
</template>
<script>
// import {getCookie} from '@/js/untils/validate.js'
// export default {
//   name: 'test',
//   data () {
//     return {
//       websock: null
//     }
//   },
//   created () {
//     this.initWebSocket()
//   },
//   destroyed () {
//     this.websock.close() // 离开路由之后断开websocket连接
//   },
//   methods: {
//     initWebSocket () { // 初始化weosocket
//       let token = getCookie('token')
//       const wsuri = 'ws://127.0.0.1:8090/api/institute?Authorization=' + token
//       console.log('wsuri:'+wsuri)
//       this.websock = new WebSocket(wsuri)
//       this.websock.onmessage = this.websocketonmessage
//       this.websock.onopen = this.websocketonopen
//       this.websock.onerror = this.websocketonerror
//       this.websock.onclose = this.websocketclose
//     },
//     websocketonopen () { // 连接建立之后执行send方法发送数据
//       // let header = {'Content-Type': 'application/x-www-form-urlencoded', 'charset': 'utf-8', 'Connection': 'Upgrade', 'Upgrade': 'websocket'}
     
//       // this.websock.send(header)
//       // this.websock.send(token)
//       let actions = {'test': '12345'}
//       this.websocketsend(JSON.stringify(actions))
//       console.log(111)
//     },
//     websocketonerror () { // 连接建立失败重连
//       console.log('连接error, 重连')
//       this.initWebSocket()
//     },
//     websocketonmessage (e) { // 数据接收
//       const redata = JSON.parse(e.data)
//       console.log('redata:'+JSON.stringify(redata))
//     },
//     websocketsend (Data) { // 数据发送
//       this.websock.send(Data)
//     }
//     // websocketclose (e) { // 关闭
//     //   console.log('断开连接', e)
//     // }
//   }
// }
</script>
<style scoped>
</style>
