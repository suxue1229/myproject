<template>
  <div class="content">
    <Header></Header>
    <Content></Content>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Content from './content'
export default {
  name: 'layout',
  data () {
    return {
    }
  },
  components: {
    Header,
    Content,
    Footer
  }
}
</script>
<style scoped>
.content{
  width: 100vw;
  height: 100vh;
  position: relative;
}

</style>
