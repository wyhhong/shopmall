<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick" />
    <goods-list :goods="goods[currentType].list"></goods-list>
    <ul>
      <li>1aaa</li>
      <li>2aaa</li>
      <li>3aaa</li>
      <li>4aaa</li>
      <li>5aaa</li>
      <li>6aaa</li>
      <li>7aaa</li>
      <li>8aaa</li>
      <li>9aaa</li>
      <li>10aaa</li>
      <li>11aaa</li>
      <li>12aaa</li>
      <li>13aaa</li>
      <li>14aaa</li>
      <li>15aaa</li>
      <li>16aaa</li>
      <li>17aaa</li>
      <li>18aaa</li>
      <li>19aaa</li>
      <li>20aaa</li>
      <li>21aaa</li>
      <li>22aaa</li>
      <li>23aaa</li>
      <li>24aaa</li>
      <li>25aaa</li>
      <li>26aaa</li>
      <li>27aaa</li>
      <li>28aaa</li>
      <li>29aaa</li>
      <li>30aaa</li>
      <li>31aaa</li>
      <li>32aaa</li>
      <li>33aaa</li>
      <li>34aaa</li>
      <li>35aaa</li>
      <li>36aaa</li>
      <li>37aaa</li>
      <li>38aaa</li>
      <li>39aaa</li>
      <li>40aaa</li>
      <li>41aaa</li>
      <li>42aaa</li>
      <li>43aaa</li>
      <li>44aaa</li>
      <li>45aaa</li>
      <li>46aaa</li>
      <li>47aaa</li>
      <li>48aaa</li>
      <li>49aaa</li>
      <li>50aaa</li>
      <li>51aaa</li>
      <li>52aaa</li>
      <li>53aaa</li>
      <li>54aaa</li>
      <li>55aaa</li>
      <li>56aaa</li>
      <li>57aaa</li>
      <li>58aaa</li>
      <li>59aaa</li>
      <li>60aaa</li>
      <li>61aaa</li>
      <li>62aaa</li>
      <li>63aaa</li>
      <li>64aaa</li>
      <li>65aaa</li>
      <li>66aaa</li>
      <li>67aaa</li>
      <li>68aaa</li>
      <li>69aaa</li>
      <li>70aaa</li>
      <li>71aaa</li>
      <li>72aaa</li>
      <li>73aaa</li>
      <li>74aaa</li>
      <li>75aaa</li>
      <li>76aaa</li>
      <li>77aaa</li>
      <li>78aaa</li>
      <li>79aaa</li>
      <li>80aaa</li>
      <li>81aaa</li>
      <li>82aaa</li>
      <li>83aaa</li>
      <li>84aaa</li>
      <li>85aaa</li>
      <li>86aaa</li>
      <li>87aaa</li>
      <li>88aaa</li>
      <li>89aaa</li>
      <li>90aaa</li>
      <li>91aaa</li>
      <li>92aaa</li>
      <li>93aaa</li>
      <li>94aaa</li>
      <li>95aaa</li>
      <li>96aaa</li>
      <li>97aaa</li>
      <li>98aaa</li>
      <li>99aaa</li>
      <li>100aaa</li>
    </ul>
  </div>
</template>
<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import {getHomeMultidata,getHomegoods} from "network/home";


export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,

  },
  data(){
    return {
       // result:null,
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0, list: []},
        'new':{page:0, list: []},
        'sell':{page:0, list: []}
      },
      currentType:'pop'
    }
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
    },
    // *网络请求相关的方法 *
    getHomeMultidata(){
      //1.请求多条数据
      getHomeMultidata().then(res=>{
        // console.log(res)
        // this.result = res
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomegoods(type,page).then(res=>{
        // console.log(res.data.data)
        this.goods[type].list.push(...res.data.data)
        this.goods[type].page += 1
      })
    }
  }
}
</script>
<style scoped>
  .home{padding-top:44px;}
  .home-nav{
    background-color:var(--color-tint);
    color:#fff;
    position: fixed;
    left: 0;
    right:0;
    top:0;
    z-index: 9;
  }

  /*position: sticky   sticky 英文意思是粘，粘贴，所以姑且称之为粘性定位 ,指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效*/
  .tab-control{
    position: sticky;
    top:44px;
    z-index: 99;
  }
</style>