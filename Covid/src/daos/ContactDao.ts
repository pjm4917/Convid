import { BaseDao } from './BaseDao'

class ContactDao extends BaseDao {
    insertContact(uuid: string, storeId: string) {
        const queryStr = 'INSERT INTO USER_STORE_TB (user_id, store_id) VALUES (?, ?)'
        return this.insert(queryStr, [uuid, storeId])
    }

    
}

export const contactDao = new ContactDao()