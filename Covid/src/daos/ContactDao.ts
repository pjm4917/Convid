import { BaseDao } from './BaseDao'

class ContactDao extends BaseDao {
    insertContact(uuid: string, storeId: string) {
        const queryStr = 'INSERT INTO USER_STORE_TB (user_id, store_id) VALUES (?, ?)'
        return this.insert(queryStr, [uuid, storeId])
    }
    
    getAllUser(storeId: string) {
        const queryStr = 'SELECT * FROM USER_STORE_TB WHERE store_id = ? VALUES (?)'
        return this.getAll(queryStr, [storeId])
    }
}

export const contactDao = new ContactDao()