import {KeysDB} from "../../types/typesRepDB";
import {TypePostFields} from "../../../present/routes/posts/types/postsTypes";
import {TypeSortDir} from "../../../present/types/queryTypes";
import {ProtoFilterType} from "../../../tools/types/typePFilt";
import {PostDbType, PostDbTypeA} from "../../types/postsDbTypes";
import {createFilter} from "../../tools/methodsFilter";
import {createAggregator} from "../../tools/createAggregator";
import {createSorter} from "../../tools/createSorter";
import {postsColl} from "../../db";


const entKey: KeysDB = "posts";

export const postsQueryRep = {
    async readAll(es: number, ps: number, sb: TypePostFields, sd: TypeSortDir, bif: ProtoFilterType<PostDbType>[]): Promise<[number, PostDbTypeA[]]> {
        const filter = createFilter(bif), // Создание поискового фильтра
        aggregator = createAggregator(entKey, filter), // Создание агрегата
        sorter = createSorter(sb, sd); // Создание сортировщика
        
        return Promise.all([postsColl.count(filter), // Извлечение количества элементов удовлетворяющих поисковому фильтру
            postsColl.aggregate<PostDbTypeA>(aggregator).sort(sorter).skip(es).limit(ps).toArray()]); // Извлечение нужной порции записей удовлетворяющих поисковому фильтру
    }, // Извлечение всех записей
    async read(id: number): Promise<PostDbTypeA | null> {
        const aggregator = createAggregator(entKey, {id: id}); // Создание агрегата
        
        return (await postsColl.aggregate<PostDbTypeA>(aggregator).toArray())[0];
    } // Извлечение записи по идентификатору
}; // Работа с базой данных на чтение записей
