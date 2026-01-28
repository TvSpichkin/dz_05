import {blogDbFields, BlogDbType} from "../../types/blogsDbTypes";
import {TypeSortDir} from "../../../present/types/queryTypes";
import {ProtoFilterType} from "../../../tools/types/typePFilt";
import {createFilter} from "../../tools/methodsFilter";
import {createSorter} from "../../tools/createSorter";
import {blogsColl} from "../../db";


export const blogsQueryRep = {
    async readAll(es: number, ps: number, sb: blogDbFields, sd: TypeSortDir, snf: ProtoFilterType<BlogDbType>[]): Promise<[number, BlogDbType[]]> {
        const filter = createFilter(snf), // Создание поискового фильтра
        sorter = createSorter(sb, sd); // Создание сортировщика
        
        return Promise.all([blogsColl.count(filter), // Извлечение количества элементов удовлетворяющих поисковому фильтру
            blogsColl.find(filter).sort(sorter).skip(es).limit(ps).toArray()]); // Извлечение нужной порции сетевых журналов удовлетворяющих поисковому фильтру
    }, // Извлечение всех сетевых журналов
    async read(id: number): Promise<BlogDbType | null> {
        return blogsColl.findOne({id: id});
    } // Извлечение сетевого журнала по идентификатору
}; // Работа с базой данных на чтение сетевых журналов
