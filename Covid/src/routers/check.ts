import { Router } from 'express'
import { sendErr, sendRes } from '../utils/response-handler'
import { contactDao } from '../daos/ContactDao'

const router = Router

router.post('/in/:storeId', async (req, res) => {
    try {
        const {storeId} = req.query
        // TODO : Replace Mocking
        sendRes(res, 200, '성공', [
                {
                    uuid : 111111,
                },
                {
                    uuid : 222222,
                }
            ]
        )
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})