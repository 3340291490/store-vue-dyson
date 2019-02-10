var productDB = require('../db/productDB.js')

//得到所有商品
function getAllProduct(cb) {
    productDB.selectAllProduct(function(result){
        cb(result)
    })
}
//得到范围内价格的商品
function getGoodsByPrice(priceGt,priceLt,cb) {
    productDB.selectGoodsByPrice(priceGt,priceLt,function(result) {
        cb(result);
    })
}
//判断是否有该用户
function checkUser(username,password,cb) {
    productDB.ifUser(username,password,function(result) {
        cb(result);
    })
}
//接受传来的用户和id
function getUserAndId(user,id,num,selected) {
    productDB.addUserAndId(user,id,num,selected); 
}
//如果num>0,表示已添加该物品到购物车
function checkProductIsExist(user,id,cb) {
    productDB.checkProductIsExist(user,id,function(result) {
        cb(result);
    })
}
//得到购物车中的商品
function getProductInCart(user,cb) {
    productDB.currentUserProduct(user,function(result) {
        cb(result);
    })
}
//根据用户和id删除商品
function delGoods(id,user,cb) {
    productDB.delGoodsByUserAndId(id,user,function(result) {
        cb(result);
    })
}
//更新购物车商品数量
function changeNum(num,select,user,id) {
    productDB.updataNum(num,select,user,id);
}
//改变所有商品的选中状态
function changeAllNum(allnum,user) {
    productDB.updataAllNum(allnum,user);
}
//查询所有地址
function getAllAddress(user,cb) {
    productDB.findAllAddress(user,function(result) {
        cb(result);
    })
}
//判断接收的id和数据库id是否相同，如果相同，值为true
function checkAddressId(user,addressId,cb) {
    productDB.setTrue(user,addressId,function(result) {
        cb(result);
    });
    productDB.setFalse(user,addressId);
}
//删除地址
function delAddress(addressId,cb) {
    productDB.delAddress(addressId,function(result) {
        cb(result);
    })
}
//获取购物车中商品数量
function getGoodsNumInCart(user,cb) {
    productDB.getGoodsNumInCart(user,function(result) {
        cb(result);
    })
}
exports.getAllProduct = getAllProduct;
exports.getGoodsByPrice = getGoodsByPrice;
exports.checkUser = checkUser;
exports.getUserAndId = getUserAndId;
exports.checkProductIsExist = checkProductIsExist;
exports.getProductInCart = getProductInCart;
exports.delGoods = delGoods;
exports.changeNum = changeNum;
exports.changeAllNum = changeAllNum;
exports.getAllAddress = getAllAddress;
exports.checkAddressId = checkAddressId;
exports.delAddress = delAddress;
exports.getGoodsNumInCart = getGoodsNumInCart;
