// MySQL 데이터베이스를 사용할 수 있는 mysql 모듈 불러오기 //
var mysql = require('mysql');

// MySQL 데이터베이스 연결 설정 //
exports.pool = mysql.createPool({
    connectionLimit : 10,
    host : 'coviddatabase.cnsxhx5bsw4v.ap-northeast-2.rds.amazonaws.com',
    user : 'admin',
    password : 'covid2020',
    database : 'database',
    debug : false
});