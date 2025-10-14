import {blogsColl} from "../../db";
import {BlogDbType, BlogDbPutType} from "../../types/blogsDbTypes";


export const blogsRepDB = {
    async check(id: number): Promise<boolean> {
        return blogsColl.find({id: id}).hasNext();
    }, // Проверка на существование сетевого журнала в БД
    async write(entity: BlogDbType): Promise<number> {
        const endId = await blogsColl.find({}).sort({$natural: -1}).limit(1).toArray(); // Последний идентификатор сетевого журнала
        
        entity.id = endId.length ? endId[0].id + 1 : 1; // Создание идентификатора для текущего сетевого журнала
        await blogsColl.insertOne(entity);
        
        return entity.id;
    }, // Запись сетевого журнала в БД
    async remove(id: number) {
        await blogsColl.deleteOne({id: id});
    }, // Удаление сетевого журнала из БД
    async edit(entity: BlogDbPutType, id: number) {
        await blogsColl.updateOne({id: id}, {$set: entity});
    } // Изменение сетевого журнала в БД
}; // Работа с базой данных для сетевых журналов
