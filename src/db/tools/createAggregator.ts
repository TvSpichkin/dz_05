import {Document, Filter, Sort} from "mongodb";
import {KeysDB} from "../types/typesRepDB";


export function createAggregator<T>(ek: KeysDB, f: Filter<T>): Document[] {
    const a: Document[] = [];
    
    if(ek == "posts") a.push({$lookup: { // Добавление имени существующего сетевого журнала в запись
        from: 'blogs',
        localField: 'blogId',
        foreignField: 'id',
        as: 'blogName'
    }}, {$unwind: '$blogName'}, {$set: {blogName: "$blogName.name"}});
    a.push({$match: f}); // Добавление фильтра в запрос
    
    return a;
} // Генерация агрегата
