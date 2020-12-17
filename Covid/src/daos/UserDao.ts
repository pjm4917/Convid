import { BaseDao } from './BaseDao'

class UserDao extends BaseDao {
    insertUser(token: string, uuid: string, os: string) {
        const queryStr = 'INSERT INTO USER_TB (token, uuid, os) VALUES (?, ?, ?)'
        return this.insert(queryStr, [token, uuid, os])
    }

    getUserByUUID(uuid: string) {
        const queryStr = 'SELECT * FROM USER_TB WHERE uuid = ? AND deleted_at IS NULL'
        return this.getOne(queryStr, [uuid])
    }

    deleteUserByUUID(uuid: string) {
        const queryStr = 'UPDATE USER_TB SET deleted_at = NOW() WHERE uuid = ? AND deleted_at IS NULL'
        return this.update(queryStr, [uuid])
    }
}

export const userDao = new UserDao()
