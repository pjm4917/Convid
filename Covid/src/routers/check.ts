import { Router } from 'express'
import { sendErr, sendRes } from '../utils/response-handler'
import { contactDao } from '../daos/ContactDao'

const router = Router

router.post('/in/:storeId', async (req, res) => {
    try {
        const storeId = req.query
        const uuid = req.body
        
        const result = await contactDao.getAllUser(storeId)
        sendRes(res, 200, '성공', result)
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})