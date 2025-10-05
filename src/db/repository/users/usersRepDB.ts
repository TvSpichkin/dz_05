import {db} from "../../db";
import {KeysDB} from "../../types/typesRepDB";
import {UserDbType} from "../../types/usersDbTypes";


const entKey: KeysDB = "users";

export const usersRepDB = {
    async check(id: number): Promise<boolean> {
        return db.collection<UserDbType>(entKey).find({id: id}).hasNext();
    }, // Проверка на существование пользователя в БД
    async readByLoginOrEmail(loe: string): Promise<UserDbType | null> {
        return db.collection<UserDbType>(entKey).findOne({$or: [{userName: loe}, {email: loe}]});
    }, // Извлечение пользователя по имени или почте
    async write(entity: UserDbType): Promise<number> {
        const endId = await db.collection<UserDbType>(entKey).find({}).sort({$natural: -1}).limit(1).toArray();
        
        entity.id = endId.length ? endId[0].id + 1 : 1;
        await db.collection<UserDbType>(entKey).insertOne(entity);
        
        return entity.id;
    }, // Запись пользователя в БД
    async remove(id: number) {
        await db.collection<UserDbType>(entKey).deleteOne({id: id});
    } // Удаление пользователя из БД
}; // Работа с базой данных для пользователей
