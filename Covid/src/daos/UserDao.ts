import { BaseDao } from './BaseDao'

class UserDao extends BaseDao {
    insertUser(token: string, uuid: string, os: string, phone: string | null) {
        const queryStr = 'INSERT INTO USER_TB (token, uuid, os, phone) VALUES (?, ?, ?, ?)'
        return this.insert(queryStr, [token, uuid, os, phone])
    }
}

export const userDao = new UserDao()
