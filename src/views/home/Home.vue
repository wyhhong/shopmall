<template>
  <div id="home" ref="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 class="tab-control"
                 ref="tabControl1"
                 @tabClick="tabClick"
                 v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"  @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   ref="tabControl2"
                   @tabClick="tabClick" />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>
<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";

import {getHomeMultidata,getHomegoods} from "network/home";
import {debounce} from "common/utils";


export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return {
       // result:null,
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0, list: [], more:false},
        'new':{page:0, list: [], more:false},
        'sell':{page:0, list: [], more:false}
      },
      currentType:'pop',
      isShowBackTop: false,
      tabOffsetTop:0,
      isTabFixed:false,
      //savelY 离开时，保存的一个位置savelY
      savelY:0
    }
  },
  computed:{
    showGoods(){
     return this.goods[this.currentType].list
    }
  },
  destroyed(){
    console.log("home destroyed");
  },
  activated(){
    // console.log("activated");
    this.$refs.scroll.scrollTo(0,this.savelY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    // console.log("deactivated");
    this.savelY = this.$refs.scroll.getScrollY()
  },
  //created 是在组件创建之后发送网络请求
  created(){
    //1.请求多条数据
    this.getHomeMultidata()
    //2.请求商品的数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted(){
    const  refresh = debounce(this.$refs.scroll.refresh,200)


    //3.监听item图片加载完成
    this.$bus.$on("itemImageLoad",()=>{
      // console.log(("----"));
     // this.$refs.scroll.refresh()
      refresh()
    })
  },
  methods:{
    // *事件监听的方法 *
    tabClick(index){
     // console.log(index)
      switch (index) {
        case 0:
          this.currentType = "pop"
          break
        case 1:
         this.currentType =  "new"
          break
        case 2:
         this.currentType =  "sell"
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
      this.$refs.scroll.finishPullUp()
    },
    backClick(){
      // console.log("sdd")
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      // console.log(position)  Math对象下面有一个abs函数，专门用来获取数字的绝对值
      //1.判断backTop是否显示
      // this.isShowBackTop = Math.abs(position.y) >1000
      this.isShowBackTop = -(position.y) >1000
      //2.决定tabControl是否吸顶
      // this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop
      this.isTabFixed = -(position.y) > this.tabOffsetTop
    },
    loadMore(){
       // console.log("上拉加载更多");
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    // *网络请求相关的方法 *
    getHomeMultidata(){
      //1.请求多条数据
      getHomeMultidata().then(res=>{
        // this.result = res
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
    },
    getHomeGoods(type){
      // console.log(this.goods[type].more)
      if (this.goods[type].more){

        return false
      }
      const page = this.goods[type].page + 1;
      getHomegoods(type,page).then(res=>{
        // console.log(res.data.data)
        if (res.data.data.length == 0){
          this.goods[type].more = true
        }else{
          this.goods[type].list.push(...res.data.data)
          this.goods[type].page += 1
        }
        //完成加载更多
         this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>
<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*.content {*/
  /*height: calc(100% - 93px);*/
  /*overflow: hidden;*/
  /*margin-top: 44px;*/
  /*}*/

  .tab-control{
    position: relative;
    z-index: 9;
  }
</style>