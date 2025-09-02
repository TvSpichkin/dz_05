import {db} from "../../db";
import {KeysDB, ProtoFilterType} from "../types/typesRepDB";
import {TypePostFields} from "../../../routes/posts/types/postsTypes";
import {TypeSortDir} from "../../../routes/types/queryTypes";
import {PostDbType, PostDbTypeA} from "../types/postsDbTypes";
import {createFilter} from "../queryCreators/createFilter";
import {createAggregator} from "../queryCreators/createAggregator";
import {createSorter} from "../queryCreators/createSorter";


const entKey: KeysDB = "posts";

export const repBD = {
    async readAll(es: number, ps: number, sb: TypePostFields, sd: TypeSortDir, snf: ProtoFilterType<PostDbType>[]): Promise<[number, PostDbTypeA[]]> {
        const filter = createFilter<PostDbType>(snf), // Создание поискового фильтра
        aggregator = createAggregator<PostDbType>(entKey, filter), // Создание агрегата
        sorter = createSorter(sb, sd); // Создание сортировщика
        
        return Promise.all([db.collection<PostDbType>(entKey).count(filter), // Извлечение количества элементов удовлетворяющих поисковому фильтру
            db.collection<PostDbType>(entKey).aggregate<PostDbTypeA>(aggregator).sort(sorter).skip(es).limit(ps).toArray()]); // Извлечение нужной порции записей удовлетворяющих поисковому фильтру
    }, // Извлечение всех записей
    async read(id: number): Promise<PostDbTypeA | null> {
        const aggregator = createAggregator<PostDbType>(entKey, {id: id}); // Создание агрегата
        
        return (await db.collection<PostDbType>(entKey).aggregate<PostDbTypeA>(aggregator).toArray())[0];
    } // Извлечение записи по идентификатору
}; // Работа с базой данных на чтение записей
