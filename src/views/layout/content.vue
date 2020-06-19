<template>
  <section class="container-fluid container-style">
    <transition name="fade" mode="out-in">
      <keep-alive >
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'Content',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
<style scoped>
.container-style {
  position: absolute;
  top: 100px;
  bottom: 50px;
  color: #606266;
  overflow: hidden;
}
</style>
