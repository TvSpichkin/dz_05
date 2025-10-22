import {postsColl} from "../../db";
import {PostDbType, PostDbPutType} from "../../types/postsDbTypes";
import {keyIds} from "../../types/typesRepDB";


export const postsRepDB = {
    async check(id: number): Promise<boolean> {
        return postsColl.find({id: id}).hasNext();
    }, // Проверка на существование записи в БД
    async write(entity: PostDbType): Promise<number> {
        const endId = await postsColl.find({}).sort({$natural: -1}).limit(1).toArray(); // Последний идентификатор записи
        
        entity.id = endId.length ? endId[0].id + 1 : 1; // Создание идентификатора для текущей записи
        await postsColl.insertOne(entity);
        
        return entity.id;
    }, // Запись записи в БД
    async remove(id: number): Promise<boolean> {
        return !!(await postsColl.deleteOne({id: id})).deletedCount;
    }, // Удаление записи из БД
    async removes(keyId: keyIds, id: number) {
        await postsColl.deleteMany({[keyId]: id});
    }, // Удаление записей из БД
    async edit(entity: PostDbPutType, id: number) {
        await postsColl.updateOne({id: id}, {$set: entity});
    } // Изменение записи в БД
}; // Работа с базой данных для записей
