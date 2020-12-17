const mysql = require('mysql2/promise')

require('dotenv').config()

export const pool = mysql.createPool({
    host: 'coviddatabase.cnsxhx5bsw4v.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'covid2020',
    database: 'database',
    dateStrings: 'date',
    multipleStatements: true,
    connectionLimit: 80
})
