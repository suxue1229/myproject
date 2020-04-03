<template>
  <div class='deviceinfo'>
    <table class="table table-striped">
     
    </table>
  </div>
</template>

<script>
export default {
  name: 'DeviceInfo',
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$axios.get(this.HOST + '/user/account')
        .then(res => {
          if (res.data.status === 0) {
            this.$store.dispatch('user_account', res.data.data)
              .then(res => {
                this.data = this.$store.getters.account_data
              }).catch(error => {
                console.log(error)
              })
          }
        })
        .catch(error => { console.log(error) })
    }

  }
}
</script>

<style scoped>
 .deviceinfo{
   position: absolute;
   top:85px;
   bottom: 50px;
   background-color: red;
 }
</style>
