import { Router } from 'express'
import {sendErr, sendRes} from "../utils/response-handler";
import {userDao} from "../daos/UserDao";

const router = Router()

router.get('/test', async (req, res) => {
    sendRes(res, 200, {
        status: 200,
        message: 'test',
        data: {}
    })
})

router.get('/sign', async (req, res) => {
    try {
        const { token, uuid, os, phone } = req.body
        const result = await userDao.insertUser(token, uuid, os, phone)
        if (!result) throw new Error()
        sendRes(res, 200, {
            status: 200,
            message: '',
            data: {
                success: true
            }
        })
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

export = router
