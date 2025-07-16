import {db} from "../db";
import {DBType, ProtoFilterType, KeysDB, EntDbType, DbTypeFind, keyIds, EntPutType, TypeEntFields, EntDbTypeA} from "../types/typesRepDB";
import {TypeSortDir} from "../../IOtypes/queryTypes";
import {createAggregator, createFilter, createSorter} from "./createFilter";


export const queryRep = {
    async readAll(entKey: KeysDB, es: number, ps: number, sb: TypeEntFields, sd: TypeSortDir, snf: ProtoFilterType[]): Promise<[number, EntDbTypeA[]]> {
        const filter = createFilter(snf), // Создание поискового фильтра
        aggregator = createAggregator(entKey, filter), // Создание агрегата
        sorter = createSorter(sb, sd); // Создание сортировщика
        
        return Promise.all([db.collection<EntDbTypeA>(entKey).count(filter), // Извлечение количества элементов удовлетворяющих поисковому фильтру
            db.collection<EntDbTypeA>(entKey).aggregate<EntDbTypeA>(aggregator).sort(sorter).skip(es).limit(ps).toArray()]); // Извлечение нужной порции сущностей удовлетворяющих поисковому фильтру
    } // Извлечение всех сущностей
}; // Работа с базой данных на чтение
