<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
        message: '哈哈哈'
      }
    },
    mounted() {
      //probeType:0和1都是不侦测的
      //probeType: 2 在手指滚动的过程中侦测，手指离开后的惯性滚动过程不侦测
      //probeType: 3 只要滚动都侦测


      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      // 2.监听滚动的位置
      if(this.probeType === 2 ||this.probeType === 3){
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        })
      }
      // 3.监听上拉事件
      if(this.pullUpLoad){
        this.scroll.on('pullingUp', () => {
          // console.log("监听滚动到底部");
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll &&  this.scroll.scrollTo(x, y, time)
      },
      refresh(){
        // console.log("-----");
        this.scroll && this.scroll.refresh()
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y:0
      }
    }
  }
</script>

<style scoped>
</style>