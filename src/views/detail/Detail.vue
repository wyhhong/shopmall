<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imageLoad"/>
      <detail-param-info  :param-info="paramInfo"/>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";


  import Scroll from "components/common/scroll/Scroll";

  import {getDetail,Goods,Shop,GoodsParam} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailBottomBar
    },
    data(){
      return{
        id:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{}
      }
    },
    created: function () {
      // console.log(this.$route.query.id);
      // this.id = this.$route.params.id
      //1.保存传入id
      this.id = this.$route.query.id

      //2.根据id请求商品数据
      let res = {
        id: "1jv0r2",

        result: {

          columns: ['销量 456', '收藏 211', '默认快递'],

          detailInfo: {
            desc: ' 夏季新款韩版小个子显瘦气质A字裙Polo领单排扣连衣裙短裙子', isLogin: false,
            detailImage: [{anchor: "model_img", desc: "---", key: "穿着效果", list: ["/detail/2300.jpg"]}]
          },

          itemInfo: {

            addCartTips: false, admin: false, cFav: 0, cartNum: 0,

            title: "夏季新款韩版小个子显瘦气质A字裙Polo领单排扣连衣裙短裙子",

            desc: "新款上市",

            discountBgColor: "#f13e3a",

            discountDesc: "活动价",

            lowNowPrice: '29.98',

            lowPrice: '¥42.84',

            oldPrice: '¥42.84',

            discount: '¥29.98',

            price: '¥29.98',

            topImages: ["/detail/11.jpg", "/detail/20.jpg", '/detail/122.jpg', '/detail/155.jpg', '/detail/190.jpg']
          },

          shopInfo: {

            cFans: 17145,

            cGoods: 99,

            cSells: 57878,

            name: "仲陌美",

            score: [

              {isBetter: false, name: '描述相符', score: 4.64},

              {isBetter: true, name: '价格合理', score: 5},

              {isBetter: false, name: '质量满意', score: 4.62},

            ],

            shopId: "1o4juy",

            shopLogo: '/detail/shopper.jpg',

            services: [

              {icon: "/detail/service.png", name: "退货补运费"},

              {icon: "/detail/service.png", name: "7天无理由退货"},

              {icon: "/detail/service.png", name: "全国包邮"},

              {icon: "/detail/service.png", name: "72小时发货"},

            ]
          },

          itemParams: {

            info: {
              anchor: "product_info", key: "产品参数", set: [

                {key: "图案", value: "宫廷复古图/民族复古图,字母/文字/数字"},

                {key: "厂名", value: "艾美莉服饰有限公司"},

                {key: "颜色", value: "黑白拼接"},

                {key: "袖型", value: "常规袖"},

                {key: "上衣厚度", value: "适中"},

                {key: "尺码", value: "XL,L,M,XXL"},

                {key: "衣长", value: "常规款（51-65cm）"},

                {key: "版型", value: "宽松"},

                {key: "季节", value: "春秋"},

                {key: "厂址", value: "广东省揭阳市普宁市 池尾镇贵政山"},

                {key: "材质", value: "棉"},

                {key: "领型", value: "圆领"},

                {key: "元素", value: "面料拼接,平绣"},

                {key: "袖长", value: "长袖"},

                {key: "风格", value: "原宿"},

                {key: "潮流", value: "韩系"}

              ]
            },

            rule: {
              anchor: "size_info", disclaimer: "*以上尺寸为实物人工测量,因测量当时不同会有1-2cm误差属于正常范围", key: "尺码说明",
              tables: [

                {0: "尺码", 1: "M", 2: "L", 3: "XL", 4: "XXL"},

                {0: "衣长", 1: "61.5", 2: "63", 3: "64.5", 4: "66"},

                {0: "胸围", 1: "98", 2: "104", 3: "110", 4: "116"},

                {0: "袖长", 1: "63", 2: "66", 3: "68.5", 4: "70.5"}

              ]
            }

          }

        }

      }

      getDetail(this.id).then(res=>{
        console.log(res);
      })
      // getDetail(this.id).then(res=>{
      //   // 2.1获取顶部的图片的轮播数据
      //   console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages
      //
      //   // 2.2获取商品的信息数据
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //
      //     //3创建店铺对象
      this.shop = new Shop(data.shopInfo)
      //
      //   //4.保存商品的详细数据
      this.detailInfo = data.detailInfo;
      //
      //   //5.商品的参数数据
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //
      // })
    },
    methods:{
      imageLoad(){
       this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  .detail{
    position:relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content{
    height: calc(100% - 44px);
    /*position: absolute;*/
    /*top: 44px;*/
    /*bottom: 60px;*/
  }
</style>