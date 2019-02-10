var mysql = require('mysql')

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'test',
    psrt:'3306'
})

exports.pool = pool;