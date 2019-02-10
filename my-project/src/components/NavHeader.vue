<template>
    <header class="header">
        <div class="top-navbar">
            <div class="navbar-left-container">
                <a href="#">
                    <img class="navbar-brand-logo" src="../assets/images/logo.jpg">
                </a>
            </div>
            <div class="navbar-right-container" style="display: flex;">
                <div class="navbar-menu-container">
                    <span class="navbar-link" v-if="ifUserLogin">{{userName}},欢迎您</span>
                    <a href="#" class="navbar-link" v-if="!ifUserLogin" @click="loginModalFlag=true">Login</a>
                    <a href="#" class="navbar-link" v-else @click="loginOut">Logout</a>
                    <div class="navbar-cart-container" @click='toCart'>
                        <span class="navbar-cart-count" v-if="cartCount>0">{{cartCount}}</span>
                        <a class="navbar-link navbar-cart-link" href="#">
                            <span class="glyphicon glyphicon-shopping-cart"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 登录弹出框 -->
        <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':loginModalFlag}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <div class="md-title">Login in</div>
                    <button class="md-close" @click="loginModalFlag=false">Close</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <div class="error-wrap">
                            <span class="error error-show" v-show='errorTip'>用户名或者密码错误</span>
                        </div>
                        <ul>
                            <li class="regi_form_input">
                                <i class="icon IconPeople"></i>
                                <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left"
                                    placeholder="User Name" data-type="loginname">
                            </li>
                            <li class="regi_form_input noMargin">
                                <i class="icon IconPwd"></i>
                                <input type="password" tabindex="2" name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text"
                                    placeholder="Password" @keyup.enter="login">
                            </li>
                        </ul>
                    </div>
                    <div class="login-wrap">
                        <a href="#" class="btn-login" @click="login">登 录</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-if="loginModalFlag" @click="loginModalFlag=false"></div>
    </header>
</template>

<script>
    import Cookies from 'js-cookie'
    import './../assets/css/login.css'
    import axios from 'axios'
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                ifUserLogin: false,
                cartCount: 0,
                userName: '',
                userPwd: '',
                errorTip: false,
                loginModalFlag: false
            }
        },
        computed: {

        },
        mounted() {
            this.checkUserLogin()
            this.init()
        },
        methods: {
            checkUserLogin() {
                var user = Cookies.get("user");
                if(user) {
                    this.loginModalFlag = false;                   
                    this.ifUserLogin = true;
                    this.userName = user;
                }
            },
            login() {
                if(!this.userName || !this.userPwd) {
                    this.errorTip = true
                    return;
                };
                axios.post('http://localhost:9999/login', {
                    username: this.userName,
                    password: this.userPwd
                },
                {
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
                    if(response.data.status == 0) {
                        this.loginModalFlag = false;
                        this.ifUserLogin = true;
                        Cookies.set("user",response.data.username,{expires:1/24});
                        this.init();
                    }
                }).catch(response => {
                    console.log("post发送Ajax请求失败", response);
                })
            },
            loginOut() {
                this.userName = "";
                this.ifUserLogin = false;
                this.cartCount = 0;
                Cookies.remove('user');
            },
            toCart() {
                this.$router.push('/cart')
            },
            //获取商品数量
            init() {
                var user = Cookies.get('user')
                axios.get('http://localhost:9999/getGoodsNumInCart', {
                    params: {
                        user: user
                    }
                }).then(response => {
                    var cartList = response.data;
                    cartList.forEach(item => {
                        this.cartCount += parseInt(item.productNum)
                    });
                }).catch(response => {
                    console.log('get请求失败', response.data)
                })
            }
        }
    }
</script>

<style>
    .header {
        width: 100%;
        background-color: white;
        font-family: "moderat", sans-serif;
        font-size: 16px;
    }

    .glyphicon {
        right: 6px;
    }

    .top-navbar {
        display: flex;
        justify-content: space-between;
        align-content: center;
        width: 100%;
        height: 70px;
        max-width: 1280px;
        margin: 0 auto;
        padding: 5px 20px 10px 20px;
    }

    .navbar-left-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: -20px;
    }

    .navbar-brand-logo {
        height: 60px;
        width: 120px;
    }

    .header a,
    .footer a {
        color: #666;
        text-decoration: none;
    }

    a {
        -webkit-transition: color .3s ease-out;
        transition: color .3s ease-out;
    }

    .navbar-right-container {
        display: none;
        justify-content: flex-start;
        align-items: center;
    }

    .navbar-menu-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: 10px;
    }

    .navbar-link {
        padding-left: 15px;
    }
    
    a.navbar-link:hover {
        color: #d1434a;
        transition: color 0.5 ease-in-out;
    }

    .navbar-cart-container {
        position: relative;
    }

    .navbar-cart-count {
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -9px;
        right: -11px;
        width: 20px;
        border-radius: 10px;
        color: white;
        background-color: #eb767d;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
    }

    .navbar-cart-logo {
        width: 25px;
        height: 25px;
        transform: scaleX(-1);
    }
</style>