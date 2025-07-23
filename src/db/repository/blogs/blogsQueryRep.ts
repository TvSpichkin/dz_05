import {db} from "../../db";
import {ProtoFilterType, KeysDB} from "../types/typesRepDB";
import {TypeBlogFields} from "../../../routes/blogs/types/blogsTypes";
import {TypeSortDir} from "../../../routes/types/queryTypes";
import { BlogDbType } from "../types/blogsDbTypes";
import { createFilter } from "../queryCreators/createFilter";


const entKey: KeysDB = "blogs";

export const blogsQueryRep = {
    async readAll(es: number, ps: number, sb: TypeBlogFields, sd: TypeSortDir, snf: ProtoFilterType<BlogDbType>[]): Promise<[number, BlogDbType[]]> {
        const filter = createFilter<BlogDbType>(snf), // Создание поискового фильтра
        sorter = createSorter(sb, sd); // Создание сортировщика
        
        return Promise.all([db.collection<BlogDbType>(entKey).count(filter), // Извлечение количества элементов удовлетворяющих поисковому фильтру
            db.collection<BlogDbType>(entKey).find(filter).sort(sorter).skip(es).limit(ps).toArray()]); // Извлечение нужной порции сущностей удовлетворяющих поисковому фильтру
    } // Извлечение всех сущностей
}; // Работа с базой данных на чтение
