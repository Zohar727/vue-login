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
  import api from '../common/http'
    export default{
        name:"User",
        data(){
            return{
                id:'',
                info:''
            }
        },
        created(){
            this.id = localStorage.getItem("id");
            var token = localStorage.getItem("token");
            if(this.id){
                api.UserInfo(this.id,token)
                  .then(res => {
                      this.info = res;
                  })
                  .catch(err => {
                    alert("登录失效，请重新登录！");
                    this.$router.push({path:'/'});
                  })
            }else {
              alert("请先登录！");
              this.$router.push({path:'/'});
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
  @import "../style/user.css";
</style>
