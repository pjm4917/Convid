import { Router } from 'express'
import { sendErr, sendRes } from '../utils/response-handler'
import { storeDao } from '../daos/StoreDao'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const result = await storeDao.getAllStores()
        sendRes(res, 200, '성공', result)
    } catch (e) {
         console.log(e)
        sendErr(res, e)
    }
})

router.post('/register', async (req, res) => {
    try {
        const { pwd, phone, name, uuid, latLng, address } = req.body
        if (!name || !phone || !address || !pwd || !uuid || !latLng) throw new Error('No Appropriate fields in Request')
        const found = await storeDao.getStoreByPhone(phone)
        if (found) {
            sendRes(res, 400, '이미 존재하는 가게입니다', {})
            return
        }
        const result = await storeDao.insertStore(phone, pwd, name, uuid, Number(latLng.latitude), Number(latLng.longitude), address)
        if (!result) throw new Error()
        sendRes(res, 200, '환영합니다', {
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
        const found = await storeDao.getStoreByPhoneAndPwd(phone, pwd)
        if (!found) {
            sendRes(res, 400, '계정의 정보가 존재하지 않습니다.', {
                updated: true
            })
            return
        }
        sendRes(res, 200, '', found)
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

export = router
