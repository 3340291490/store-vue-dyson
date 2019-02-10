var dbutil = require('../util/dbutil.js')

//查询所有的商品
function selectAllProduct(cb) {
    dbutil.pool.getConnection(function(err,connection) {
        if(err) {
            throw err;
        } else {
            const sql = 'select * from product';
            connection.query(sql,function(qerr,result) {
                connection.release;
                cb(result);
            })
        }
    })
}
//根据价格查询商品
function selectGoodsByPrice(priceGt,priceLt,cb) {
    dbutil.pool.getConnection(function(err,connection) {
        if(err) {
            throw err;
        } else {
            const sql = 'select * from product where salePrice<=? and salePrice>=?';
            connection.query(sql,[priceGt,priceLt],function(qeer,result) {
                connection.release;
                cb(result);
            })
        }
    })
}
//查询是否有该用户
function ifUser(username,password,cb) {
    dbutil.pool.getConnection(function(err,connection) {
        if(err) {
            throw err;
        } else {
            const sql = 'select * from user where username=? and password=?';
            connection.query(sql,[username,password],function(qeer,result) {
                connection.release;
                cb(result);
            })
        }
    })
}
//将用户和商品信息存入数据库
function addUserAndId(user,id,num,selected) {
    dbutil.pool.getConnection(function(err,connection) {
        if(err) {
            throw err;
        } else {
            const sql = 'insert into userAndProduct(user,productId,productNum,selected) values (?,?,?,?)';
            connection.query(sql,[user,id,num,selected],function(qeer,result) {
                connection.release;
            })
        }
    })
}
//判断数据库中是否已经有该商品
function checkProductIsExist(user,id,cb) {
    dbutil.pool.getConnection(function(err,connection) {
        if(err) {
            throw err;
        } else {
            const sql = 'select count(*) as num from UserAndProduct where user=? and productId=?';
            connection.query(sql,[user,id],function(qeer,result) {
                connection.release;
                cb(result)
            })
        }
    })
}
//查询当前用户的购物车
function currentUserProduct(user,cb) {
    dbutil.pool.getConnection(function(err,connection) {
        if(err) {
            throw err;
        } else {
            const sql = 'select * from userAndProduct inner join product where user=? and productId=product.id';
            connection.query(sql,[user],function(qeer,result) {
                connection.release;
                cb(result);
            })
        }
    })
}
//根据用户和id删除商品
function delGoodsByUserAndId(id,user,cb) {
   dbutil.pool.getConnection(function(err,connection) {
        if(err) {
            throw err;
        } else {
            const sql = 'delete from userAndProduct where user=? and productId=?'
            connection.query(sql,[user,id],function(qeer,result) {
                connection.release;
                cb(result);
            })
        }
   }) 
}
//更新商品的数量
function updataNum(num,select,user,id) {
    dbutil.pool.getConnection(function(err,connection) {
        if(err) {
            throw err;
        } else {
            const sql = 'update userAndProduct set productNum=?,selected=? where user=? and productId=?';
            connection.query(sql,[num,select,user,id],function(qeer,result) {
                connection.release;
            })
        }
    })
}
//改变所有商品的选中状态
function updataAllNum(allnum,user) {
    dbutil.pool.getConnection(function(err,connection) {
        if(err) {
            throw err;
        } else {
            const sql = 'update userAndProduct set selected=? where user=?';
            connection.query(sql,[allnum,user],function(qeer,result) {
                connection.release;
            })
        }
    })
}
//查询地址列表
function findAllAddress(user,cb) {
    dbutil.pool.getConnection(function(err,connection) {
        if(err) {
            throw err;
        } else {
            const sql = 'select * from address where user=?';
            connection.query(sql,[user],function(qeer,result) {
                connection.release;
                cb(result)
            })
        }
    })
}
//设置默认地址为true
function setTrue(user,addressId,cb) {
    dbutil.pool.getConnection(function(err,connection) {
        if(err) {
            throw err;
        } else {
            const sql = 'update address set isDefault="true" where user=? and id=?';
            connection.query(sql,[user,addressId],function(qeer,result) {
                connection.release;
                cb(result);
            })
        }
    })
}
//设置默认地址为false
function setFalse(user,addressId) {
    dbutil.pool.getConnection(function(err,connection) {
        if(err) {
            throw err;
        } else {
            const sql = 'update address set isDefault="false" where user=? and id!=?';
            connection.query(sql,[user,addressId],function(qeer,result) {
                connection.release;
            })
        }
    })
}
//删除地址
function delAddress(addressId,cb) {
    dbutil.pool.getConnection(function(err,connection) {
        if(err) {
            throw err;
        } else {
            const sql = 'delete from address where id=?';
            connection.query(sql,[addressId],function(qeer,result) {
                connection.release;
                cb(result);
            })
        }
    })
}
//获取购物车中商品数量
function getGoodsNumInCart(user,cb) {
    dbutil.pool.getConnection(function(err,connection) {
        if(err) {
            throw err;
        } else {
            const sql = 'select productNum from userAndProduct where user=?';
            connection.query(sql,[user],function(qeer,result) {
                connection.release;
                cb(result);
            })
        }
    })
}
exports.selectAllProduct = selectAllProduct;
exports.selectGoodsByPrice = selectGoodsByPrice;
exports.ifUser = ifUser;
exports.addUserAndId = addUserAndId;
exports.checkProductIsExist = checkProductIsExist;
exports.currentUserProduct = currentUserProduct;
exports.delGoodsByUserAndId = delGoodsByUserAndId;
exports.updataNum = updataNum;
exports.updataAllNum = updataAllNum;
exports.findAllAddress = findAllAddress;
exports.setFalse = setFalse;
exports.setTrue = setTrue;
exports.delAddress = delAddress;
exports.getGoodsNumInCart = getGoodsNumInCart;
