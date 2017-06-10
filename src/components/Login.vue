<template lang="html">
    <div class="login">

      <form id="login-table">
        <div class="logo">登录</div>
        <div>
          <input type="text" v-model="user" class="login-user" placeholder="请输入用户名">
        </div>
        <div>
          <input type="password" v-model="pwd" class="login-pwd" placeholder="请输入密码">
        </div>
        <a @click="login" class="login-btn" >登录</a>
        <p class="login-msg">{{msg}}</p>
      </form>
    </div>
</template>
<script>
  import api from '../common/http'
    export default{
        name:"login",
        data(){
            return{
                msg:"",
                user:"",
                pwd:""
            }
        },
        methods:{
            login(){
              if(this.user =="" || this.pwd ==""){
                this.msg = "请将信息填写完整！"
              }else {
                let data = {
                  username: this.user,
                  passwd: this.pwd,
                }
                api.Login(data)
                  .then(res => {
                    var code = res.code;
                    if (code == 1) {
                      this.msg = "账号或密码错误！";
                      this.clearInput();
                    } else if (code == 2) {
                      this.msg = "用户名不存在！";
                      this.clearInput();
                    } else {
                      localStorage.setItem("id",res.id);
                      localStorage.setItem("token", res.token);
                      this.$router.push({path: '/user'});
                    }
                  })
              }
            },
            clearInput(){
                this.user = "";
                this.pwd = "";
            }
        }
    }
</script>
<style>
  @import "../style/login.css";
</style>
