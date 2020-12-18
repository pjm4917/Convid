import { Router } from 'express'
import { sendErr, sendRes } from '../utils/response-handler'
import { contactDao } from '../daos/ContactDao'
import moment from "moment";

const router = Router()

router.post('/in/:storeId', async (req, res) => {
    try {
        const { storeId } = req.query
        const { uuid } = req.body
        const result = await contactDao.insertContact(uuid, String(storeId))
        if (!result) throw new Error()
        sendRes(res, 200, '체크인되었습니다', result)
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

router.get('/', async (req, res) => {
    try{
        const { storeId, uuid, createTime } = req.query
        const result = await contactDao.showContact(String(storeId), String(uuid), moment(String(createTime)).toDate())
        if (!result) sendRes(res, 200, '아무도 없습니다.', result)
        sendRes(res, 200, '검색되었습니다.', result)
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

export = router
