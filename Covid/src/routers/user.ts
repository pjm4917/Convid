import { Router } from 'express'
import { sendErr, sendRes } from '../utils/response-handler'
import { userDao } from '../daos/UserDao'

const router = Router()

// FIXME: test example http://localhost:3000/user/test
router.get('/test', async (req, res) => {
    sendRes(res, 200, 'test', {})
})

router.post('/sign', async (req, res) => {
    try {
        const { token, uuid, os } = req.body
        const found = await userDao.getUserByUUID(uuid)
        if (found) {
            await userDao.deleteUserByUUID(uuid)
            await userDao.insertUser(token, uuid, os)
            sendRes(res, 201, '이미 존재하는 유저입니다', {
                updated: true
            })
            return
        }
        const result = await userDao.insertUser(token, uuid, os)
        if (!result) throw new Error()
        sendRes(res, 200, '', {
            success: true
        })
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

export = router