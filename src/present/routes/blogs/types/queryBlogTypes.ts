import {QueryInputModel, TypeSearchTerm} from "../../../types/queryTypes";
import {TypeBlogFields} from "./blogsTypes";


export type QueryBlogInputModel = QueryInputModel & {
    searchNameTerm: TypeSearchTerm, // Входящий поисковый термин для имени; максимальная длина: 15
    sortBy: TypeBlogFields // Входящее поле сортировки
}; // Входная модель сетевого журнала для запроса с вопросом
