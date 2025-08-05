import {db} from "../../db";
import {KeysDB, ProtoFilterType} from "../types/typesRepDB";
import {TypeBlogFields} from "../../../routes/blogs/types/blogsTypes";
import {TypeSortDir} from "../../../routes/types/queryTypes";
import {BlogDbType} from "../types/blogsDbTypes";
import {createFilter} from "../queryCreators/createFilter";
import {createSorter} from "../queryCreators/createSorter";


const entKey: KeysDB = "blogs";

export const blogsQueryRep = {
    async readAll(es: number, ps: number, sb: TypeBlogFields, sd: TypeSortDir, snf: ProtoFilterType<BlogDbType>[]): Promise<[number, BlogDbType[]]> {
        const filter = createFilter<BlogDbType>(snf), // Создание поискового фильтра
        sorter = createSorter(sb, sd); // Создание сортировщика
        
        return Promise.all([db.collection<BlogDbType>(entKey).count(filter), // Извлечение количества элементов удовлетворяющих поисковому фильтру
            db.collection<BlogDbType>(entKey).find(filter).sort(sorter).skip(es).limit(ps).toArray()]); // Извлечение нужной порции сетевых журналов удовлетворяющих поисковому фильтру
    }, // Извлечение всех сетевых журналов
    async read(id: number): Promise<BlogDbType | null> {
        return db.collection<BlogDbType>(entKey).findOne({id: id});
    } // Извлечение сетевого журнала по идентификатору
}; // Работа с базой данных на чтение
