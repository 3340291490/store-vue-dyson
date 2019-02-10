<template>
    <div>
        <NavHeader />
        <nav-bread>
            <span>Goods</span>
        </nav-bread>
        <div class="body">
            <div class="container">
                <div class="body-sort">
                    <span class="sort-by">Sort by：</span>
                    <a href="#" class="def">Default</a>
                    <a href="#" class="cur">Price</a>
                </div>
                <div class="accessory-result">
                    <!-- 价格表 -->
                    <div class="filter stopPop" id="filter">
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd><a href="#" :class="{cur:priceSelected=='all'}" @click="getAllGoods">All</a></dd>
                            <dd v-for="(item,index) in priceFilter">
                                <a href="#" @click="getGoodsByPrice(index)" :class="{cur:priceSelected==index}">{{item.startPrice}}
                                    - {{item.endPrice}}</a>
                            </dd>
                        </dl>
                    </div>
                    <!-- 商品列表 -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="(item,index) in goodsList">
                                    <div class="pic">
                                        <a href="#"><img v-lazy="item.productImage" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{item.productName}}</div>
                                        <div class="price">{{item.salePrice}}</div>
                                        <div class="btn-area">
                                            <a href="#" class="btn btn--m" @click="addCart(item.id)">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <model v-bind:mdShow="mdShow" v-on:close="closeModal">
            <p slot="message">
                您当前尚未登录！
            </p>
            <div slot="btnGroup">
                <a class="btn btn--m" href="#" @click="mdShow = false">关闭</a>
            </div>
        </model>
        <model v-bind:mdShow="mdShowCart" v-on:close="closeModal">
            <p slot="message">
                <svg class="icon-status-ok">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
                </svg>
                <span v-if="ifProductExist">加入购物车成功!</span>
                <span v-else>该商品已存在于购物车，请勿重复添加！</span>
            </p>
            <div slot="btnGroup">
                <a class="btn btn--m" href="#" @click="mdShowCart = false">继续购物</a>
                <router-link class="btn btn--m btn--red" href="#" to="/cart">查看购物车</router-link>
            </div>
        </model>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import axios from 'axios'
    import NavHeader from '@/components/NavHeader'
    import NavBread from '@/components/NavBread'
    import NavFooter from '@/components/NavFooter'
    import Model from '@/components/Model'
    export default {
        data() {
            return {
                priceFilter: [
                    {
                        startPrice: '0.00',
                        endPrice: '100.00'
                    },
                    {
                        startPrice: '100.00',
                        endPrice: '500.00'
                    },
                    {
                        startPrice: '500.00',
                        endPrice: '1000.00'
                    },
                    {
                        startPrice: '1000.00',
                        endPrice: '5000.00'
                    }
                ],
                priceSelected: 'all',
                goodsList: [],
                mdShow: false,
                mdShowCart: false,
                ifProductExist:true
            }
        },
        components: {
            NavHeader,
            NavBread,
            NavFooter,
            Model
        },
        mounted() {
            this.getGoodsList();
        },
        methods: {
            getGoodsList() {
                axios.get('http://localhost:9999/goodslist', {
                    params: {

                    }
                }).then(response => {
                    this.goodsList = response.data;
                }).catch(response => {
                    console.log("get发送Ajax请求失败", response);
                })
            },
            getGoodsByPrice(index) {
                this.priceSelected = index;
                axios.get('http://localhost:9999/selectgoodsbyprice', {
                    params: {
                        priceGt: this.priceFilter[index].endPrice,
                        priceLt: this.priceFilter[index].startPrice
                    }
                }).then(response => {
                    console.log(response.data)
                    this.goodsList = response.data;
                }).catch(response => {
                    console.log("get发送Ajax请求失败", response);
                })
            },
            getAllGoods() {
                this.priceSelected = 'all';
                this.getGoodsList();
            },
            closeModal() {
                this.mdShow = false;
                this.mdShowCart = false;
            },
            addCart(id) {
                var user = Cookies.get("user");
                var num = 1;
                var selected = 1;
                if (!user) {
                    this.mdShow = true;
                } else {
                    this.mdShowCart = true;
                    axios.post('http://localhost:9999/addcart',{
                        user:user,
                        id:id,
                        num:num,
                        selected:selected
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
                        console.log("post发送Ajax请求成功",response.data);
                        if(response.data.status == 0) {
                            this.ifProductExist = true;
                        } else {
                            this.ifProductExist = false;
                        }
                    }).catch(response=> {
                        console.log("post发送Ajax请求失败",response.data);
                    })
                }
            }
        },
    }
</script>

<style scope>
    .body {
        background-color: #f5f7fc;
        font-size: 1.4rem;
        color: #605f5f;
        font-family: akkurat, sans-serif;
    }

    .body a {
        text-decoration: none;
        cursor: pointer;
    }

    .container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 10px;
    }

    .body-sort {
        height: 55px;
        line-height: 55px;
        background-color: #fff;
        text-align: right;
        margin: 60px 0 30px;
        padding: 0 10px;
    }

    .body-sort a.def {
        color: #ee7a23;
        margin-right: 10px;
    }

    .accessory-result {
        display: flex;
    }

    /* 价格表 */
    .accessory-result .filter {
        margin-right: 25px;
    }

    .filter {
        width: 230px;
        color: #605f5f;
        transition: right 0.5s ease-out;
    }

    .filter dl {
        min-height: 180px;
        margin-bottom: 50px;
    }

    .filter dt {
        margin-bottom: 30px;
        font-family: "moderat", sans-serif;
        letter-spacing: .25em;
        text-transform: uppercase;
        font-weight: bold;
    }

    .filter dd {
        line-height: 1.2em;
        margin: 20px 0;
    }

    .filter dd a {
        color: black;
        display: block;
        padding: 5px 0;
        transition: padding-left .3s ease-out;
    }

    .filter dd a:hover,
    .filter dd .cur {
        color: #ee7a23;
    }

    .filter .filter-price dd a:hover,
    .filter .filter-price dd .cur {
        -webkit-transition: padding-left .3s ease-out;
        transition: padding-left .3s ease-out;
        border-left: 2px solid #ee7a23;
        padding-left: 15px;
    }

    .filter .filter-price dd .cur {
        font-weight: bold;
    }

    .filter.filterby-show {
        right: 0;
        -webkit-transition: right .5s ease-out;
        transition: right .5s ease-out;
    }

    .btn.btn--m {
        font-size: 14px;
        font-family: moderat, sans-serif;
        font-weight: 700;
        border: 1px solid #d1434a;
        color: #d1434a;
        text-transform: uppercase;
        letter-spacing: .25em;
        white-space: nowrap;
        border-radius: 0;
    }

    /* 商品列表 */
    .accessory-list-wrap {
        width: 100%;
    }

    .accessory-list>ul:after {
        visibility: hidden;
        display: block;
        content: " ";
        clear: both;
    }

    .accessory-list>ul>li {
        float: left;
        width: 23.80952%;
        margin-right: 1.5873%;
        margin-bottom: 1.5873%;
        background: #fff;
        border: 2px solid #e9e9e9;
        -webkit-transition: all .5s ease-out;
        transition: all .5s ease-out;
    }

    .accessory-list>ul>li:hover {
        border-color: #ee7a23;
        -webkit-transform: translateY(-5px);
        -ms-transform: translateY(-5px);
        transform: translateY(-5px);
        -webkit-box-shadow: 0 0 10px #999;
        box-shadow: 0 0 10px #999;
        -webkit-transition: all .5s ease-out;
        transition: all .5s ease-out;
    }

    .accessory-list.col-4>ul>li {
        width: 23.80952%;
        margin-right: 1.5873%;
        margin-bottom: 1.5873%;
    }

    .accessory-list.col-4>ul>li:nth-child(4n) {
        margin-right: 0;
    }

    .accessory-list.col-5>ul>li {
        width: 18.73016%;
        margin-right: 1.5873%;
        margin-bottom: 1.5873%;
    }

    .accessory-list.col-5>ul>li:nth-child(5n) {
        margin-right: 0;
    }

    .accessory-list .pic {
        overflow: hidden;
    }

    .accessory-list .pic a {
        display: block;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
    }

    .accessory-list .pic img {
        width: 100%;
    }

    .accessory-list .main {
        padding: 20px 10px 10px 10px;
    }

    .accessory-list .main .name {
        height: 4em;
        line-height: 1.25em;
        padding-bottom: 10px;
        font-family: "moderat", sans-serif;
        font-weight: bold;
        overflow: hidden;
    }

    .accessory-list .main .price {
        float: left;
        line-height: 30px;
        color: #d1434a;
        font-size: 1.25em;
    }

    .accessory-list .main .quantity {
        float: right;
    }

    .accessory-list .main .btn-area {
        clear: both;
        padding-top: 10px;
    }

    .accessory-list .main .btn-area .btn {
        border: 1px solid #d1434a;
        border-radius: 0;
        width: 100%;
        color: #d1434a;
        font-weight: bold;
    }

    .accessory-list .main .btn-area .btn:hover {
        background-color: #ffe5e6;
    }

    @media only screen and (max-width: 1182px) {
        .accessory-list.col-4>ul>li {
            width: 32.27513%;
            margin-right: 1.5873%;
            margin-bottom: 1.5873%;
        }

        .accessory-list.col-4>ul>li:nth-child(4n) {
            margin-right: 1.5873%;
        }

        .accessory-list.col-4>ul>li:nth-child(3n) {
            margin-right: 0;
        }

        .accessory-list.col-5>ul>li {
            width: 23.80952%;
            margin-right: 1.5873%;
            margin-bottom: 1.5873%;
        }

        .accessory-list.col-5>ul>li:nth-child(5n) {
            margin-right: 20px;
        }

        .accessory-list.col-5>ul>li:nth-child(4n) {
            margin-right: 0;
        }

        .accessory-list .main .name {
            font-size: 1.3rem;
        }

        .accessory-list .main .btn-area .btn {
            font-size: 1.2rem;
        }
    }
</style>