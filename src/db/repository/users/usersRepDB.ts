import {usersColl} from "../../db";
import {UserDbType} from "../../types/usersDbTypes";
import {ProtoFilterType} from "../../../tools/types/typePFilt";
import {joinFilters} from "../../tools/methodsFilter";


export const usersRepDB = {
    async check(id: number): Promise<boolean> {
        return usersColl.find({id: id}).hasNext();
    }, // Проверка на существование пользователя в БД
    async readByPF(pf: ProtoFilterType<UserDbType>[]): Promise<UserDbType | null> {
        return usersColl.findOne(joinFilters<UserDbType>(pf, "or"));
    }, // Извлечение пользователя по имени или почте
    async write(entity: UserDbType): Promise<number> {
        const endId = await usersColl.find({}).sort({$natural: -1}).limit(1).toArray(); // Последний идентификатор пользователя
        
        entity.id = endId.length ? endId[0].id + 1 : 1; // Создание идентификатора для текущего пользователя
        await usersColl.insertOne(entity);
        
        return entity.id;
    }, // Запись пользователя в БД
    async remove(id: number): Promise<boolean> {
        return !!(await usersColl.deleteOne({id: id})).deletedCount;
    } // Удаление пользователя из БД
}; // Работа с базой данных для пользователей
