import {db} from "../db";
import {Sort} from "mongodb";
import {ProtoFilterType, KeysDB, EntDbTypeA} from "./types/typesRepDB";
import {createFilter} from "./queryCreators/createFilter";


export const blogsQueryRep = {
    async readAll<T extends Document>(entKey: KeysDB, es: number, ps: number, sorter: Sort, snf: ProtoFilterType<T>[]): Promise<[number, T[]]> {
        const filter = createFilter<T>(snf), // Создание поискового фильтра
        aggregator = createAggregator(entKey, filter); // Создание агрегата
        
        return Promise.all([db.collection<T>(entKey).count(filter), // Извлечение количества элементов удовлетворяющих поисковому фильтру
            db.collection<T>(entKey).aggregate<T>(aggregator).sort(sorter).skip(es).limit(ps).toArray()]); // Извлечение нужной порции сущностей удовлетворяющих поисковому фильтру
    } // Извлечение всех сущностей
}; // Работа с базой данных на чтение
