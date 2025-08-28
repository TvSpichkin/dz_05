import {QueryInputModel} from "../../types/queryTypes";
import {TypePostFields} from "./postsTypes";


export type QueryBlogInputModel = QueryInputModel & {
    sortBy: TypePostFields // Входящее поле сортировки
}; // Входная модель записи для запроса с вопросом
