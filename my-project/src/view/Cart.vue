<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>My Cart</span>
        </nav-bread>
        <div class="container">
            <div class="cart">
                <div class="page-title-normal">
                    <h2 class="page-title-h2"><span>My Cart</span></h2>
                </div>
                <div class="item-list-wrap">
                    <div class="cart-item">
                        <div class="cart-item-head">
                            <ul>
                                <li>Items</li>
                                <li>Price</li>
                                <li>Quantity</li>
                                <li>Subtotal</li>
                                <li>Edit</li>
                            </ul>
                        </div>
                        <ul class="cart-item-list">
                            <li v-for="item in cartList">
                                <div class="cart-tab-1">
                                    <div class="cart-item-check">
                                        <a href="#" class="checkbox-btn item-check-btn" :class="{'select':item.selected == '1'}"
                                            @click="editorNum('checked',item)">
                                            <img src="../assets/images/勾选.png" alt="">
                                        </a>
                                    </div>
                                    <div class="cart-item-pic">
                                        <img v-lazy="item.productImage" v-bind:alt="item.productName">
                                    </div>
                                    <div class="cart-item-title">
                                        <div class="item-name">{{item.productName}}</div>
                                    </div>
                                </div>
                                <div class="cart-tab-2">
                                    <div class="item-price">{{item.salePrice}}</div>
                                </div>
                                <div class="cart-tab-3">
                                    <div class="item-quantity">
                                        <div class="select-self select-self-open">
                                            <div class="select-self-area">
                                                <a class="input-sub" @click="editorNum('minu',item)">-</a>
                                                <span class="select-ipt">{{item.productNum}}</span>
                                                <a class="input-add" @click="editorNum('add',item)">+</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="cart-tab-4">
                                    <div class="item-price-total">{{(item.productNum*item.salePrice)}}</div>
                                </div>
                                <div class="cart-tab-5">
                                    <a href="#" class="item-edit-btn">
                                        <span class="glyphicon glyphicon-trash" @click="deletGoods(item.id)"></span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="cart-foot-wrap">
                    <div class="cart-foot-inner">
                        <div class="cart-foot-l">
                            <div class="item-all-check">
                                <a href="#" class="checkbox-btn item-check-btn" :class="{select:checkAllFlag}" @click="selectall">
                                    <img src="../assets/images/勾选.png" alt="">
                                </a>
                                <span>Select all</span>
                            </div>
                        </div>
                        <div class="cart-foot-r">
                            <div class="item-total">
                                Item total: <span class="total-price">{{totlePrice | currency("$")}}</span>
                            </div>
                            <div class="btn-wrap">
                                <a class="btn btn--red" v-bind:class="{'checkout':checkedCount != 0}" @click="checkout">Checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Model :mdShow="modalConfirm" @close="closeModel">
            <p slot="message">你确认要删除此条数据吗?</p>
            <div slot="btnGroup">
                <a class="btn btn--m" href="#" @click="delcart">确认</a>
                <a class="btn btn--m" href="#" @click="modalConfirm = false">关闭</a>
            </div>
        </Model>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import NavHeader from './../components/NavHeader'
    import NavFooter from './../components/NavFooter'
    import NavBread from './../components/NavBread'
    import Model from './../components/Model'
    import axios from 'axios'
    import {currency} from '../util/currency'
    export default {
        data() {
            return {
                cartList: [],
                delItem: {},
                modalConfirm: false,
                deleteId: ''
            }
        },
        mounted() {
            this.getCartList()
        },
        components: {
            NavHeader,
            NavFooter,
            NavBread,
            Model
        },
        filters:{
            currency:currency
        },
        computed:{
            checkAllFlag() {
                return this.checkedCount == this.cartList.length
            },
            checkedCount() {
                var i = 0;
                this.cartList.forEach(item=> {
                    if(item.selected == '1') {
                        i++;
                    }
                })
                return i;
            },
            totlePrice() {
                var money = 0;
                this.cartList.forEach(item=> {
                    if(item.selected == '1') {
                        money += parseInt(item.salePrice)*parseInt(item.productNum)
                    }
                })
                return money;
            }
        },
        methods: {
            getCartList() {
                var user = Cookies.get('user')
                axios.get('http://localhost:9999/getgoodsincart', {
                    params: {
                        user: user
                    }
                }).then(response => {
                    console.log(response.data)
                    this.cartList = response.data;
                }).catch(response => {
                    console.log('get请求失败', response.data)
                })
            },
            deletGoods(id) {
                this.modalConfirm = true;
                this.deleteId = id;
            },
            closeModel() {
                this.modalConfirm = false;
            },
            delcart() {
                axios.post('http://localhost:9999/delgoods', {
                    id: this.deleteId,
                    user: Cookies.get('user')
                }, {
                        transformRequest: [
                            function (data) {
                                let params = "";
                                for (let index in data) {
                                    params += index + "=" + data[index] + "&";
                                }
                                return params;
                            }
                        ]
                    }).then(response => {
                        if (response.data.status == 0) {
                            this.getCartList();
                            this.modalConfirm = false;
                        } else {
                            console.log("删除商品失败！")
                        }
                    }).catch(response => {
                        console.log('post提交的ajax请求失败！')
                    })
            },
            editorNum(flag, item) {
                if (flag == "add") {
                    item.productNum++;
                } else if (flag == "minu") {
                    if (item.productNum <= 1) {
                        item.productNum = 1;
                    } else {
                        item.productNum--;
                    }
                } else {
                    item.selected = item.selected=='1'?'0':'1'
                    console.log(item.selected)
                }
                
                axios.post('http://localhost:9999/updatanum', {
                    num: item.productNum,
                    user: Cookies.get('user'),
                    id: item.productId,
                    selected: item.selected
                }, {
                        transformRequest: [
                            function (data) {
                                let params = "";
                                for (let index in data) {
                                    params += index + "=" + data[index] + "&";
                                }
                                return params;
                            }
                        ]
                    }).then(response => {

                    }).catch(response => {

                    })
            },
            selectall() {
                var flag = !this.checkAllFlag;
                this.cartList.forEach(item => {
                    item.selected = flag?'1':'0';
                });
                axios.post('http://localhost:9999/updataallnum',{
                    user:Cookies.get("user"),
                    allnum:Number(flag)
                },{
                    transformRequest: [
                            function (data) {
                                let params = "";
                                for (let index in data) {
                                    params += index + "=" + data[index] + "&";
                                }
                                return params;
                            }
                        ]
                }).then(response=> {

                }).catch(response=> {

                })
            },
            checkout() {
                if(this.checkedCount>0) {
                    this.$router.push('checkout')
                }
            }
        }
    }
</script>

<style>
    body {
        background-color: #f5f7fc;
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: none;
    }

    .cart {
        padding-bottom: 50px;
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

    .item-list-wrap {
        margin-bottom: 0;
    }

    .checkbox-btn {
        display: inline-block;
        width: 16px;
        height: 16px;
        background: #fff;
        border: 1px solid #999;
        border-radius: 50%;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
    }

    .select-self {
        position: relative;
        display: inline-block;
        cursor: pointer;
    }

    .cart-foot-wrap {
        margin-top: 20px;
        background: #fff;
        border: 1px solid #e9e9e9;
        font-size: 16px;
    }

    .cart-foot-wrap .cart-foot-r {
        float: right;
    }

    .cart-foot-wrap .cart-foot-r:after {
        visibility: hidden;
        display: block;
        content: " ";
        clear: both;
    }

    .select-self-open {
        border-radius: 3px 3px 0 0;
    }

    .cart-foot-wrap .btn-wrap {
        float: right;
    }

    .cart-item-opration {
        position: absolute;
        top: 55px;
        width: 100%;
    }

    .cart-foot-wrap .item-total {
        float: left;
        margin: 0 30px 0 0;
        color: #999;
        font-size: 16px;
        text-align: right;
        line-height: 54px;
    }

    .cart-foot-wrap .item-total .total-price {
        margin-left: 6px;
        color: #d1434a;
        font-size: 1.125em;
        font-weight: 700;
        line-height: 1.2;
    }

    .btn-wrap .btn--red {
        border-color: #ccc;
        background-color: #ccc;
        color: #fff;
        cursor: default;
        height: 55px;
        line-height: 54px;
        padding: 0 10px;
        border-radius: 0;
        font-size: 14px;
        font-family: moderat, sans-serif;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: .25em;
        white-space: nowrap;
    }

    .cart-foot-wrap {
        margin-top: 20px;
        background: #fff;
        border: 1px solid #e9e9e9;
        font-size: 16px;
    }

    .cart-foot-wrap .cart-foot-inner:after {
        visibility: hidden;
        display: block;
        content: " ";
        clear: both;
    }

    .cart-foot-wrap .cart-foot-l {
        float: left;
        padding: 0 22px;
        line-height: 54px;
    }

    .cart-foot-wrap .item-all-check {
        float: left;
    }

    .cart-foot-wrap .item-all-check a {
        text-decoration: none;
        color: gray;
    }

    .cart-foot-wrap .item-all-check .item-check-btn {
        margin-right: 18px;
        position: relative;
    }

    .cart-foot-wrap .item-all-check span {
        vertical-align: middle;
    }

    .item-all-check .item-check-btn img {
        position: absolute;
        top: 3px;
        right: 3px;
    }

    .item-check-btn.check {
        background-color: #ee7a23;
        border-color: #ee7a23;
    }

    .item-quantity {
        padding-top: 10px;
    }

    .item-quantity .select-self-area {
        background: none;
        border: 1px solid #f0f0f0;
        width: auto;
        border-radius: 3px;
        min-width: 50px;
        max-width: 240px;
        height: 30px;
        line-height: 30px;
    }

    .item-quantity .select-self-area a {
        text-decoration: none;
        min-width: 40px;
        height: 29px;
        border: 0;
        color: #605F5F;
        text-align: center;
        font-size: 16px;
        overflow: hidden;
        display: inline-block;
        background: #f0f0f0;
        text-decoration: none;
    }

    .item-quantity .select-self-area .select-ipt {
        text-align: center;
        display: inline-block;
        min-width: 30px;
        height: 100%;
        padding: 0 3px;
        border: 0;
        color: #605f5f;
        font-size: 16px;
        overflow: hidden;
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
        background: #605F5F;
        color: #fff;
        text-align: center;
        text-transform: uppercase;
        font-family: "moderat", sans-serif;
        letter-spacing: .25em;
    }

    .cart-item-head li:nth-child(2),
    .cart-item-head li:nth-child(3),
    .cart-item-head li:nth-child(4),
    .cart-item-head li:nth-child(5) {
        /*width: 11%;*/
        padding: 0 10px;
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

    .cart-item-list>li.disabled {
        background: #e9e9e9;
    }

    .cart-item-list>li.disabled .item-check-btn {
        background: #ccc;
    }

    .cart-item-check .checkbox-btn img {
        margin-bottom: 5px;
    }

    .cart-item-list>li.disabled>div:after {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: 100%;
        height: 100%;
        z-index: 5;
    }

    .cart-item-list>li.item-has-include .cart-item-title {
        display: block;
        min-height: 66px;
        padding-left: 160px;
    }

    .cart-item-list .cart-tab-1 {
        min-height: 72px;
        padding: 32px 0 32px 0;
        text-align: left;
        border-left: 1px solid #e9e9e9;
    }

    .cart-item-list .cart-tab-2 {
        padding-top: 64px;
    }

    .cart-item-list .cart-tab-3 {
        padding-top: 48px;
    }

    .cart-item-list .cart-tab-4 {
        padding-top: 64px;
    }

    .cart-item-list .cart-tab-5 {
        padding-top: 62px;
        border-right: 1px solid #e9e9e9;
    }

    .cart-item-list .cart-item-check {
        float: left;
        padding: 30px 0 0 20px;
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
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        min-height: 76px;
        padding: 0 20px 0 20px;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }

    .cart-item-list .cart-item-title .item-name {
        width: 100%;
        line-height: 76px;
        color: #000;
        font-family: "moderat", sans-serif;
        font-weight: bold;
    }

    .cart-item-list .cart-item-title .item-count-down {
        margin-top: 10px;
        font-size: 12px;
    }

    .cart-item-list .cart-item-title .item-count-down .icon-clock {
        width: 1em;
        height: 1em;
        fill: #605F5F;
        vertical-align: top;
    }

    .cart-item-list .cart-item-title .item-count-down .item-count-down-time {
        padding: 1px 5px 0 5px;
        background: #f0f0f0;
        color: #605F5F;
    }

    .cart-item-list .cart-item-title .item-count-down .item-count-down-tips {
        margin-top: 5px;
        color: #ee7a23;
    }

    .cart-item-list .item-include {
        position: relative;
        width: 96%;
        padding-left: 160px;
    }

    .cart-item-list .item-include dl {
        padding-right: 60px;
    }

    .cart-item-list .item-include dl dt {
        float: left;
        width: 4.5em;
    }

    .cart-item-list .item-include dl dd {
        margin-bottom: 13px;
        padding-left: 4.5em;
        color: #999;
    }

    .cart-item-list .item-include dl dd:last-child {
        margin-bottom: 0;
    }

    .cart-item-list .item-include dl:after {
        visibility: hidden;
        display: block;
        content: " ";
        clear: both;
    }

    .cart-item-list .item-include .item-include-more {
        position: absolute;
        right: 10px;
        top: 0;
    }

    .cart-item-list .item-stock {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
    }

    .cart-item-list .item-stock-no {
        color: #d1434a;
    }

    .cart-item-list .item-price {
        font-size: 16px;
        color: #333;
    }

    .cart-item-list .item-price-total {
        color: #d1434a;
        font-size: 16px;
    }

    .cart-item-list .item-edit-btn {
        position: relative;
        z-index: 6;
    }

    .cart-item-list .item-edit-btn span {
        color: gray;
        font-size: 16px;
        text-align: center;
    }

    .cart-item-list .item-edit-btn:hover span {
        color: #ee7a23;
    }

    .item-check-btn {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: #fff;
        border: 1px solid #999;
        border-radius: 50%;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
    }

    .item-check-btn .icon-ok {
        position: relative;
        display: none;
        width: 100%;
        height: 100%;
        fill: #fff;
        -webkit-transform: scale(0.6);
        -ms-transform: scale(0.6);
        transform: scale(0.6);
        vertical-align: top;
    }

    .item-check-btn.check .icon-ok {
        display: inline-block;
    }

    .select {
        border-color: #ee7a23;
        background-color: #ee7a23;
    }

    .btn-wrap .checkout {
        background-color: #d1434a;
        transition: all 0.5s ease-out;
    }
</style>