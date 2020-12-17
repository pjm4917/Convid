import { Response } from 'express'

export const sendRes = (res: Response, code, message?, data?) => {
    res.send({
        status: code,
        message: message ?? undefined,
        data: data ?? undefined
    })
}

export const sendErr = (res: Response, err: Error) => {
    res.send({
        status: 500,
        message: err?.message ?? 'Internal Server Error',
    })
}
