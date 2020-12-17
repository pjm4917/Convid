import { BaseDao } from './BaseDao'

class StoreDao extends BaseDao {
    insertStore(name: string, phone: string, address: string | null) {
        const queryStr = 'INSERT INTO STORE_TB (name, phone, address) VALUES (?, ?, ?)'
        return this.insert(queryStr, [name, phone, address])
    }
}

export const storeDao = new StoreDao()
