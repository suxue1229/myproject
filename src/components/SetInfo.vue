<template>
  <div class='container'>
    <form class="formstyle">
      <div class="form-group row">
        <label for="firstname" class="col-sm-4 col-form-label">姓</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="firstname">
        </div>
      </div>
      <div class="form-group row">
        <label for="secondname" class="col-sm-4 col-form-label">名</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="secondname">
        </div>
      </div>
      <div class="form-group row">
        <label for="nickname" class="col-sm-4 col-form-label">昵称</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="nickname">
        </div>
      </div>
       <div class="form-group row">
        <label for="department" class="col-sm-4 col-form-label">部门</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="department">
        </div>
      </div>
      <div class="form-group row">
        <label for="company" class="col-sm-4 col-form-label">单位</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="company">
        </div>
      </div>
      <button type="submit" class="btn btn-primary">save</button>
    </form>

  </div>
</template>

<script>
import {getCookie} from '@/js/untils/validate.js'
export default {
  name: 'SetInfo',
  data () {
    return {
      Interval: {},
      logined_time: getCookie('logined_time') ? getCookie('logined_time') : 0
    }
  },
  created () {
    this.gettime()
  },
  computed: {
    username () {
      return this.$store.getters.user.UserName
    }
  },
  beforeDestroy () {
    clearInterval(this.Interval)
  },
  methods: {
  }
}
</script>

<style scoped>
.container{
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

</style>
