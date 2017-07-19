var mysql=require('mysql');

var connection=mysql.createConnection({
    host:'localhost',
    port:3306,
    database:'test',
    user:'mysqladmin',
    password:'123456'
});
connection.connect(function(err){
    if (err) {
        console.log('连接失败',err);
    } else {
        console.log('连接成功');
    };
});

connection.on('error',function(err){
    if (err.code='PROTOCOL_CONNECTION_LOST') {
        console.log('连接丢失');
    } else {
        console.log(err);
    };
});