<template>
  <div>
    <div id='content' ref="content">
      <!--  <ul>
        <li v-for="(list,index) in datalist" :key="index">
          <h3>{{list.title}}</h3>
          <p>{{list.content}}</p>
          <img :src="list.img"/>
        </li>
      </ul>-->
       <p>{{initData()}}</p>
    </div> 
  </div>
</template>
<script>
// import BScroll from 'better-scroll'
import QS from 'qs'
import {mapGetters} from 'vuex'
export default {
  name: 'secondchild',
  data () {
    return {
      datalist: []
    }
  },
  computed: {
    ...mapGetters([
      'access_token'
    ])
  },
  methods: {
    async initData () {
      let token = await this.$store.dispatch('user_authorize', QS.stringify({grant_type: 'password', username: 'suxue7330537@163.com', password: 'suxue13070120926'}).replace('%40', '@'))
      console.log('222:' + this.access_token)
    }
  }

  // created () {
  //   var datalist = window.localStorage.getItem('datalist')
  //   if (datalist) {
  //     this.datalist = JSON.parse(datalist)
  //   } else {
  //     this.$axios.get('http://www.wwtliu.com/sxtstu/blueberrypai/getIndexbanner.php')
  //       .then(res => {
  //         this.datalist = res.data.banner
  //         this.$nextTick(() => {
  //           new BScroll(this.$refs.content, {})
  //         })
  //         if (!window.localStorage) {
  //           alert('浏览器不支持本地存储')
  //           return false
  //         } else {
  //           window.localStorage.setItem('datalist', JSON.stringify(res.data.banner))
  //         }
  //       }).catch(error => {
  //         console.log(error)
  //       })
  //   }
  // }
}
</script>
<style scoped>
  #content{
    position: absolute;
    top: 50px;
    left: 0px;
    right:0px;
    bottom: 50px;
    overflow: auto;
  }
  img{
    width: 100%;
    display: block;
  }
  ul,li,h3{
    margin: 0px;
    padding:0px;
    color: #0bf2fe;
  }
</style>
