var productSer = require('../model/service/productSer.js') 

//将所有商品列表传到前端
function sendGoodsList(req,res) {
    productSer.getAllProduct(function(result){
        res.json(result);
    })
}
//将根据价格得到的商品传到前台
function sendGoodsByPrice(req,res) {
    var priceGt = parseInt(req.query.priceGt);
    var priceLt = parseInt(req.query.priceLt);
    productSer.getGoodsByPrice(priceGt,priceLt,function(result) {
        res.json(result);
    })
}
//有用户status为0
function sendUserNum(req,res) {
    var username = req.body.username;
    var password = req.body.password;
    productSer.checkUser(username,password,function(result) {
        if(result) {
            res.json({
                status:0,
                username:result[0].username
            });
        }else {
            res.json({status:1});
        }
    })
}
//如果购物车存在该物品，返回状态值1
function sendUserAndId(req,res) {
    var user = req.body.user;
    var id = req.body.id;
    var num = req.body.num;
    var selected = req.body.selected;
    productSer.checkProductIsExist(user,id,function(result) {
        if(result[0].num != 0) {
            res.json({
                status:1,
                msg:"购物车已存在该产品"
            })
        } else {
            productSer.getUserAndId(user,id,num,selected)
            res.json({
                status:0,
                msg:'添加商品到购物车成功'
            })
        }
    })
    
}
//将购物车中的商品列表传到前端
function sendProductInCart(req,res) {
    var user = req.query.user
    productSer.getProductInCart(user,function(result) {
        res.json(result);
    })
}
//根据用户和id删除商品
function delGoods(req,res) {
    var id = req.body.id;
    var user = req.body.user;
    productSer.delGoods(id,user,function(result) {
        if(result.affectedRows == 1) {
            res.json({
                status:0
            })
        } else {
            res.json({
                status:1
            })
        }
    })
}
//更新商品数量
function changeNum(req,res) {
    var num = req.body.num;
    var user = req.body.user;
    var id = req.body.id;
    var select = req.body.selected;
    productSer.changeNum(num,select,user,id);
}
//更新所有商品的选中状态
function changeAllNum(req,res) {
    var allnum = req.body.allnum;
    var user = req.body.user;
    productSer.changeAllNum(allnum,user);
}
//根据用户名得到地址并返回数据给前端
function sendAllAddress(req,res) {
    var user = req.body.user;
    productSer.getAllAddress(user,function(result) {
        res.json(result)
    })
}
//设置默认地址
function setDefaultAddress(req,res) {
    var user = req.body.user;
    var addressId = req.body.id;
    productSer.checkAddressId(user,addressId,function(result) {
        if(result.serverStatus == 2) {
            res.json({
                status:0
            })
        } else {
            res.json({
                status:1
            })
        }
    })
}
//删除地址
function delAddressById(req,res) {
    var addressId = req.body.id;
    productSer.delAddress(addressId,function(result) {
        if(result.serverStatus == 2) {
            res.json({
                status:0
            })
        } else {
            res.json({
                status:1
            })
        }
    })
}
//获取购物车中商品数量
function getGoodsNumInCart(req,res) {
    var user = req.query.user;
    productSer.getGoodsNumInCart(user,function(result) {
        res.json(result);
    })
}
exports.sendGoodsList = sendGoodsList;
exports.sendGoodsByPrice = sendGoodsByPrice;
exports.sendUserNum = sendUserNum;
exports.sendUserAndId = sendUserAndId;
exports.sendProductInCart = sendProductInCart;
exports.delGoods = delGoods;
exports.changeNum = changeNum;
exports.changeAllNum = changeAllNum;
exports.sendAllAddress = sendAllAddress;
exports.setDefaultAddress = setDefaultAddress;
exports.delAddressById = delAddressById;
exports.getGoodsNumInCart = getGoodsNumInCart;
