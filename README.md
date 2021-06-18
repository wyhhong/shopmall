# supermall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#安装better-scroll
#npm install better-scroll --save

#如何监听图片加载完成
#img @load="方法"


#bus->总线
#Vue.prototype.$bus = new Vue()
#this.$bus.$emit("事件名称"，"参数")
#this.$bus.$on("事件名称"，"回调函数")


#refresh非常频繁的问题，进行防抖操作
#debounce 防抖         throttle 节流
#防抖函数作用的过程：
.如果我们执行refresh,那么refresh函数会被执行30次
.之后调用函数非常频繁的时候，就使用新生成的函数
.而新生成的函数，并不会频繁调用，如果下一次执行的非常快的，那么会将上一次的取消掉

#实现吸顶效果
#必须知道滚动到多少时，开始有吸顶效果，这时候需要获取tabControl的offsetTop
#但是如果直接在mounted获取tabControl的offsetTop，那么是不正确的
#如何获取正确的值？
#监听HomeSwiper中img加载完成
#加载完成后发出事件，在Home.vue中获取正确的值
#为了不让HomeSwiper多次发出事件
#可以使用isLoad的变量进行状态的记录


#让Home保存原来的状态
#1.不让Home随意销毁
  . keep-alive

#让Home中的内容保存原来的位置
  离开时，保存的一个位置savelY
  进来时，将位置设置为原来保存的位置savelY即可
  .注意：最好回来时，进行一次refresh()

