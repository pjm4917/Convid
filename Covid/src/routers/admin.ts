import {Router} from "express";
import {sendErr, sendRes} from "../utils/response-handler";
import {sendPushTo} from "../utils/send-push";
import { contactDao } from '../daos/ContactDao'

const router = Router()

router.post('/user/contacted', async (req, res) => {
    try {
        const { title, body } = req.body
        await sendPushTo([{
            token: 'AdQkQMiTF-x4VlWsnfi6t:APA91bFshp0JCBybEE9ysdK840lQd4nUZhUac7lF_P2ci2PohnA62zot1s3TwP042XoQFmrAuTOxDSvPXSFNl0LyMn8ZBjuLyQCbG9OpEHvazI44Ra-zT1y8TTYplta9Y18CPoQvNRhr',
            os: 'ANDROID',
        }], title, body)
        sendRes(res, 200, '성공', {
            success: true
        })
    } catch (e) {
        console.log(e)
        sendRes(res, e)
    }
})

router.get('', async (req, res) => {
    try{
        const { storeId, uuid, createTime }= req.query
        const result = await contactDao.showContact(storeId, uuid, createTime)
        if (!result) sendRes(res, 200, '아무도 없습니다.', result)
        sendRes(res, 200, '검색되었습니다.', result)
    } catch (e) {
        console.log(e)
        sendErr(res, e)
    }
})

export = router
