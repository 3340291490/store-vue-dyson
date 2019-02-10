<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>Order Confirm</span>
        </nav-bread>
        <div class="container">
            <div class="checkout-order">
                <div class="page-title-normal">
                    <h2 class="pate-title-h2">
                        <span>Check Out</span>
                    </h2>
                </div>
                <!-- process step -->
                <div class="check-step">
                    <ul>
                        <li class="cur"><span>确认地址</span></li>
                        <li class="cur"><span>查看订单</span></li>
                        <li><span>订单支付</span></li>
                        <li><span>确认信息</span></li>
                    </ul>
                </div>

                <!-- order list -->
                <div class="page-title-normal checkout-title">
                    <h2><span>Order content</span></h2>
                </div>
                <div class="item-list-wrap confirm-item-list-wrap">
                    <div class="cart-item order-item">
                        <div class="cart-item-head">
                            <ul>
                                <li>Order contents</li>
                                <li>Price</li>
                                <li>Quantity</li>
                                <li>Subtotal</li>
                            </ul>
                        </div>
                        <ul class="cart-item-list">
                            <li v-for="item in cartList" v-if="item.selected=='1'">
                                <div class="cart-tab-1">
                                    <div class="cart-item-pic">
                                        <img v-lazy="item.productImage">
                                    </div>
                                    <div class="cart-item-title">
                                        <div class="item-name">{{item.productName}}</div>

                                    </div>
                                </div>
                                <div class="cart-tab-2">
                                    <div class="item-price">{{item.salePrice|currency('$')}}</div>
                                </div>
                                <div class="cart-tab-3">
                                    <div class="item-quantity">
                                        <div class="select-self">
                                            <div class="select-self-area">
                                                <span class="select-ipt">×{{item.productNum}}</span>
                                            </div>
                                        </div>
                                        <div class="item-stock item-stock-no">In Stock</div>
                                    </div>
                                </div>
                                <div class="cart-tab-4">
                                    <div class="item-price-total">{{(item.salePrice*item.productNum)|currency('$')}}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Price count -->
                <div class="price-count-wrap">
                    <div class="price-count">
                        <ul>
                            <li>
                                <span>商品总金额:</span>
                                <span>{{subTotal|currency('$')}}</span>
                            </li>
                            <li>
                                <span>配送费:</span>
                                <span>{{shipping|currency('$')}}</span>
                            </li>
                            <li>
                                <span>折扣:</span>
                                <span>{{discount|currency('$')}}</span>
                            </li>
                            <li class="order-total-price">
                                <span>订单总金额:</span>
                                <span>{{orderTotal|currency('$')}}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="order-foot-wrap">
                    <div class="prev-btn-wrap">
                        <router-link class="btn btn--m" to="/checkout">Previous</router-link>
                    </div>
                    <div class="next-btn-wrap">
                        <router-link class="btn btn--m" to="/orderSuccess">Proceed to payment</router-link>
                    </div>
                </div>
            </div>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import NavHeader from './../components/NavHeader'
    import NavFooter from './../components/NavFooter'
    import NavBread from './../components/NavBread'
    import { currency } from './../util/currency'
    import axios from 'axios'
    export default {
        data() {
            return {
                cartList: [],
                orderTotal: 0,
                subTotal: 0,
                shipping: 30,
                discount: 0
            }
        },
        components: {
            NavHeader,
            NavFooter,
            NavBread
        },
        mounted() {
            this.getCartList()
        },
        filters: {
            currency:currency
        },
        methods: {
            getCartList() {
                var user = Cookies.get('user')
                axios.get('http://localhost:9999/getgoodsincart', {
                    params: {
                        user: user
                    }
                }).then(response => {
                    this.cartList = response.data;
                    this.cartList.forEach(item => {
                        if(item.selected == "1") {
                            this.subTotal += item.productNum*item.salePrice;
                            this.orderTotal = this.subTotal+this.shipping+this.discount;
                        }
                    });
                }).catch(response => {
                    console.log('get请求失败', response.data)
                })
            },
        },
    }
</script>

<style scope>
    body {
        font-size: 1.4rem;
        color: #605f5f;
        font-family: akkurat, sans-serif;
    }

    body,
    html {
        background-color: #f5f7fc;
    }

    h2 {
        margin: 0;
        padding: 0;
    }

    .checkout-order {
        padding: 10px 0 50px;
    }

    .page-title-normal {
        font-family: moderat, sans-serif;
        color: #333;
    }

    .page-title-normal h2 {
        padding: 40px 0 20px;
        font-size: 22px;
        text-transform: uppercase;
        letter-spacing: .25em;
        font-weight: 700;
    }

    .check-step {
        padding: 30px 0 20px;
    }

    .check-step ul {
        list-style: none;
        display: flex;
    }

    .check-step li.cur {
        border-color: #d1434a;
        color: #d1434a;
    }

    .check-step li {
        position: relative;
        float: left;
        -ms-flex: 1;
        -webkit-box-flex: 1;
        flex: 1;
        width: 25%;
        line-height: 1.25em;
        padding: 0 1em 1.25em;
        border-bottom: 2px solid #ccc;
        color: #999;
        text-align: center;
        font-weight: 700;
        text-transform: capitalize;
    }

    .check-step ul:after {
        visibility: hidden;
        display: block;
        content: " ";
        clear: both;
    }

    .checkout-title h2 {
        padding: 20px 0;
        font-size: 16px;
        color: #605f5f;
    }

    .checkout-order .item-list-wrap {
        margin-bottom: 40px;
    }

    .cart-item {
        display: table;
        width: 100%;
    }

    .cart-item-head {
        display: table-header-group;
        width: 100%;
    }

    .cart-item-head ul {
        display: table-row;
        width: 100%;
    }

    .cart-item-head li {
        display: table-cell;
        height: 40px;
        line-height: 40px;
        background: #605f5f;
        color: #fff;
        text-align: center;
        text-transform: uppercase;
        font-family: moderat, sans-serif;
        letter-spacing: .25em;
    }

    .cart-item-list {
        display: table-row-group;
    }

    .cart-item-list>li {
        position: relative;
        display: table-row;
        padding: 32px 0;
        background: #fff;
    }

    .cart-item-list>li>div {
        position: relative;
        display: table-cell;
        text-align: center;
        vertical-align: top;
        border-bottom: 1px solid #e9e9e9;
        height: 100%;
    }

    .cart-item-list .cart-tab-1 {
        min-height: 72px;
        padding: 32px 0;
        text-align: left;
        border-left: 1px solid #e9e9e9;
    }

    .cart-item-list .cart-item-pic {
        float: left;
        width: 80px;
        height: 80px;
        margin-left: 20px;
        border: 1px solid #e9e9e9;
        overflow: hidden;
    }

    .cart-item-list .cart-item-pic img {
        width: 100%;
    }

    .cart-item-list .cart-item-title {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        min-height: 76px;
        padding: 0 20px;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }

    .cart-item-list .cart-item-title .item-name {
        width: 100%;
        line-height: 76px;
        color: #000;
        font-family: moderat, sans-serif;
        font-weight: 700;
    }

    .cart-item-list .cart-tab-2 {
        padding-top: 64px;
    }

    .cart-item-list .item-price {
        font-size: 16px;
        color: #333;
    }

    .cart-item-list .cart-tab-3 {
        padding-top: 48px;
    }

    .order-item .select-self {
        cursor: default;
    }

    .select-self {
        position: relative;
        display: inline-block;
        cursor: pointer;
    }

    .item-quantity .select-self-area {
        background: none;
        border: 1px solid #f0f0f0;
    }

    .select-self-area {
        width: auto;
        background: #f0f0f0;
        border-radius: 3px;
        min-width: 50px;
        max-width: 240px;
        height: 30px;
        line-height: 30px;
    }

    .cart-item-list .item-stock {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
    }

    .cart-item-list .item-stock-no {
        color: #d1434a;
    }

    .cart-item-list .cart-tab-4 {
        padding-top: 64px;
    }

    .cart-item-list .item-price-total {
        color: #d1434a;
        font-size: 16px;
    }

    .price-count-wrap {
        margin-bottom: 20px;
    }

    .price-count ul {
        display: table;
        width: 100%;
    }

    .price-count li {
        display: table-row;
        font-size: 18px;
    }

    .price-count li span:first-child {
        color: #999;
    }

    .price-count li span:last-child {
        width: 20px;
        padding-left: 10px;
        white-space: nowrap;
    }

    .price-count li span {
        display: table-cell;
        height: 36px;
        padding-right: 10px;
        vertical-align: top;
        text-align: right;
    }

    .price-count .order-total-price span:last-child {
        color: #d1434a;
        font-size: 1.125em;
        font-weight: 700;
    }

    .order-foot-wrap .prev-btn-wrap {
        float: left;
    }

    .btn:hover {
        transition: all .3s ease-out;
    }

    .btn {
        display: inline-block;
        text-align: center;
        font-size: 14px;
        font-family: moderat, sans-serif;
        font-weight: 700;
        border: 1px solid #d1434a;
        color: #d1434a;
        text-transform: uppercase;
        letter-spacing: .25em;
        white-space: nowrap;
    }

    .btn {
        height: 55px;
        line-height: 54px;
        padding: 0 10px;
    }

    .btn--m {
        height: 40px;
        line-height: 40px;
        border-radius: 0;
    }

    .btn--m:hover {
        background-color: #f0c7ca;
    }

    .order-foot-wrap .next-btn-wrap {
        float: right;
    }

    .btn--red {
        border-color: #d1434a;
        background-color: #d1434a;
        color: #fff;
    }

    .order-foot-wrap:after {
        visibility: hidden;
        display: block;
        content: " ";
        clear: both;
    }
</style>