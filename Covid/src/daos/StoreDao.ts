import { BaseDao } from './BaseDao'

class StoreDao extends BaseDao {
    insertStore(name: string, pwd: stirng, phone: string, address: string, latitude: string, longitude: string) {
        const queryStr = 'INSERT INTO STORE_TB (name, pwd, phone, address, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)'
        return this.insert(queryStr, [name, pwd, phone, address, latitude, longitude])
    }
    
    getStoreByPhone(phone: string) {
        const queryStr = 'SELECT * FROM STORE_TB WHERE phone = ? AND deleted_at IS NULL'
        return this.getOne(queryStr, [phone])
    }
    
    checkStore(phone : string, pwd : string) {
        const queryStr = 'SELECT * FROM STORE_TB WHERE phone = ? AND pwd = ? AND deleted_at IS NULL'
        return this.getOne(queryStr, [phone, pwd])
    }

}

export const storeDao = new StoreDao()
