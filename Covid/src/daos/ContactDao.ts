import { BaseDao } from './BaseDao'

class ContactDao extends BaseDao {
    insertContact(id: number, storeId: number) {
        const queryStr = 'INSERT INTO USER_STORE_TB (user_id, store_id) VALUES (?, ?)'
        return this.insert(queryStr, [id, storeId])
    }

    getTodayVisitors(id: number) {
        const queryStr = 'SELECT * FROM USER_STORE_TB WHERE store_id = ? AND DATE_FORMAT(created_at, "%Y-%m-%D") = CURDATE() GROUP BY user_id'
        return this.getAll(queryStr, [id])
    }

    showContact(storeId: string, uuid: string, date: Date) {
        var startTime = date.getTime() - (2 * 60 * 60 * 1000);
        var endTime = date.getTime() + (2 * 60 * 60 * 1000);
        const queryStr = 'SELECT * FROM USER_STORE_TB WHERE store_id = ? and created_at >= ? and created_at <= ? and user_id != ?'
        return this.getAll(queryStr, [storeId, startTime, endTime, uuid])
    }
}

export const contactDao = new ContactDao()
