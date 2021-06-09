<template>
  <div class="tab-control">
    <div  class="tab-control-item"
          v-for="(item,index) in titles"
         :class="{active:index == currentIndex}"
          @click="itemClick(index)">
    <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props:{
      titles:{
        type:Array,
        //类型是数组array或者对象object ,default 默认返回的函数
        default(){
          return []
        }
      }
    },
    data(){
      return {
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
       this.currentIndex = index;
       this.$emit("tabClick",index)
      }
    }
  }
</script>

<style scoped>
 .tab-control{
   display: flex;
   text-align: center;
   font-size:15px;
   height:40px;
   line-height: 40px;
   background:#fff;
 }
  .tab-control-item{
    flex: 1;
  }

 .tab-control-item span{
   padding: 3px;
 }
  .active{
    color: var(--color-high-text);
  }

  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>