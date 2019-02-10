<template>
    <div>
        <NavHeader />
        <nav-bread>
            <span>Order Success</span>
        </nav-bread>
        <div class="container">
            <div class="page-title-normal">
                <h2 class="page-title-h2"><span>check out</span></h2>
            </div>
            <!-- 进度条 -->
            <div class="check-step">
                <ul>
                    <li class="cur"><span>确认地址</span></li>
                    <li class="cur"><span>查看订单</span></li>
                    <li class="cur"><span>订单支付</span></li>
                    <li class="cur"><span>确认信息</span></li>
                </ul>
            </div>

            <div class="order-create">
                <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
                <div class="order-create-main">
                    <h3>Congratulations! <br>Your order is under processing!</h3>
                    <p>
                        <span>Order ID：{{orderId}}</span>
                        <span>Order total：${{orderTotal}}</span>
                    </p>
                    <div class="order-create-btn-wrap">
                        <div class="btn-l-wrap">
                            <router-link class="btn btn--m" to="/cart">Cart List</router-link>
                        </div>
                        <div class="btn-r-wrap">
                            <router-link class="btn btn--m" to="/">Goods List</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import axios from 'axios'
    import NavHeader from '@/components/NavHeader'
    import NavBread from '@/components/NavBread'
    import NavFooter from '@/components/NavFooter'
    export default {
        data() {
            return {
orderId:"100001",
orderTotal:1000
            }
        },
        components: {
            NavHeader,
            NavBread,
            NavFooter,
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

    .order-create {
        padding: 80px 0 50px;
        text-align: center;
    }

    .order-create-pic {
        height: 130px;
        margin: 0 auto;
        margin-bottom: 60px;
    }

    .order-create-pic img {
        height: 100%;
    }

    img {
        border: 0;
    }

    .order-create-main {
        font-size: 18px;
        line-height: 1.3;
    }

    .order-create-main h3 {
        margin-bottom: 20px;
        font-size: 1.25em;
        font-weight: 200;
        color: #333;
    }

    .order-create-main p {
        margin-bottom: 40px;
        color: #999;
    }

    .order-create-main p span {
        margin: 0 10px;
    }

    .order-create-main .order-create-btn-wrap {
        max-width: 460px;
        margin: 0 auto;
        padding: 0 5px;
    }

    .order-create-main .order-create-btn-wrap>div {
        float: left;
        width: 50%;
        padding: 0 10px;
    }

    .order-create-main .order-create-btn-wrap .btn {
        width: 100%;
        min-width: 120px;
    }

    .btn,
    .btn:hover,
    .btn[href],
    .btn[href]:hover {
        transition: all .3s ease-out;
    }

    .btn,
    .btn[href] {
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

    .btn--m {
        height: 40px;
        line-height: 40px;
    }

    .btn {
        height: 55px;
        line-height: 54px;
        padding: 0 10px;
    }

    a,
    a:hover {
        transition: color .3s ease-out;
    }

    a {
        color: inherit;
        text-decoration: none;
        cursor: pointer;
    }

    a {
        transition: color .3s ease-out;
    }

    .order-create-main .order-create-btn-wrap:after {
        visibility: hidden;
        display: block;
        content: " ";
        clear: both;
    }
</style>