import {Router} from "express";
import {sendRes} from "../utils/response-handler";
import {sendPushTo} from "../utils/send-push";

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

export = router
