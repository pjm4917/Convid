import { Router } from 'express'
import { sendErr, sendRes } from '../utils/response-handler'
import { contactDao } from '../daos/ContactDao'
import moment from "moment";
import {userDao} from "../daos/UserDao";
import {storeDao} from "../daos/StoreDao";

const router = Router()

router.post('/in/:storeId', async (req, res) => {
    try {
        const { storeId } = req.params
        const { uuid } = req.body
        const user = await userDao.getUserByUUID(uuid)
        if (!user) throw new Error('No User')
        const result = await contactDao.insertContact(user.id, Number(storeId))
        sendRes(res, 200, '체크인되었습니다', result)
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

export = router