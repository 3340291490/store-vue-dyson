<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>Address</span>
        </nav-bread>
        <div class="container">
            <div class="checkout-addr">
                <!-- process step -->
                <div class="check-step">
                    <ul>
                        <li class="cur"><span>确认地址</span></li>
                        <li><span>查看订单</span></li>
                        <li><span>订单支付</span></li>
                        <li><span>确认信息</span></li>
                    </ul>
                </div>

                <!-- address list -->
                <div class="page-title-normal">
                    <h2><span>配送地址</span></h2>
                </div>
                <div class="addr-list-wrap">
                    <div class="addr-list">
                        <ul>
                            <li :class="{'check':checkIndex == index}" v-for="(item,index) in addressList" @click="checkIndex=index">
                                <dl>
                                    <dt>{{item.nickname}}</dt>
                                    <dd class="address">{{item.address}}</dd>
                                    <dd class="tel">{{item.tel}}</dd>
                                </dl>
                                <div class="addr-opration addr-edit">
                                    <span class="glyphicon glyphicon-pencil"></span>
                                </div>
                                <div class="addr-opration addr-del" @click="delAddress(item.id)">
                                    <span class="glyphicon glyphicon-trash"></span>
                                </div>
                                <div class="addr-opration addr-default" v-if="item.isDefault == 'true'">Default address</div>
                                <div class="addr-opration addr-default" v-else v-show="checkIndex == index" @click="setDefault(item.id,index)">Set address</div>
                            </li>
                            <li class="addr-new">
                                <div class="add-new-inner">
                                    <i class="icon-add glyphicon glyphicon-plus"></i>
                                    <p>添加新地址</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

                <!-- shipping method-->
                <div class="page-title-normal checkout-title">
                    <h2><span>配送方式</span></h2>
                </div>
                <div class="shipping-method-wrap">
                    <div class="shipping-method">
                        <ul>
                            <li class="check">
                                <div class="name">Standard shipping</div>
                                <div class="price">Free</div>
                                <div class="shipping-tips">
                                    <p>Once shipped，Order should arrive in the destination in 1-7 business days</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="next-btn-wrap">
                    <router-link class="btn btn--m btn--red" to='/orderConfirm'>Next</router-link>
                </div>
            </div>
        </div>
        <model :mdShow="isMdShow" @close="closeModal">
            <p slot="message">
                您是否确认要删除此地址?
            </p>
            <div slot="btnGroup">
                <a class="btn btn--m" href="javascript:;" @click="sureDel">确认</a>
                <a class="btn btn--m btn--red" href="javascript:;" @click="isMdShow=false">取消</a>
            </div>
        </model>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import NavHeader from './../components/NavHeader'
    import NavFooter from './../components/NavFooter'
    import NavBread from './../components/NavBread'
    import Model from './../components/Model'
    import axios from 'axios'
    import Cookies from 'js-cookie'
    export default {
        data() {
            return {
                addressList: [],
                checkIndex:0,
                isMdShow:false,
                deleteId:''
            }
        },
        components: {
            NavHeader,
            NavFooter,
            NavBread,
            Model
        },
        mounted() {
            this.getAddress();
        },
        methods: {
            getAddress() {
                axios.post('http://localhost:9999/getaddress', {
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
                        console.log(response.data)
                        this.addressList = response.data;
                    }).catch(response => {
                        console.log('post发送的ajax请求失败' + response.data)
                    })
            },
            setDefault(addressId,index) {
                axios.post("http://localhost:9999/setdefault",{
                    user:Cookies.get("user"),
                    id:addressId
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
                    if(response.data.status == 0) {
                        this.getAddress();
                    } else {
                        console.log("修改默认地址失败！")
                    }
                }).catch(response=> {
                        console.log("POST发送的ajax请求失败！")
                })
            },
            delAddress(addressId) {
                this.isMdShow = true;
                this.deleteId = addressId;
            },
            closeModal() {
                this.isMdShow = false;
            },
            sureDel() {
                axios.post("http://localhost:9999/delAddress",{
                    id:this.deleteId
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
                    if(respoonse.data.status == 0) {
                        this.isMdShow = false;
                        this.getAddress();
                    }
                }).catch(response=> {
                    console.log("Post发送的ajax请求失败！")
                })
            }
        }
    }
</script>

<style scope>
    body {
        background: #f5f7fc;
    }

    .checkout-addr {
        padding: 10px 0 50px;
    }

    .check-step {
        padding: 30px 0 20px;
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

    .check-step li:after {
        position: absolute;
        bottom: -7px;
        left: 50%;
        margin-left: -7px;
        content: "";
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #ccc;
    }

    .check-step li.cur:after {
        background: #d1434a;
    }

    .page-title-normal {
        font-family: moderat, sans-serif;
        color: #333;
    }

    .page-title-normal h2 {
        padding: 20px 0;
        font-size: 16px;
        color: #605f5f;
        text-transform: uppercase;
        letter-spacing: .25em;
        font-weight: 700;
    }

    .addr-list li {
        position: relative;
        float: left;
        width: 23.8095%;
        height: 162px;
        margin: 0 1.587% 1.587% 0;
        padding: 20px 20px 40px;
        background: #fff;
        border: 2px solid #e9e9e9;
        overflow: hidden;
        cursor: pointer;
        color: #333;
    }

    .addr-list li:nth-child(4n) {
        margin-right: 0;
    }

    .addr-list li.check {
        border-color: #ee7a23;
        border-width: 2px;
    }

    .addr-list li dt {
        line-height: 1em;
        padding: 0 25px 10px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 16px;
    }

    .addr-list li dd {
        margin-bottom: 10px;
        line-height: 1.4285;
    }

    .addr-list li .address {
        height: 2.8517em;
        overflow: hidden;
    }

    .addr-list li .tel {
        color: #605f5f;
        line-height: 1.2142;
    }

    .addr-list li.check .addr-opration {
        display: block;
    }

    .addr-list li .addr-edit {
        top: 20px;
        right: 20px;
        width: 20px;
        height: 20px;
    }

    .addr-list li .addr-opration {
        position: absolute;
    }

    .addr-list li.check .addr-opration span:hover {
        color: #ee7a23;
        transition: color 0.3s ease-out;
    }

    .addr-list li .addr-del {
        bottom: 17px;
        right: 20px;
        width: 20px;
        height: 20px;
    }

    .addr-list li .addr-default {
        bottom: 18px;
        left: 20px;
        color: #ee7a23;
    }

    .addr-list li.addr-new {
        color: #605f5f;
        text-align: center;
    }

    .addr-list li.addr-new:hover {
        border-color: #ee7a23;
        transition: all 0.5s ease-in-out;
    }

    .addr-list li.addr-new .add-new-inner {
        padding-top: 20px;
    }

    .addr-list li.addr-new .add-new-inner .icon-add {
        display: inline-block;
        font-size: 30px;
    }

    .addr-list li.addr-new .add-new-inner p {
        margin-top: 10px;
    }

    .addr-list li.addr-new .add-new-inner .glyphicon {
        right: 0;
    }

    .shipping-addr-more {
        text-align: center;
    }

    .shipping-addr-more a {
        text-decoration: none;
        color: #ee7a23;
    }

    .shipping-method li.check {
        border-color: #ee7a23;
    }

    .shipping-method li {
        float: left;
        width: 23.8095%;
        height: 162px;
        margin: 0 1.587% 1.587% 0;
        padding: 20px;
        background: #fff;
        border: 2px solid #e9e9e9;
        font-size: 16px;
        line-height: 1.625;
        cursor: pointer;
        color: #333;
    }

    .shipping-method li .price {
        height: 26px;
        font-weight: 700;
    }

    .shipping-method li .shipping-tips {
        height: 44px;
        margin-top: 20px;
        font-weight: 200;
        font-size: 14px;
    }

    .shipping-method li .shipping-tips p {
        line-height: 1.2587;
        color: #999;
    }

    .addr-list ul:after {
        visibility: hidden;
        display: block;
        content: " ";
        clear: both;
    }

    .shipping-method-whiteglove:after,
    .shipping-method:after {
        visibility: hidden;
        display: block;
        content: " ";
        clear: both;
    }

    .checkout-addr .next-btn-wrap {
        margin-top: 20px;
        text-align: right;
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
        padding: 0 10px;
        min-width: 200px;
    }

    .btn--m {
        height: 40px;
        line-height: 40px;
    }

    .glyphicon {
        right: -2px;
    }

    dl {
        margin: 0;
        padding: 0;
    }

    @media only screen and (max-width: 991px) {
        .addr-list li {
            width: 49%;
            margin-right: 2%;
            height: auto;
        }

        .addr-list li:nth-child(2n) {
            margin-right: 0;
        }
    }

    @media only screen and (max-width: 767px) {
        .addr-list {
            padding: 0 10px;
        }

        .addr-list li {
            width: 100%;
            margin: 0 0 10px 0;
        }

        .addr-list li dt {
            font-size: 1.6rem;
        }

        .addr-list li .address {
            height: auto;
        }
    }

    @media only screen and (max-width: 991px) {

        .shipping-method li {
            width: 49%;
            margin-right: 2%;
        }

        .shipping-method li:nth-child(2n) {
            margin-right: 0;
        }
    }

    @media only screen and (max-width: 767px) {

        .shipping-method {
            padding: 0 10px;
        }

        .shipping-method li {
            width: 100%;
            margin: 0 0 10px 0;
            font-size: 1.6rem;
        }

        .shipping-method li .shipping-tips {
            font-size: 1.4rem;
        }
    }
</style>