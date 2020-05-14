<template>
  <div class="main">
    <i class="el-icon-close closestyle" @click= "close"></i>
    <div class="main-content">
      <div class="main-left">
      <form class="formstyle" action=" ">
        <div class="form-group">
          <label for="firstname" class="col-sm-3 col-form-label" >姓</label>
          <div class="col-sm-9">
            <input type="text" required v-model = "newuser.LastName" class="form-control" id="firstname" placeholder="请输入您的姓">
          </div>
        </div>
        <div class="form-group">
          <label for="secondname" class="col-sm-3 col-form-label">名</label>
          <div class="col-sm-9">
            <input type="text" required v-model= "newuser.FirstName" class="form-control" id="secondname" placeholder="请输入您的名">
          </div>
        </div>
        <div class="form-group">
          <label for="nickname" class="col-sm-3 col-form-label">昵称</label>
          <div class="col-sm-9">
            <input type="text" required v-model= "newuser.NickName" class="form-control" id="nickname" placeholder="请输入您的昵称">
          </div>
        </div>
        <div class="form-group">
          <label for="department" class="col-sm-3 col-form-label">部门</label>
          <div class="col-sm-9">
            <input type="text" required v-model= "newuser.Department" class="form-control" id="department" placeholder="请输入您的部门">
          </div>
        </div>
        <div class="form-group">
          <label for="company" class="col-sm-3 col-form-label">单位</label>
          <div class="col-sm-9">
            <input type="text" required v-model= "newuser.Company" class="form-control" id="company" placeholder="请输入您的单位">
          </div>
        </div>
        <button type="button" class="btn btn-primary" @click= "changeinfo">save</button>
      </form>
    </div>
    <div class="main-right">
      <img src="@/assets/userlogo.jpg">
      <p>Hi!，欢迎！</p>
      <div class="container">
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><p>邮箱</p>{{user.UserName}}</li>
          <li class="list-group-item"><p>姓名</p>{{user.LastName}}{{user.FirstName}}</li>
          <li class="list-group-item"><p>部门</p>{{user.Department}}</li>
          <li class="list-group-item"><p>公司</p>{{user.Company}}</li>
        </ul>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import QS from 'qs'
export default {
  name: 'SetInfo',
  data () {
    return {
      newuser: JSON.parse(sessionStorage.getItem('user'))
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    changeinfo () {
      this.$axios.post(this.HOST + '/user/account',
        QS.stringify({LastName: this.newuser.LastName, FirstName: this.newuser.FirstName, NickName: this.newuser.NickName, Company: this.newuser.Company, Department: this.newuser.Department}), {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'charset': 'utf-8'}})
        .then(
          res => {
            if (res.data.status === 0) {
              this.$store.dispatch('user_account', this.newuser)
              alert(res.data.message)
            }
          }
        )
        .catch(error => {
          console.log(error)
        })
    },
    close () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.main{
  width:100%;
  height: 100%;
  position: absolute;
  left: 0px;
  right:0px;
  padding: 5px;
  display: flex;
  flex-direction: column;
}
.closestyle{
  margin:auto;
  align-self: end;
  margin-right: 5px;
  padding: 0px;
  font-size: 18px;
}
.main-content{
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  display: flex;
  margin-top: 5px;
}
.main-left{
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  margin-left: 300px;
  margin-right:30px;
  border-radius: 5px;
  background: #FFFFFF;
  display: flex;
  justify-content: center;
}
.formstyle{
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form-group{
  width:100%;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
}
.col-form-label{
  margin-left: 10%;
}
.col-sm-9{
  margin: auto;
  align-self: center;
}
.btn{
  margin-top:1rem;
  margin-bottom:1rem;
  width: 300px;
}
.main-right{
  border-radius: 5px;
  margin-right: 10px;
  width: 300px;
  background: greenyellow;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main-right img{
  width: 100px;
  height:100px;
  border-radius: 50%;
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
