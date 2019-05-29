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
html,body{
  margin: 0px;
  padding: 0px;
  overflow: hidden;
}
body{
  background: rgba(27, 62, 118, 1);
}
.active{
  background:cadetblue;
}
</style>
