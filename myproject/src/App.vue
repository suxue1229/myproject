<template>
  <div id="app">
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default{
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    Header, Footer
  }
}
</script>
<style>
html,body,h1,h2,h3,table,ul,li{
  margin: 0px;
  padding: 0px;
}
body{
  overflow: hidden;
  background: #060C19;
}
.active{
  background:cadetblue;
}
</style>
