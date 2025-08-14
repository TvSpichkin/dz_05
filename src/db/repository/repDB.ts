import {db} from "../db";
import {KeysDB, keyIds} from "./types/typesRepDB";
import {BlogDbType} from "./types/blogsDbTypes";


const entKey: KeysDB = "blogs";

export const repBD = {
    async write(entity: BlogDbType): Promise<number> {
        const endId = await db.collection<BlogDbType>(entKey).find({}).sort({$natural: -1}).limit(1).toArray();
        
        entity.id = endId.length ? endId[0].id + 1 : 1;
        await db.collection<BlogDbType>(entKey).insertOne(entity);
        
        return entity.id;
    }, // Запись сетевого журнала в БД
}; // Работа с базой данных для сетевого журнала
