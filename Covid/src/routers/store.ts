import { Router } from 'express'
import { sendErr, sendRes } from '../utils/response-handler'
import { storeDao } from '../daos/StoreDao'

const router = Router()

router.post('/register', async (req, res) => {
    try {
        const { name, phone, address } = req.body
        // TODO: 이미 존재하는 가게인지 중복 검사.
        const result = await storeDao.insertStore(name, phone, address)
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
