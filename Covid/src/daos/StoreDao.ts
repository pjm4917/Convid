import { BaseDao } from './BaseDao'

class StoreDao extends BaseDao {
    insertStore(
        phone: string,
        pwd: string,
        name: string,
        uuid: string,
        latitude: number,
        longitude: number,
        address: string
    ) {
        const queryStr = 'INSERT INTO STORE_TB (phone, pwd, name, uuid, latitude, longitude, address) VALUES (?, ?, ?, ?, ?, ?, ?)'
        return this.insert(queryStr, [phone, pwd, name, uuid, latitude, longitude, address])
    }

    getAllStores() {
        const queryStr = 'SELECT * FROM STORE_TB WHERE deleted_at IS NULL'
        return this.getAll(queryStr)
    }

    getStoreByPhone(phone: string) {
        const queryStr = 'SELECT * FROM STORE_TB WHERE phone = ? AND deleted_at IS NULL'
        return this.getOne(queryStr, [phone])
    }

    getStoreByPhoneAndPwd(phone : string, pwd : string) {
        const queryStr = 'SELECT * FROM STORE_TB WHERE phone = ? AND pwd = ? AND deleted_at IS NULL'
        return this.getOne(queryStr, [phone, pwd])
    }

}

export const storeDao = new StoreDao()
