import {db} from "../../db";
import {KeysDB} from "../../types/typesRepDB";
import {BlogDbType, BlogDbPutType} from "../../types/blogsDbTypes";


const entKey: KeysDB = "blogs";

export const blogsRepDB = {
    async check(id: number): Promise<boolean> {
        return db.collection<BlogDbType>(entKey).find({id: id}).hasNext();
    }, // Проверка на существование сетевого журнала в БД
    async write(entity: BlogDbType): Promise<number> {
        const endId = await db.collection<BlogDbType>(entKey).find({}).sort({$natural: -1}).limit(1).toArray();
        
        entity.id = endId.length ? endId[0].id + 1 : 1;
        await db.collection<BlogDbType>(entKey).insertOne(entity);
        
        return entity.id;
    }, // Запись сетевого журнала в БД
    async remove(id: number) {
        await db.collection<BlogDbType>(entKey).deleteOne({id: id});
    }, // Удаление сетевого журнала из БД
    async edit(entity: BlogDbPutType, id: number) {
        await db.collection<BlogDbType>(entKey).updateOne({id: id}, {$set: entity});
    } // Изменение сетевого журнала в БД
}; // Работа с базой данных для сетевых журналов
