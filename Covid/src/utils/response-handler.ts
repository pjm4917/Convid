import { Response } from 'express'

export const sendRes = (res: Response, code, message?, data?) => {
    res.send({
        code: code,
        msg: message ?? undefined,
        data: data ?? undefined
    })
}

export const sendErr = (res: Response, err: Error) => {
    res.send({
        code: 500,
        msg: err?.message ?? 'Internal Server Error',
    })
}
