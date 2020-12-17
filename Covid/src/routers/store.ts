import { Router } from 'express'
import { sendErr, sendRes } from '../utils/response-handler'
import { storeDao } from '../daos/StoreDao'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const { name, pwd, phone, address, latitude, longitude } = req.query
        senRes(res, 200, '성공', [{id, name, phone, address, latitude, longitude}])
    } catch (e) {
         console.log(e)
        sendErr(res, e)
    }
})

router.post('/register', async (req, res) => {
    try {
        const { name, pwd, phone, address, latitude, longitude } = req.body
        if (!name || !phone || !address) throw new Error('No Appropriate fields in Request')
        const found = await storeDao.getStorebyPhone(phone)
        if (found) {
            console.log(found)
            sendRes(res, 201, '이미 존재하는 가게입니다', {
                updated: true
            })
            return
        }
        const result = await storeDao.insertStore(name, pwd, phone, address, latitude, longitude)
        if (!result) throw new Error()
        sendRes(res, 200, '', {
            success: true
        })
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

router.post('/login', async(req, res) => {
    try {
        const { phone, pwd } = req.body
        const found = await storeDo.checkStore(phone, pwd)
        if (!found) {
            sendRes(res, 201, '회원가입이 되어있지 않은 가게입니다', {updated: true})
            return
        }
        const allowlogin = true
        if (!allowlogin) throw new Error()
        sendRes(res, 200, '', { success: true })
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

export = router