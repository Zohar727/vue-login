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
  import axios from 'axios'
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
              var self = this;
              if(self.user =="" || self.pwd ==""){
                  self.msg = "请将信息填写完整！"
              }else {
                axios.post('/api/user/login', {
                  username: this.user,
                  passwd: this.pwd,
                })
                  .then(function (response) {
                    var code = response.data.code;
                    if (code == 1) {
                      self.msg = "账号或密码错误！";
                      self.clearInput();
                    } else if (code == 2) {
                      self.msg = "用户名不存在！";
                      self.clearInput();
                    } else {
                      var token = response.data.token;
                      localStorage.setItem("token", token);
                      self.$router.push({path: '/user', query: {userid: response.data.id}});
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
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
  html{
    background-color: #e3e3e3;
  }
  .logo{
    width: 100%;
    height: 100px;
    line-height: 100px;
    font-size: 30px;
    text-align: center;
    color: #50e3ce;
    font-weight: bold;
  }
  #login-table{
    background-color: #fff;
    width: 400px;
    height: 455px;
    box-shadow: 0 3px 16px -5px #070707;
    border-radius: 5px;
    margin: 0 auto;
  }
  .login-user , .login-pwd,.login-btn{
    width: 70%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #50e3ce;
    padding: 0px 5px;
    margin-bottom: 10px;

  }
  .login-user , .login-pwd{

  }
  .login-btn{
    display: block;
    margin: 0 auto;
    line-height: 40px;
    background-color: #50e3ce;
    color: #fff;
    cursor: pointer;
  }
  .login-msg{
    color: #fa070f;
    font-size: 12px;
  }
</style>
