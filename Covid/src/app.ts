import express from 'express'
import path = require('path')
import bodyParser = require('body-parser')
import ip = require('ip')
import cookieParser = require('cookie-parser')
import { promises } from 'fs'

require('dotenv').config()

import user from './routers/user'
import store from './routers/store'

const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, '../public')))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'content-type, x-access-token')
    next()
})

app.get('/', (req, res) => {
    promises.readFile(__dirname + '/views/index.html')
        .then((contents) => {
            res.setHeader("Content-Type", "text/html")
            res.writeHead(200)
            res.end(contents)
        }).catch((e) => {
        res.writeHead(500)
        res.end(e)
    })
})

// Add Router
app.use('/user', user)
app.use('/store', store)

/// catch 404 and forwarding to error handler
app.use((req, res, next) => {
    let err: any = new Error('Not Found')
    err.status = 404
    next(err)
})

/// error handlers

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development') {
    app.use((err, req, res, next) => {
        console.log(err.stack)
        //res.sendStatus(err.status || 500)
    })
}

app.listen(process.env.PORT || 3000,() => {
    console.log(`Server is Running on: http://${ip.address()}:${process.env.PORT || 3000}`)
})

module.exports = app
