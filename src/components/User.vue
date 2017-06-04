<template lang="html">
    <div class="User">
      <div class="userInfo">
        <div class="logo">Welcome ! {{info.username}}</div>
        <p>UID:{{id}}</p>
        <p>登录次数：{{info.login_count}}</p>
        <a @click="logout" class="logout">退出登录</a>
      </div>

    </div>
</template>
<script>
  import axios from 'axios'
    export default{
        name:"User",
        data(){
            return{
                id:'',
                info:''
            }
        },
        created(){
            var self = this;
            this.id = localStorage.getItem("id");
            if(this.id){
              axios.get('/api/user/' + this.id, {
                params: {token: localStorage.getItem("token")}
              })
                .then(function (response) {
                  //console.log(response.data);
                  self.info = response.data;
                })
                .catch(function (error) {
                  //console.log(error);
                  alert("登录失效，请重新登录！");
                  self.$router.push({path:'/'});
                });

            }else {
              alert("请先登录！");
              self.$router.push({path:'/'});
            }
        },
        methods:{
            logout(){
                localStorage.setItem("token","");
                localStorage.setItem("id","");
                this.$router.push({path:'/'});
            }
        }
    }
</script>
<style>
  .userInfo{
    background-color: #fff;
    width: 400px;
    height: 455px;
    box-shadow: 0 3px 16px -5px #070707;
    border-radius: 5px;
    margin: 0 auto;
  }
  .logout{
    color: #fa070f;
    font-size: 12px;
    cursor: pointer;
  }
</style>
