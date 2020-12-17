import fetch from 'node-fetch'

export const sendPushTo = async (people: Array<{token: string, os: 'ANDROID' | 'IOS'}>, title: string, body: string) => {
    const res = await Promise.all(people.map(async (person) => {
        try {
            const resM = await fetch('https://fcm.googleapis.com/fcm/send', {
                    method: 'POST',
                    headers: {
                        Authorization: `key=${process.env.FCM_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        to: person.token,
                        notification: {
                            title: title,
                            body: body,
                        },
                    })
                }
            )
            return await resM.json()
        } catch (e) {
            return null
        }
    }))
    if (res.some((r) => r === null)) throw new Error('Send Fail')
}
