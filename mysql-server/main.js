const express = require("express");
const ejs = require('ejs');
const app = express();
const url = require('url');
//设置ejs
app.set('view engine','html');
app.engine('.html', require('ejs').__express);
//设置视图
app.set('views', __dirname+"/views");
//设置静态资源
app.use(express.static(__dirname+"/public"));
//设置处理post请求参数
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
//引入cookie-parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());  //盐

var productCon = require('./controll/productCon.js') 

app.get("/*",function(req,res) {
    var pathname = url.parse(req.url).pathname;
    if(pathname == '/goodslist') {
        res.setHeader("Access-Control-Allow-Origin", "*");
        productCon.sendGoodsList(req,res);
    } else if(pathname == '/selectgoodsbyprice') {
        res.setHeader("Access-Control-Allow-Origin", "*");
        productCon.sendGoodsByPrice(req,res);
    } else if(pathname == '/getgoodsincart') {
        res.setHeader("Access-Control-Allow-Origin", "*");
        productCon.sendProductInCart(req,res);
    } else if(pathname == "/getGoodsNumInCart") {
        res.setHeader("Access-Control-Allow-Origin", "*"); 
        productCon.getGoodsNumInCart(req,res)
    }
})
app.post("/*",function(req,res) {
    var pathname = url.parse(req.url).pathname;
    if(pathname == '/login') {
        res.setHeader("Access-Control-Allow-Origin", "*");      
        productCon.sendUserNum(req,res)
    } else if(pathname == '/addcart') {
        res.setHeader("Access-Control-Allow-Origin", "*"); 
        productCon.sendUserAndId(req,res)
    } else if(pathname == '/delgoods') {
        res.setHeader("Access-Control-Allow-Origin", "*"); 
        productCon.delGoods(req,res)
    } else if(pathname == '/updatanum') {
        res.setHeader("Access-Control-Allow-Origin", "*"); 
        productCon.changeNum(req,res)
    } else if(pathname == '/updataallnum') {
        res.setHeader("Access-Control-Allow-Origin", "*"); 
        productCon.changeAllNum(req,res)
    } else if(pathname == '/getaddress') {
        res.setHeader("Access-Control-Allow-Origin", "*"); 
        productCon.sendAllAddress(req,res)
    } else if(pathname == '/setdefault') {
        res.setHeader("Access-Control-Allow-Origin", "*"); 
        productCon.setDefaultAddress(req,res)
    } else if(pathname == '/delAddress') {
        res.setHeader("Access-Control-Allow-Origin", "*"); 
        productCon.delAddressById(req,res)
    } 
})

app.listen(9999,function () {
    console.log("serviec started on link 9999...")
})