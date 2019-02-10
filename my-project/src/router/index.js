import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/view/GoodsList'
import Cart from '@/view/Cart'
import Address from '@/view/Address'
import orderConfirm from '@/view/orderConfirm'
import orderSuccess from '@/view/orderSuccess'

Vue.use(Router)

export default new Router({
  routes: [
    { path:'/',name:'GoodsList',component:GoodsList},
    { path:'/cart',name:'Cart',component:Cart},
    { path:'/checkout',name:'Address',component:Address},
    { path:'/orderConfirm',name:'orderConfirm',component:orderConfirm},
    { path:'/orderSuccess',name:'orderSuccess',component:orderSuccess}
  ]
})
