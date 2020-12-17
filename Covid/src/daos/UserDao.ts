import { BaseDao } from './BaseDao'

class UserDao extends BaseDao {
    insertUser(token: string, uuid: string, os: string | null) {
        const queryStr = 'INSERT INTO USER_TB (token, uuid, os) VALUES (?, ?, ?)'
        return this.insert(queryStr, [token, uuid, os])
    }
}

export const userDao = new UserDao()
