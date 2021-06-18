<template>
  <div id="app">
    <!--keep-alive离开时保存原来的位置信息-->
    <keep-alive exculde="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>
<script>
  import MainTabBar from 'components/content/mainTabBar/MainTabBar'
  export default {
    name:'app',
    components:{
      MainTabBar

    }
  }
</script>
<style>
  @import  "assets/css/base.css";
</style>
