<template>
  <div id="app">
    <router-view></router-view>
    <!--<router-link to="/user">Go to User</router-link>-->
  </div>
</template>

<script>
export default {
  name: 'app',
  created(){
      if(localStorage.getItem("token")){
          this.$router.push({path:'/user'});
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
