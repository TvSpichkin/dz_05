import {db} from "../../db";
import {KeysDB, keyIds} from "../../types/typesRepDB";
import {PostDbType, PostDbPutType} from "../../types/postsDbTypes";


const entKey: KeysDB = "posts";

export const postsRepDB = {
    async check(id: number): Promise<boolean> {
        return db.collection<PostDbType>(entKey).find({id: id}).hasNext();
    }, // Проверка на существование записи в БД
    async write(entity: PostDbType): Promise<number> {
        const endId = await db.collection<PostDbType>(entKey).find({}).sort({$natural: -1}).limit(1).toArray();
        
        entity.id = endId.length ? endId[0].id + 1 : 1;
        await db.collection<PostDbType>(entKey).insertOne(entity);
        
        return entity.id;
    }, // Запись записи в БД
    async remove(id: number) {
        await db.collection<PostDbType>(entKey).deleteOne({id: id});
    }, // Удаление записи из БД
    async removes(keyId: keyIds, id: number) {
        await db.collection<PostDbType>(entKey).deleteMany({[keyId]: id});
    }, // Удаление записей из БД
    async edit(entity: PostDbPutType, id: number) {
        await db.collection<PostDbType>(entKey).updateOne({id: id}, {$set: entity});
    } // Изменение записи в БД
}; // Работа с базой данных для записей
