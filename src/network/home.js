import {request} from "./request";
import {request2} from "./request2";

//export function  getHomeMultidata  导出import 需要这样{ getHomeMultidata}
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export  function getHomegoods( type, page) {
  return request2({
    url: '/api/goods_list',
    params:{
      type,
      page
    }
  })
}
//函数调用 -> 压入函数栈（保存函数调用所有的变量）
//函数调用结束 -> 弹出函数栈（释放函数所有的变量）
// function test() {
//   const name=["wyh","thb","zhs"]
// }
// test()

// let totalnums = []
//
// const num1 = [20,11,22]
// const num2 = [111,22,333]
// // for (let n of num1){
// //   totalnums.push(n)
// // }
// //数组的解构
// totalnums.push(...num1)