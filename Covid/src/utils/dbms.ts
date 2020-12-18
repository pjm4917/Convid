const mysql = require('mysql2/promise')

require('dotenv').config()

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dateStrings: 'date',
    multipleStatements: true,
    connectionLimit: 80
})
