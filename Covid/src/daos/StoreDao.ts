import { BaseDao } from './BaseDao'

class StoreDao extends BaseDao {
    insertStore(id: string, pwd: string, phone: string, storeName: string, uuid: string, latLng: application/json, address: string) {
        const queryStr = 'INSERT INTO STORE_TB (id, pwd, phone, storeName, uuid, latLng, address) VALUES (?, ?, ?, ?, ?, ?)'
        return this.insert(queryStr, [id, pwd, phone, storeName, uuid, latLng, address])
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
