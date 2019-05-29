<template>
  <div>
    <div id='content'>
      count: {{this.getdata}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'fourchild',
  computed: {
    getdata () {
      return this.$store.state.authorization
    }
  },
  created () {
    this.$store.dispatch('getdevicedata')
  }
}
</script>
<style scoped>
  #content {
    position: absolute;
    top: 50px;
    left: 0px;
    right:0px;
    bottom: 50px;
    overflow: auto;
  }
</style>
