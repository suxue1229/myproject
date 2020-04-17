<template>
  <div class="content">
    <Header />
      <div class="containter containter-style">
        <h2 >CWT工艺站点列表</h2>
      </div>
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'secondchild',
  data () {
    return {
      showdata: []
    }
  },
  created () {
    this.initdata()
  },

  methods: {
    initdata () {
    }
  },
  components: {
    Header, Footer
  }
}
</script>
<style scoped>
.containter-style{
  color: #606266;
  padding-left: 15px;
  padding-right: 15px;
  background: #f2f6fc;
  display: flex;
  flex-direction: column;
}
.containter-style h2{
  margin: 20px auto;
}
</style>
