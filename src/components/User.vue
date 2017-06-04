<template lang="html">
    <div class="User">
      <div class="userInfo">
        <div class="logo">Welcome ! {{info.username}}</div>
        <p>UID:{{id}}</p>
        <p>登录次数：{{info.login_count}}</p>
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
            this.id = this.$route.query.userid;
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
</style>
